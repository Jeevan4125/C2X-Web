export interface SearchResult {
  fileUri: string;
  relativePath: string;
  line: number;
  column: number;
  endColumn: number;
  lineText: string;
  matchText: string;
  file: {
    path: string;
    name: string;
    content: string;
    language: string;
    isModified?: boolean;
  };
}

export type SearchStatus = "idle" | "searching" | "complete" | "cancelled" | "error";

export interface SearchOptions {
  query: string;
  replaceQuery?: string;
  matchCase?: boolean;
  wholeWord?: boolean;
  useRegex?: boolean;
  includePattern?: string;
  excludePattern?: string;
  searchScope?: "workspace" | "openEditors" | "currentFile";
  activePath?: string;
  openPaths?: string[];
  maxResults?: number;
  maxFileSize?: number;
}

const DEFAULT_EXCLUDES = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".next",
  ".vite",
  ".turbo",
  "out",
  "target",
  "bin",
  "obj",
];

const BINARY_EXTENSIONS = new Set([
  "exe", "dll", "so", "dylib", "zip", "7z", "rar", "tar", "gz",
  "png", "jpg", "jpeg", "gif", "webp", "ico", "bmp", "tiff",
  "mp3", "mp4", "mov", "avi", "mkv", "wav", "flac",
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "woff", "woff2", "ttf", "eot", "otf",
  "wasm", "pyc", "class", "o", "obj", "db", "sqlite"
]);

export function isBinaryFile(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return BINARY_EXTENSIONS.has(ext);
}

export function matchGlob(path: string, pattern: string): boolean {
  if (!pattern.trim()) return true;
  const parts = pattern.split(",").map((p) => p.trim()).filter(Boolean);
  return parts.some((p) => {
    const regexStr = p
      .replace(/\./g, "\\.")
      .replace(/\*\*/g, ".*")
      .replace(/\*/g, "[^/]*")
      .replace(/\?/g, ".");
    const regex = new RegExp(`^${regexStr}$`, "i");
    const regexContains = new RegExp(regexStr, "i");
    return regex.test(path) || regexContains.test(path);
  });
}

export function isExcluded(path: string, customExclude?: string): boolean {
  const pathParts = path.split("/");
  for (const excludedDir of DEFAULT_EXCLUDES) {
    if (pathParts.includes(excludedDir)) return true;
  }

  if (customExclude && customExclude.trim()) {
    const parts = customExclude.split(",").map((p) => p.trim()).filter(Boolean);
    for (const p of parts) {
      if (pathParts.includes(p)) return true;
      const regexStr = p
        .replace(/\./g, "\\.")
        .replace(/\*\*/g, ".*")
        .replace(/\*/g, "[^/]*")
        .replace(/\?/g, ".");
      const regex = new RegExp(regexStr, "i");
      if (regex.test(path)) return true;
    }
  }

  return false;
}

export async function searchWorkspaceAsync(
  files: Array<{ path: string; name: string; content: string; language: string; isModified?: boolean }>,
  options: SearchOptions,
  signal: AbortSignal,
  onBatchResults: (results: SearchResult[], isComplete: boolean, isTruncated: boolean) => void
): Promise<void> {
  const {
    query,
    matchCase = false,
    wholeWord = false,
    useRegex = false,
    includePattern = "",
    excludePattern = "",
    searchScope = "workspace",
    activePath = "",
    openPaths = [],
    maxResults = 2000,
    maxFileSize = 2 * 1024 * 1024,
  } = options;

  if (!query || !query.trim()) {
    onBatchResults([], true, false);
    return;
  }

  let regex: RegExp;
  try {
    const flags = matchCase ? "g" : "gi";
    const pattern = query;
    if (useRegex) {
      regex = new RegExp(pattern, flags);
    } else {
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (wholeWord) {
        regex = new RegExp(`\\b${escaped}\\b`, flags);
      } else {
        regex = new RegExp(escaped, flags);
      }
    }
  } catch (err: any) {
    throw new Error(err.message || "Invalid regular expression");
  }

  let targetFiles = files;
  if (searchScope === "openEditors" && openPaths.length > 0) {
    targetFiles = files.filter((f) => openPaths.includes(f.path));
  } else if (searchScope === "currentFile" && activePath) {
    targetFiles = files.filter((f) => f.path === activePath);
  }

  if (activePath) {
    targetFiles = [
      ...targetFiles.filter((f) => f.path === activePath),
      ...targetFiles.filter((f) => f.path !== activePath),
    ];
  }

  const results: SearchResult[] = [];
  let isTruncated = false;
  let batchCounter = 0;

  for (let i = 0; i < targetFiles.length; i++) {
    if (signal.aborted) return;

    const file = targetFiles[i];

    if (isBinaryFile(file.name)) continue;
    if (isExcluded(file.path, excludePattern)) continue;
    if (includePattern && includePattern.trim() && !matchGlob(file.path, includePattern)) continue;
    if (file.content && file.content.length > maxFileSize) continue;

    const lines = (file.content || "").split("\n");
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      if (signal.aborted) return;

      const lineText = lines[lineIdx];
      regex.lastIndex = 0;

      while (true) {
        if (signal.aborted) return;
        const match = regex.exec(lineText);
        if (!match) break;

        const lineNum = lineIdx + 1;
        const col = match.index + 1;
        const endCol = col + match[0].length;

        results.push({
          fileUri: file.path,
          relativePath: file.path,
          line: lineNum,
          column: col,
          endColumn: endCol,
          lineText,
          matchText: match[0],
          file,
        });

        if (match[0].length === 0) {
          regex.lastIndex++;
        }

        if (regex.lastIndex > lineText.length) {
          break;
        }

        if (results.length >= maxResults) {
          isTruncated = true;
          break;
        }
      }

      if (results.length >= maxResults) break;
    }

    batchCounter++;
    if (batchCounter % 10 === 0) {
      onBatchResults([...results], false, isTruncated);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    if (results.length >= maxResults) break;
  }

  if (!signal.aborted) {
    onBatchResults(results, true, isTruncated);
  }
}
