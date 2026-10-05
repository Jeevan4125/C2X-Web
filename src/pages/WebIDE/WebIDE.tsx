import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { projectService } from "@/services/projectService";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Puzzle,
  Settings,
  X,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  CheckCircle2,
  Wifi,
  Bell,
  Send,
  Trash2,
  FolderPlus,
  FileText,
  ExternalLink,
  Coffee,
  FileCode,
  Download,
  Radio,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import styles from "./WebIDE.module.scss";
import { cn } from "@/utils/helpers";
import { FileIcon } from "./FileIcon";
import {
  searchWorkspaceAsync,
  SearchStatus,
  SearchResult,
  SearchOptions,
  isBinaryFile,
  isExcluded,
  matchGlob,
} from "@/services/WorkspaceSearchService";

interface WorkspaceFile {
  path: string;
  name: string;
  content: string;
  language: string;
  isModified?: boolean;
  handle?: FileSystemFileHandle;
}

interface TreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children: { [key: string]: TreeNode };
  file?: WorkspaceFile;
}

interface C2XCommand {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  execute: () => void;
  enabled?: boolean;
}

const buildFileTree = (files: WorkspaceFile[]): TreeNode => {
  const root: TreeNode = { name: "workspace", path: "", isDirectory: true, children: {} };

  files.forEach((file) => {
    const parts = file.path.split("/");
    let curr = root;
    parts.forEach((part, idx) => {
      const isLast = idx === parts.length - 1;
      const subPath = parts.slice(0, idx + 1).join("/");
      if (!curr.children[part]) {
        curr.children[part] = {
          name: part,
          path: subPath,
          isDirectory: !isLast,
          children: {},
          file: isLast ? file : undefined,
        };
      } else if (isLast) {
        curr.children[part].file = file;
      }
      curr = curr.children[part];
    });
  });

  return root;
};

const WebIDE = (): React.ReactElement => {
  // Set window / browser tab title for /editor
  useEffect(() => {
    document.title = "Welcome Workspace - C2X Web IDE";
    return () => {
      document.title = "C2X — Modern Developer Workspace";
    };
  }, []);

  // Resizable panel states
  const [sidebarWidth, setSidebarWidth] = useState<number>(260);
  const [bottomPanelHeight, setBottomPanelHeight] = useState<number>(180);

  const isResizingSidebar = useRef(false);
  const isResizingBottom = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSidebarWidth((prev) => Math.min(prev, Math.max(180, window.innerWidth - 60)));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar.current) {
        const newWidth = e.clientX - 48; // minus activity bar width
        if (newWidth >= 180 && newWidth <= 600) {
          setSidebarWidth(newWidth);
        }
      }
      if (isResizingBottom.current) {
        const newHeight = window.innerHeight - e.clientY - 22; // minus status bar
        if (newHeight >= 100 && newHeight <= window.innerHeight * 0.7) {
          setBottomPanelHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      isResizingSidebar.current = false;
      isResizingBottom.current = false;
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Banner state
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showWelcomePageStartup, setShowWelcomePageStartup] = useState<boolean>(true);
  const [autoSaveMode, setAutoSaveMode] = useState<string>("Off");

  // Fresh workspace start (empty by default on every load)
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>("");

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [openPaths, setOpenPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string>("");
  const [activeSidebar, setActiveSidebar] = useState<string | null>("explorer");
  const [activePanel, setActivePanel] = useState<string | null>("problems");
  const [theme, setTheme] = useState<"vs-dark" | "vs" | "hc-black">("vs-dark");
  const [fontSize, setFontSize] = useState<number>(14);

  // Top menu dropdown state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Context Menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    path: string;
    isDirectory: boolean;
  } | null>(null);

  // Inline Item Creation state (VS Code style)
  const [creatingItem, setCreatingItem] = useState<{ parentDir: string; isDirectory: boolean } | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Modals
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickOpenOpen, setQuickOpenOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [tunnelModalOpen, setTunnelModalOpen] = useState(false);
  const [gotoLineModalOpen, setGotoLineModalOpen] = useState(false);
  const [gotoLineNum, setGotoLineNum] = useState("1");

  // Modal form inputs
  const [cloneUrl, setCloneUrl] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [isReplaceOpen, setIsReplaceOpen] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [includePattern, setIncludePattern] = useState("");
  const [excludePattern, setExcludePattern] = useState("node_modules, .git, dist, build, coverage");
  const [showIncludeExclude, setShowIncludeExclude] = useState(false);
  const [searchScope, setSearchScope] = useState<"workspace" | "openEditors" | "currentFile">("workspace");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("c2x_search_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [regexError, setRegexError] = useState<string | null>(null);
  const [replaceModal, setReplaceModal] = useState<{ matchCount: number; fileCount: number; type: "single" | "all" } | null>(null);
  const [collapsedFiles, setCollapsedFiles] = useState<{ [path: string]: boolean }>({});
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [isTruncated, setIsTruncated] = useState(false);
  const [expandedMatchCounts, setExpandedMatchCounts] = useState<{ [fileUri: string]: boolean }>({});
  const searchControllerRef = useRef<AbortController | null>(null);

  const [searchParams] = useSearchParams();
  const projectIdParam = searchParams.get("projectId");
  const filePathParam = searchParams.get("file");

  useEffect(() => {
    if (projectIdParam) {
      projectService.getProjectById(projectIdParam).then((proj) => {
        if (proj && proj.files && proj.files.length > 0) {
          setFiles(
            proj.files.map((f) => ({
              path: f.path,
              name: f.name,
              content: f.content,
              language: f.language || "typescript",
              isModified: false,
            }))
          );
          setWorkspaceName(proj.name);
          setIsWorkspaceOpen(true);

          const targetFile = filePathParam
            ? proj.files.find((f) => f.path === filePathParam)
            : proj.files[0];
          if (targetFile) {
            setOpenPaths([targetFile.path]);
            setActivePath(targetFile.path);
          }
        }
      });
    }
  }, [projectIdParam, filePathParam]);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [gitCommitMsg, setGitCommitMsg] = useState("");

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const [commandQuery, setCommandQuery] = useState("");

  // Expanded folders state
  const [expandedFolders, setExpandedFolders] = useState<{ [path: string]: boolean }>({});

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "C2X AI Assistant ready. Open a folder or repository to start analyzing code." },
  ]);
  const [aiInput, setAiInput] = useState("");

  // Clear any stored workspace from localStorage so /editor starts clean
  useEffect(() => {
    try {
      localStorage.removeItem("c2x_workspace_files");
      localStorage.removeItem("c2x_workspace_name");
    } catch {
      // Ignore
    }
  }, []);

  // Focus inline input when created
  useEffect(() => {
    if (creatingItem && inlineInputRef.current) {
      inlineInputRef.current.focus();
    }
  }, [creatingItem]);

  // Close menus and context menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      setContextMenu(null);
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p" && !e.shiftKey) {
        e.preventDefault();
        setQuickOpenOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "p" && e.shiftKey) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveActiveFile();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "g") {
        e.preventDefault();
        setGotoLineModalOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault();
        setSettingsOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setActivePanel(activePanel === "problems" ? "terminal" : "problems");
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setActiveSidebar("search");
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        setActiveSidebar("search");
        setIsReplaceOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setActiveSidebar(activeSidebar ? null : "explorer");
      } else if (e.key === "Escape") {
        setCommandPaletteOpen(false);
        setQuickOpenOpen(false);
        setSettingsOpen(false);
        setCloneModalOpen(false);
        setTunnelModalOpen(false);
        setGotoLineModalOpen(false);
        setContextMenu(null);
        setCreatingItem(null);
        setActiveMenu(null);
        setActiveSubMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePath, activePanel, activeSidebar]);

  const activeFile = files.find((f) => f.path === activePath) || files[0];
  const fileTree = buildFileTree(files);

  // Real File System Access API: Open Folder
  const handleOpenFolder = async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        alert("Folder access is not supported in this browser. Please use Chrome or Edge.");
        return;
      }

      const dirHandle = await (window as any).showDirectoryPicker({ mode: "readwrite" });

      if (dirHandle.queryPermission) {
        const perm = await dirHandle.queryPermission({ mode: "readwrite" });
        if (perm !== "granted") {
          const req = await dirHandle.requestPermission({ mode: "readwrite" });
          if (req !== "granted") {
            alert("Folder access permission denied.");
            return;
          }
        }
      }

      setWorkspaceName(dirHandle.name);
      const loadedFiles: WorkspaceFile[] = [];

      const readDir = async (handle: FileSystemDirectoryHandle, basePath = "") => {
        try {
          for await (const entry of (handle as any).values()) {
            if (["node_modules", ".git", "dist", "build", ".cache"].includes(entry.name)) {
              continue;
            }
            const entryPath = basePath ? `${basePath}/${entry.name}` : entry.name;
            if (entry.kind === "file") {
              const fileData = await entry.getFile();
              const content = await fileData.text();
              const ext = entry.name.split(".").pop() || "";
              let lang = "plaintext";
              if (["ts", "tsx"].includes(ext)) lang = "typescript";
              else if (["js", "jsx"].includes(ext)) lang = "javascript";
              else if (ext === "json") lang = "json";
              else if (ext === "md") lang = "markdown";
              else if (ext === "html") lang = "html";
              else if (ext === "css") lang = "css";
              else if (ext === "java") lang = "java";

              loadedFiles.push({
                path: entryPath,
                name: entry.name,
                content,
                language: lang,
                isModified: false,
                handle: entry,
              });
            } else if (entry.kind === "directory") {
              await readDir(entry, entryPath);
            }
          }
        } catch (e) {
          console.error("Error reading directory entry:", e);
        }
      };

      await readDir(dirHandle);

      if (loadedFiles.length === 0) {
        loadedFiles.push({
          path: "README.md",
          name: "README.md",
          content: `# ${dirHandle.name}\n\nOpened with C2X Web IDE.`,
          language: "markdown",
          isModified: true,
        });
      }

      setFiles(loadedFiles);
      setIsWorkspaceOpen(true);
      setOpenPaths([loadedFiles[0].path]);
      setActivePath(loadedFiles[0].path);
      setExpandedFolders({ [loadedFiles[0].path.split("/")[0]]: true });
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Directory picker error:", err);
      }
    }
  };

  const handleOpenFile = async () => {
    if (!("showOpenFilePicker" in window)) {
      startCreating("", false);
      return;
    }
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker();
      const file = await fileHandle.getFile();
      const content = await file.text();
      const newFile: WorkspaceFile = {
        path: file.name,
        name: file.name,
        content,
        language: file.name.endsWith(".ts") ? "typescript" : "javascript",
        isModified: false,
        handle: fileHandle,
      };
      setFiles((prev) => [...prev.filter((f) => f.path !== file.name), newFile]);
      setIsWorkspaceOpen(true);
      openFile(file.name);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Open file error:", err);
      }
    }
  };

  const saveActiveFile = async () => {
    if (!activeFile) return;
    try {
      if (projectIdParam) {
        const userEmail = localStorage.getItem("c2x_user_email") || "developer@example.com";
        await projectService.saveFile(projectIdParam, activeFile.path, activeFile.content, activeFile.language, userEmail);
      } else if (activeFile.handle && "createWritable" in activeFile.handle) {
        const writable = await (activeFile.handle as any).createWritable();
        await writable.write(activeFile.content);
        await writable.close();
      }
      setFiles((prev) =>
        prev.map((f) => (f.path === activePath ? { ...f, isModified: false } : f))
      );
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save file to cloud / local disk.");
    }
  };

  const saveAllFiles = async () => {
    setFiles((prev) => prev.map((f) => ({ ...f, isModified: false })));
  };

  const closeWorkspace = () => {
    if (confirm("Close current workspace?")) {
      setFiles([]);
      setWorkspaceName("");
      setIsWorkspaceOpen(false);
      setOpenPaths([]);
      setActivePath("");
      localStorage.removeItem("c2x_workspace_files");
      localStorage.removeItem("c2x_workspace_name");
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("c2x_search_history", JSON.stringify(searchHistory));
    } catch {
      // Ignore
    }
  }, [searchHistory]);

  const triggerSearch = useCallback(() => {
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
      searchControllerRef.current = null;
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchStatus("idle");
      setRegexError(null);
      setIsTruncated(false);
      return;
    }

    const controller = new AbortController();
    searchControllerRef.current = controller;
    setSearchStatus("searching");
    setRegexError(null);

    const options: SearchOptions = {
      query: searchQuery,
      matchCase,
      wholeWord,
      useRegex,
      includePattern,
      excludePattern,
      searchScope,
      activePath,
      openPaths,
      maxResults: 2000,
    };

    searchWorkspaceAsync(
      files,
      options,
      controller.signal,
      (batchResults, isComplete, truncated) => {
        if (controller.signal.aborted) return;
        setSearchResults(batchResults);
        setIsTruncated(truncated);
        if (isComplete) {
          setSearchStatus("complete");
        }
      }
    ).catch((err) => {
      if (controller.signal.aborted) return;
      setRegexError(err.message || "Search error");
      setSearchResults([]);
      setSearchStatus("error");
    });
  }, [searchQuery, matchCase, wholeWord, useRegex, includePattern, excludePattern, searchScope, activePath, openPaths, files]);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [triggerSearch]);

  // Cancel search when Search panel closes or workspace changes
  useEffect(() => {
    if (activeSidebar !== "search") {
      if (searchControllerRef.current) {
        searchControllerRef.current.abort();
        searchControllerRef.current = null;
      }
    }
  }, [activeSidebar, isWorkspaceOpen]);

  const handleSelectSearchResult = (result: SearchResult) => {
    openFile(result.file.path);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.revealLineInCenter(result.line);
        editorRef.current.setPosition({ lineNumber: result.line, column: result.column });
        editorRef.current.setSelection({
          startLineNumber: result.line,
          startColumn: result.column,
          endLineNumber: result.line,
          endColumn: result.endColumn,
        });
        editorRef.current.focus();

        if (monacoRef.current) {
          try {
            editorRef.current.deltaDecorations([], [
              {
                range: new monacoRef.current.Range(result.line, result.column, result.line, result.endColumn),
                options: {
                  className: styles.searchMatchHighlight,
                  overviewRuler: { color: "#58a6ff", position: 1 },
                },
              },
            ]);
          } catch {
            // Ignore
          }
        }
      }
    }, 50);
  };

  const replaceSingleMatch = (result: SearchResult) => {
    const file = files.find((f) => f.path === result.file.path);
    if (!file) return;

    const lines = file.content.split("\n");
    const lineIdx = result.line - 1;
    const lineText = lines[lineIdx];
    if (lineText === undefined) return;

    const newLineText = lineText.substring(0, result.column - 1) + replaceQuery + lineText.substring(result.endColumn - 1);
    lines[lineIdx] = newLineText;
    const newContent = lines.join("\n");

    setFiles((prev) => prev.map((f) => (f.path === file.path ? { ...f, content: newContent, isModified: true } : f)));
    setTimeout(() => triggerSearch(), 50);
  };

  const replaceAllMatches = () => {
    if (searchResults.length === 0) return;

    const fileMap = new Map<string, SearchResult[]>();
    searchResults.forEach((r) => {
      const list = fileMap.get(r.fileUri) || [];
      list.push(r);
      fileMap.set(r.fileUri, list);
    });

    let updatedFiles = [...files];
    let totalReplacements = 0;
    const fileCount = fileMap.size;

    fileMap.forEach((results, fileUri) => {
      const file = updatedFiles.find((f) => f.path === fileUri);
      if (!file) return;

      const lines = file.content.split("\n");
      const sorted = [...results].sort((a, b) => {
        if (b.line !== a.line) return b.line - a.line;
        return b.column - a.column;
      });

      sorted.forEach((r) => {
        const lineIdx = r.line - 1;
        if (lines[lineIdx] !== undefined) {
          const lineText = lines[lineIdx];
          lines[lineIdx] = lineText.substring(0, r.column - 1) + replaceQuery + lineText.substring(r.endColumn - 1);
          totalReplacements++;
        }
      });

      const newContent = lines.join("\n");
      updatedFiles = updatedFiles.map((f) => (f.path === fileUri ? { ...f, content: newContent, isModified: true } : f));
    });

    setFiles(updatedFiles);
    alert(`${totalReplacements} replacements completed across ${fileCount} files.`);
    setSearchResults([]);
  };

  const handleCloneRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloneUrl.trim()) return;
    const repoName = cloneUrl.split("/").pop()?.replace(".git", "") || "cloned-repo";
    const importedFiles: WorkspaceFile[] = [
      {
        path: "README.md",
        name: "README.md",
        language: "markdown",
        content: `# ${repoName}\n\nImported from ${cloneUrl}\n\n## Overview\nSuccessfully imported repository into C2X Web IDE sandbox.`,
        isModified: true,
      },
      {
        path: "src/index.js",
        name: "index.js",
        language: "javascript",
        content: `// Main entry point for ${repoName}\nconsole.log("Hello from ${repoName}!");`,
        isModified: true,
      },
    ];
    setWorkspaceName(repoName);
    setFiles(importedFiles);
    setIsWorkspaceOpen(true);
    setOpenPaths(["README.md"]);
    setActivePath("README.md");
    setCloneModalOpen(false);
    setCloneUrl("");
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    setFiles((prev) =>
      prev.map((f) => (f.path === activePath ? { ...f, content: value, isModified: autoSaveMode === "Off" } : f))
    );
  };

  const handlePasteToEditor = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (editorRef.current && text) {
        editorRef.current.focus();
        const selection = editorRef.current.getSelection();
        if (selection) {
          editorRef.current.executeEdits("paste", [
            {
              range: selection,
              text: text,
              forceMoveMarkers: true,
            },
          ]);
        }
      }
    } catch (err) {
      console.error("Paste failed:", err);
    }
  };

  const handleGitCommit = () => {
    if (!gitCommitMsg.trim()) return;
    setFiles((prev) => prev.map((f) => ({ ...f, isModified: false })));
    setGitCommitMsg("");
  };

  const handleGotoLine = () => {
    if (editorRef.current) {
      const line = parseInt(gotoLineNum, 10);
      if (!isNaN(line) && line > 0) {
        editorRef.current.revealLineInCenter(line);
        editorRef.current.setPosition({ lineNumber: line, column: 1 });
        editorRef.current.focus();
      }
    }
    setGotoLineModalOpen(false);
  };

  const handleRevertFile = () => {
    if (!activeFile) return;
    setFiles((prev) =>
      prev.map((f) => (f.path === activePath ? { ...f, isModified: false } : f))
    );
  };

  const openFile = (path: string) => {
    if (!openPaths.includes(path)) {
      setOpenPaths((prev) => [...prev, path]);
    }
    setActivePath(path);
  };

  const closeTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextOpen = openPaths.filter((p) => p !== path);
    setOpenPaths(nextOpen);
    if (activePath === path && nextOpen.length > 0) {
      setActivePath(nextOpen[nextOpen.length - 1]);
    }
  };

  // VS Code inline creation
  const startCreating = (parentDir = "", isDirectory = false) => {
    setIsWorkspaceOpen(true);
    setCreatingItem({ parentDir, isDirectory });
    setNewItemName("");
    if (parentDir) {
      setExpandedFolders((prev) => ({ ...prev, [parentDir]: true }));
    }
  };

  const submitCreating = () => {
    if (!creatingItem || !newItemName.trim()) {
      setCreatingItem(null);
      return;
    }
    const prefix = creatingItem.parentDir ? `${creatingItem.parentDir}/` : "";
    const path = `${prefix}${newItemName.trim()}`;
    if (files.some((f) => f.path === path)) {
      alert("File or folder already exists!");
      return;
    }

    if (creatingItem.isDirectory) {
      const newFile: WorkspaceFile = {
        path: `${path}/.gitkeep`,
        name: ".gitkeep",
        content: "",
        language: "plaintext",
        isModified: true,
      };
      setFiles((prev) => [...prev, newFile]);
      setExpandedFolders((prev) => ({ ...prev, [path]: true }));
    } else {
      const ext = path.split(".").pop() || "";
      let lang = "plaintext";
      if (["ts", "tsx"].includes(ext)) lang = "typescript";
      else if (["js", "jsx"].includes(ext)) lang = "javascript";
      else if (ext === "json") lang = "json";
      else if (ext === "md") lang = "markdown";
      else if (ext === "html") lang = "html";
      else if (ext === "css") lang = "css";

      const newFile: WorkspaceFile = {
        path,
        name: path.split("/").pop() || path,
        content: "// New file\n",
        language: lang,
        isModified: true,
      };
      setFiles((prev) => [...prev, newFile]);
      openFile(path);
    }
    setCreatingItem(null);
    setNewItemName("");
  };

  const deleteFile = (path: string) => {
    if (confirm(`Are you sure you want to delete ${path}?`)) {
      setFiles((prev) => prev.filter((f) => f.path !== path));
      const nextOpen = openPaths.filter((p) => p !== path);
      setOpenPaths(nextOpen);
      if (activePath === path && nextOpen.length > 0) {
        setActivePath(nextOpen[0]);
      } else if (nextOpen.length === 0) {
        setActivePath("");
      }
    }
  };

  const renameFile = (oldPath: string) => {
    const newPath = prompt("Enter new path/name:", oldPath);
    if (!newPath || newPath === oldPath) return;
    setFiles((prev) =>
      prev.map((f) => (f.path === oldPath ? { ...f, path: newPath, name: newPath.split("/").pop() || newPath, isModified: true } : f))
    );
    setOpenPaths((prev) => prev.map((p) => (p === oldPath ? newPath : p)));
    if (activePath === oldPath) setActivePath(newPath);
  };

  const downloadFile = (path: string) => {
    const file = files.find((f) => f.path === path);
    if (!file) return;
    const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Centralized Command Registry
  const COMMANDS: C2XCommand[] = [
    { id: "file.newTextFile", title: "File: New Text File", category: "File", shortcut: "Ctrl+N", execute: () => startCreating("", false) },
    { id: "file.openFile", title: "File: Open File...", category: "File", shortcut: "Ctrl+O", execute: () => handleOpenFile() },
    { id: "file.openFolder", title: "File: Open Folder...", category: "File", shortcut: "Ctrl+K Ctrl+O", execute: () => handleOpenFolder() },
    { id: "file.save", title: "File: Save", category: "File", shortcut: "Ctrl+S", execute: () => saveActiveFile(), enabled: isWorkspaceOpen },
    { id: "file.saveAll", title: "File: Save All", category: "File", execute: () => saveAllFiles(), enabled: isWorkspaceOpen },
    { id: "file.closeWorkspace", title: "File: Close Workspace", category: "File", shortcut: "", execute: () => closeWorkspace(), enabled: isWorkspaceOpen },
    { id: "view.toggleSidebar", title: "View: Toggle Primary Side Bar", category: "View", shortcut: "Ctrl+B", execute: () => setActiveSidebar(activeSidebar ? null : "explorer") },
    { id: "view.toggleTerminal", title: "View: Toggle Terminal", category: "View", shortcut: "Ctrl+`", execute: () => setActivePanel(activePanel === "terminal" ? null : "terminal") },
    { id: "view.commandPalette", title: "View: Command Palette", category: "View", shortcut: "Ctrl+Shift+P", execute: () => setCommandPaletteOpen(true) },
    { id: "go.quickOpen", title: "Go: Quick File Open", category: "Go", shortcut: "Ctrl+P", execute: () => setQuickOpenOpen(true), enabled: isWorkspaceOpen },
    { id: "go.gotoLine", title: "Go: Go to Line/Column...", category: "Go", shortcut: "Ctrl+G", execute: () => setGotoLineModalOpen(true), enabled: isWorkspaceOpen },
    { id: "preferences.settings", title: "Preferences: Open Settings", category: "Preferences", shortcut: "Ctrl+,", execute: () => setSettingsOpen(true) },
    { id: "git.clone", title: "Git: Clone Repository", category: "Git", shortcut: "", execute: () => setCloneModalOpen(true) },
    { id: "search.open", title: "View: Search (Find in Workspace)", category: "View", shortcut: "Ctrl+Shift+F", execute: () => setActiveSidebar("search") },
    { id: "search.find", title: "Search: Find in Workspace", category: "Search", shortcut: "Ctrl+Shift+F", execute: () => setActiveSidebar("search") },
    { id: "search.replace", title: "Search: Replace in Files", category: "Search", shortcut: "Ctrl+Shift+H", execute: () => { setActiveSidebar("search"); setIsReplaceOpen(true); } },
    { id: "search.findInFiles", title: "Edit: Find in Files", category: "Edit", shortcut: "Ctrl+Shift+F", execute: () => setActiveSidebar("search") },
    { id: "search.replaceInFiles", title: "Edit: Replace in Files", category: "Edit", shortcut: "Ctrl+Shift+H", execute: () => { setActiveSidebar("search"); setIsReplaceOpen(true); } },
    { id: "search.clear", title: "Search: Clear Search", category: "Search", execute: () => { setSearchQuery(""); setSearchResults([]); } },
    { id: "search.replaceAll", title: "Search: Replace All", category: "Search", execute: () => replaceAllMatches(), enabled: searchResults.length > 0 },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const q = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: "user", text: q }]);
    setAiInput("");

    setTimeout(() => {
      let reply = `Analyzing ${activeFile?.name || "workspace"}...`;
      if (q.toLowerCase().includes("explain") && activeFile) {
        reply = `This is ${activeFile.path}, written in ${activeFile.language}.`;
      } else {
        reply = `Received query. No errors detected in local workspace.`;
      }
      setAiMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }, 500);
  };

  const handleContextMenu = (e: React.MouseEvent, path: string, isDirectory: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    const menuWidth = 240;
    const menuHeight = 490;

    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = Math.max(10, window.innerWidth - menuWidth - 10);
    }

    if (y + menuHeight > window.innerHeight) {
      y = Math.max(10, window.innerHeight - menuHeight - 10);
    }

    setContextMenu({ x, y, path, isDirectory });
  };

  const renderTreeNode = (node: TreeNode, depth = 0) => {
    const entries = Object.values(node.children);
    const isCreatingHere = creatingItem && creatingItem.parentDir === node.path;

    return (
      <>
        {entries.map((child) => {
          if (child.isDirectory) {
            const isExpanded = expandedFolders[child.path] !== false;
            return (
              <div key={child.path} className={styles.treeFolder}>
                <div
                  className={styles.folderRow}
                  style={{ paddingLeft: `${depth * 12 + 12}px` }}
                  onClick={() => toggleFolder(child.path)}
                  onContextMenu={(e) => handleContextMenu(e, child.path, true)}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />}
                  <span className={styles.folderName}>{child.name}</span>
                  <button
                    className={styles.treeAddBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      startCreating(child.path, false);
                    }}
                    title="New File..."
                  >
                    <Plus size={12} />
                  </button>
                </div>
                {isExpanded && <div className={styles.folderChildren}>{renderTreeNode(child, depth + 1)}</div>}
              </div>
            );
          } else {
            const file = child.file;
            if (!file) return null;
            const isActive = activePath === file.path;
            return (
              <div
                key={file.path}
                className={cn(styles.fileRow, isActive && styles.active)}
                style={{ paddingLeft: `${depth * 12 + 28}px` }}
                onClick={() => openFile(file.path)}
                onContextMenu={(e) => handleContextMenu(e, file.path, false)}
              >
                <FileIcon fileName={file.name} size={16} />
                <span className={styles.fileName}>{file.name}</span>
                {file.isModified && <span className={styles.modifiedDot} />}
                <button
                  className={styles.deleteFileBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFile(file.path);
                  }}
                  title="Delete file"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          }
        })}

        {/* VS Code Inline New File / Folder input */}
        {isCreatingHere && (
          <div className={styles.inlineInputRow} style={{ paddingLeft: `${depth * 12 + 28}px` }}>
            {creatingItem.isDirectory ? <Folder size={16} /> : <FileCode size={16} />}
            <input
              ref={inlineInputRef}
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitCreating();
                if (e.key === "Escape") setCreatingItem(null);
              }}
              onBlur={() => submitCreating()}
              placeholder={creatingItem.isDirectory ? "folder name" : "filename.tsx"}
              className={styles.inlineInputField}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.ideContainer} ref={menuRef}>
      {/* Preview Notification Banner */}
      {showBanner && (
        <div className={styles.previewBanner}>
          <div className={styles.bannerLeft}>
            <span className={styles.bannerBadge}>C2X</span>
            <span>C2X Web IDE (Preview). Anywhere, anytime, entirely in your browser.</span>
          </div>
          <div className={styles.bannerRight}>
            <Link to="/docs" target="_blank" rel="noopener noreferrer">Read the Documentation</Link>
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy & Cookies</Link>
            <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Use</Link>
            <Link to="/download" target="_blank" rel="noopener noreferrer">Download C2X</Link>
            <button onClick={() => setShowBanner(false)} aria-label="Close banner">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Top Menu Bar — Hover-to-Open & Leave-to-Close */}
      <div
        className={styles.topMenuBar}
        onMouseLeave={() => {
          setActiveMenu(null);
          setActiveSubMenu(null);
        }}
      >
        <div className={styles.menuLeft}>
          <div className={styles.appLogo}>
            <span className={styles.logoBadge}>C2X</span>
            <span className={styles.logoTitle}>Web IDE</span>
          </div>
          <div className={styles.menuItems}>
            {/* File Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("file");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "file" ? null : "file"); setActiveSubMenu(null); }}>File</span>
              {activeMenu === "file" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  <div onClick={() => { startCreating("", false); setActiveMenu(null); setActiveSubMenu(null); }}>New Text File <span className={styles.shortcut}>Ctrl+N</span></div>
                  <div onClick={() => { startCreating("", false); setActiveMenu(null); setActiveSubMenu(null); }}>New File...</div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { handleOpenFile(); setActiveMenu(null); setActiveSubMenu(null); }}>Open File... <span className={styles.shortcut}>Ctrl+O</span></div>
                  <div onClick={() => { handleOpenFolder(); setActiveMenu(null); setActiveSubMenu(null); }}>Open Folder... <span className={styles.shortcut}>Ctrl+K Ctrl+O</span></div>
                  <div className={styles.menuDivider} />
                  <div
                    className={styles.hasSubMenu}
                    onMouseEnter={() => setActiveSubMenu("openRecent")}
                  >
                    <span>Open Recent</span> <ChevronRight size={12} />
                    {activeSubMenu === "openRecent" && (
                      <div className={styles.subDropdownMenu}>
                        {files.slice(0, 3).map((f) => (
                          <div key={f.path} onClick={() => { openFile(f.path); setActiveMenu(null); setActiveSubMenu(null); }}>{f.path}</div>
                        ))}
                        {files.length === 0 && <div style={{ opacity: 0.6, cursor: "default" }}>No recent files</div>}
                        <div className={styles.menuDivider} />
                        <div onClick={() => { localStorage.removeItem("c2x_workspace_files"); setFiles([]); setActiveMenu(null); setActiveSubMenu(null); }}>Clear Recently Opened</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { saveActiveFile(); setActiveMenu(null); setActiveSubMenu(null); }}>Save <span className={styles.shortcut}>Ctrl+S</span></div>
                  <div onClick={() => { if (activeFile) downloadFile(activeFile.path); setActiveMenu(null); setActiveSubMenu(null); }}>Save As... <span className={styles.shortcut}>Ctrl+Shift+S</span></div>
                  <div onClick={() => { saveAllFiles(); setActiveMenu(null); setActiveSubMenu(null); }}>Save All</div>
                  <div className={styles.menuDivider} />
                  <div
                    className={styles.hasSubMenu}
                    onMouseEnter={() => setActiveSubMenu("autoSave")}
                  >
                    <span>Auto Save</span> <ChevronRight size={12} />
                    {activeSubMenu === "autoSave" && (
                      <div className={styles.subDropdownMenu}>
                        <div onClick={() => { setAutoSaveMode("Off"); setActiveMenu(null); setActiveSubMenu(null); }}>{autoSaveMode === "Off" ? "✓ " : ""}Off</div>
                        <div onClick={() => { setAutoSaveMode("After Delay"); setActiveMenu(null); setActiveSubMenu(null); }}>{autoSaveMode === "After Delay" ? "✓ " : ""}After Delay</div>
                        <div onClick={() => { setAutoSaveMode("On Focus Change"); setActiveMenu(null); setActiveSubMenu(null); }}>{autoSaveMode === "On Focus Change" ? "✓ " : ""}On Focus Change</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { handleRevertFile(); setActiveMenu(null); setActiveSubMenu(null); }}>Revert File</div>
                  <div onClick={() => { if (activeFile) { closeTab(activeFile.path, {} as any); } setActiveMenu(null); setActiveSubMenu(null); }}>Close Editor <span className={styles.shortcut}>Ctrl+W</span></div>
                  <div onClick={() => { closeWorkspace(); setActiveMenu(null); setActiveSubMenu(null); }}>Close Folder</div>
                </div>
              )}
            </div>

            {/* Edit Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("edit");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "edit" ? null : "edit"); setActiveSubMenu(null); }}>Edit</span>
              {activeMenu === "edit" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.getModel()?.undo(); } setActiveMenu(null); setActiveSubMenu(null); }}>Undo <span className={styles.shortcut}>Ctrl+Z</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.getModel()?.redo(); } setActiveMenu(null); setActiveSubMenu(null); }}>Redo <span className={styles.shortcut}>Ctrl+Y</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.clipboardCutAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Cut <span className={styles.shortcut}>Ctrl+X</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.clipboardCopyAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Copy <span className={styles.shortcut}>Ctrl+C</span></div>
                  <div onClick={() => { handlePasteToEditor(); setActiveMenu(null); setActiveSubMenu(null); }}>Paste <span className={styles.shortcut}>Ctrl+V</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "actions.find", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Find <span className={styles.shortcut}>Ctrl+F</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.startFindReplaceAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Replace <span className={styles.shortcut}>Ctrl+H</span></div>
                  <div onClick={() => { setActiveSidebar("search"); setIsReplaceOpen(false); setActiveMenu(null); setActiveSubMenu(null); }}>Find in Files <span className={styles.shortcut}>Ctrl+Shift+F</span></div>
                  <div onClick={() => { setActiveSidebar("search"); setIsReplaceOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Replace in Files <span className={styles.shortcut}>Ctrl+Shift+H</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.commentLine", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Toggle Line Comment <span className={styles.shortcut}>Ctrl+/</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.formatDocument", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Format Document</div>
                </div>
              )}
            </div>

            {/* Selection Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("selection");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "selection" ? null : "selection"); setActiveSubMenu(null); }}>Selection</span>
              {activeMenu === "selection" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.selectAll", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Select All <span className={styles.shortcut}>Ctrl+A</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.smartSelect.expand", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Expand Selection</div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.smartSelect.shrink", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Shrink Selection</div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.copyLinesUpAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Copy Line Up</div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.copyLinesDownAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Copy Line Down</div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.moveCarretUpAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Move Line Up <span className={styles.shortcut}>Alt+Up</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.moveCarretDownAction", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Move Line Down <span className={styles.shortcut}>Alt+Down</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.insertCursorAbove", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Add Cursor Above <span className={styles.shortcut}>Ctrl+Alt+Up</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.insertCursorBelow", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Add Cursor Below <span className={styles.shortcut}>Ctrl+Alt+Down</span></div>
                  <div onClick={() => { if (editorRef.current) { editorRef.current.focus(); editorRef.current.trigger("keyboard", "editor.action.selectHighlights", null); } setActiveMenu(null); setActiveSubMenu(null); }}>Select All Occurrences <span className={styles.shortcut}>Ctrl+Shift+L</span></div>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("view");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "view" ? null : "view"); setActiveSubMenu(null); }}>View</span>
              {activeMenu === "view" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { setCommandPaletteOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Command Palette... <span className={styles.shortcut}>Ctrl+Shift+P</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setActiveSidebar(activeSidebar ? null : "explorer"); setActiveMenu(null); setActiveSubMenu(null); }}>Explorer <span className={styles.shortcut}>Ctrl+Shift+E</span></div>
                  <div onClick={() => { setActiveSidebar("search"); setActiveMenu(null); setActiveSubMenu(null); }}>Search <span className={styles.shortcut}>Ctrl+Shift+F</span></div>
                  <div onClick={() => { setActiveSidebar("git"); setActiveMenu(null); setActiveSubMenu(null); }}>Source Control <span className={styles.shortcut}>Ctrl+Shift+G</span></div>
                  <div onClick={() => { setActiveSidebar("debug"); setActiveMenu(null); setActiveSubMenu(null); }}>Run and Debug</div>
                  <div onClick={() => { setActiveSidebar("extensions"); setActiveMenu(null); setActiveSubMenu(null); }}>Extensions <span className={styles.shortcut}>Ctrl+Shift+X</span></div>
                  <div onClick={() => { setActiveSidebar("ai"); setActiveMenu(null); setActiveSubMenu(null); }}>C2X AI Assistant</div>
                  <div onClick={() => { setActiveSidebar("collab"); setActiveMenu(null); setActiveSubMenu(null); }}>Collaboration</div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setActivePanel("problems"); setActiveMenu(null); setActiveSubMenu(null); }}>Problems</div>
                  <div onClick={() => { setActivePanel("output"); setActiveMenu(null); setActiveSubMenu(null); }}>Output</div>
                  <div onClick={() => { setActivePanel("terminal"); setActiveMenu(null); setActiveSubMenu(null); }}>Terminal <span className={styles.shortcut}>Ctrl+`</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setSettingsOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Preferences / Settings <span className={styles.shortcut}>Ctrl+,</span></div>
                </div>
              )}
            </div>

            {/* Go Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("go");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "go" ? null : "go"); setActiveSubMenu(null); }}>Go</span>
              {activeMenu === "go" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { setQuickOpenOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Go to File... <span className={styles.shortcut}>Ctrl+P</span></div>
                  <div onClick={() => { setGotoLineModalOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Go to Line/Column... <span className={styles.shortcut}>Ctrl+G</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setActivePanel("problems"); setActiveMenu(null); setActiveSubMenu(null); }}>Next Problem <span className={styles.shortcut}>F8</span></div>
                  <div onClick={() => { setActivePanel("problems"); setActiveMenu(null); setActiveSubMenu(null); }}>Previous Problem <span className={styles.shortcut}>Shift+F8</span></div>
                </div>
              )}
            </div>

            {/* Run Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("run");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "run" ? null : "run"); setActiveSubMenu(null); }}>Run</span>
              {activeMenu === "run" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { setActiveSidebar("debug"); setActiveMenu(null); setActiveSubMenu(null); }}>Start Debugging <span className={styles.shortcut}>F5</span></div>
                  <div onClick={() => { setActivePanel("output"); setActiveMenu(null); setActiveSubMenu(null); }}>Run Without Debugging <span className={styles.shortcut}>Ctrl+F5</span></div>
                  <div onClick={() => { setActivePanel("output"); setActiveMenu(null); setActiveSubMenu(null); }}>Stop <span className={styles.shortcut}>Shift+F5</span></div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setSettingsOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Open Configurations</div>
                  <div onClick={() => { setCommandPaletteOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>Run Task...</div>
                </div>
              )}
            </div>

            {/* Terminal Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("terminal");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "terminal" ? null : "terminal"); setActiveSubMenu(null); }}>Terminal</span>
              {activeMenu === "terminal" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { setActivePanel("terminal"); setActiveMenu(null); setActiveSubMenu(null); }}>New Terminal <span className={styles.shortcut}>Ctrl+`</span></div>
                  <div onClick={() => { setActivePanel("terminal"); setActiveMenu(null); setActiveSubMenu(null); }}>Split Terminal</div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { setActivePanel("terminal"); setActiveMenu(null); setActiveSubMenu(null); }}>Clear Terminal</div>
                </div>
              )}
            </div>

            {/* Help Menu */}
            <div
              className={styles.menuDropdownWrapper}
              onMouseEnter={() => {
                setActiveMenu("help");
                setActiveSubMenu(null);
              }}
            >
              <span onClick={() => { setActiveMenu(activeMenu === "help" ? null : "help"); setActiveSubMenu(null); }}>Help</span>
              {activeMenu === "help" && (
                <div className={styles.dropdownMenu}>
                  <div onClick={() => { window.open("/docs", "_blank"); setActiveMenu(null); setActiveSubMenu(null); }}>Welcome / Get Started</div>
                  <div onClick={() => { window.open("/docs", "_blank"); setActiveMenu(null); setActiveSubMenu(null); }}>Documentation</div>
                  <div onClick={() => { window.open("/docs/shortcuts", "_blank"); setActiveMenu(null); setActiveSubMenu(null); }}>Keyboard Shortcuts Reference</div>
                  <div className={styles.menuDivider} />
                  <div onClick={() => { window.open("https://github.com/CollaborativeCodingExperience/C2X", "_blank"); setActiveMenu(null); setActiveSubMenu(null); }}>Report Issue / GitHub</div>
                  <div onClick={() => { setAboutModalOpen(true); setActiveMenu(null); setActiveSubMenu(null); }}>About C2X Web IDE</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.menuCenter}>
          <span className={styles.workspaceTitle}>
            {isWorkspaceOpen && openPaths.length > 0 ? `${workspaceName || "workspace"} — ${activeFile?.path || "No file open"}` : "Welcome Workspace"}
          </span>
        </div>
        <div className={styles.menuRight}>
          <button
            className={styles.menuBtn}
            onClick={() => setCommandPaletteOpen(true)}
            title="Command Palette (Ctrl+Shift+P)"
          >
            ⌘P / Ctrl+Shift+P
          </button>
          <a href="/" className={styles.exitBtn}>
            Exit to Website
          </a>
        </div>
      </div>

      {/* Main IDE Body */}
      <div className={styles.ideBody}>
        {/* Activity Bar */}
        <div className={styles.activityBar}>
          <div
            className={cn(styles.activityIcon, activeSidebar === "explorer" && styles.active)}
            onClick={() => setActiveSidebar(activeSidebar === "explorer" ? null : "explorer")}
            title="Explorer"
          >
            <Files size={20} />
          </div>
          <div
            className={cn(styles.activityIcon, activeSidebar === "search" && styles.active)}
            onClick={() => setActiveSidebar(activeSidebar === "search" ? null : "search")}
            title="Search"
          >
            <Search size={20} />
          </div>
          <div
            className={cn(styles.activityIcon, activeSidebar === "git" && styles.active)}
            onClick={() => setActiveSidebar(activeSidebar === "git" ? null : "git")}
            title="Source Control"
          >
            <GitBranch size={20} />
          </div>
          <div
            className={cn(styles.activityIcon, activeSidebar === "debug" && styles.active)}
            onClick={() => setActiveSidebar(activeSidebar === "debug" ? null : "debug")}
            title="Run & Debug"
          >
            <Play size={20} />
          </div>
          <div
            className={cn(styles.activityIcon, activeSidebar === "extensions" && styles.active)}
            onClick={() => setActiveSidebar(activeSidebar === "extensions" ? null : "extensions")}
            title="Extensions"
          >
            <Puzzle size={20} />
          </div>
          <div style={{ marginTop: "auto" }}>
            <div
              className={styles.activityIcon}
              onClick={() => setSettingsOpen(true)}
              title="Settings"
            >
              <Settings size={20} />
            </div>
          </div>
        </div>

        {/* Sidebar Panel with Resizable Width */}
        {activeSidebar && (
          <div className={styles.sidebarPanel} style={{ width: `${sidebarWidth}px` }}>
            {activeSidebar === "explorer" && (
              <div className={styles.explorer}>
                <div className={styles.sidebarHeader}>
                  <span>Explorer</span>
                  <div className={styles.sidebarActions}>
                    {isWorkspaceOpen && (
                      <button onClick={() => startCreating("", false)} title="New File...">
                        <Plus size={15} />
                      </button>
                    )}
                    <button onClick={() => startCreating("", true)} title="New Folder...">
                      <FolderPlus size={15} />
                    </button>
                    <button onClick={handleOpenFolder} title="Open Folder...">
                      <FolderOpen size={15} />
                    </button>
                  </div>
                </div>
                <div className={styles.fileTree}>
                  {!isWorkspaceOpen ? (
                    <div className={styles.emptyExplorerState}>
                      <div className={styles.emptyFolderTitle}>
                        <ChevronDown size={14} /> No Folder Opened
                      </div>
                      <p className={styles.emptyDesc}>You have not yet opened a folder.</p>
                      <button className={styles.emptyActionBtn} onClick={handleOpenFolder}>
                        Open Folder
                      </button>
                      <p className={styles.emptyNote}>
                        Opening a folder will close all currently open editors. To keep them open, add a folder instead.
                      </p>
                      <button className={styles.emptyActionBtn} onClick={() => setCloneModalOpen(true)}>
                        Open Repository
                      </button>
                      <p className={styles.emptyNote}>
                        To learn more about how to use Git and source control in C2X Web IDE,{" "}
                        <Link to="/docs" className={styles.docLink}>read our docs</Link>.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.folderRoot}>
                        <FolderOpen size={14} />
                        <span>{workspaceName || "workspace"}</span>
                      </div>
                      {renderTreeNode(fileTree)}
                    </>
                  )}
                </div>
              </div>
            )}

            {activeSidebar === "search" && (
              <div className={styles.searchPanel}>
                <div className={styles.sidebarHeader}>
                  <span>SEARCH</span>
                  <div className={styles.sidebarActions}>
                    <button
                      onClick={() => setIsReplaceOpen(!isReplaceOpen)}
                      title="Toggle Replace"
                    >
                      {isReplaceOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    <button
                      onClick={() => triggerSearch()}
                      title="Refresh Search"
                    >
                      <Radio size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setSearchStatus("idle");
                      }}
                      title="Clear Search"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className={styles.searchBoxContainer}>
                  <div className={styles.searchRow}>
                    <div className={styles.searchInputsCol}>
                      <div className={styles.searchInputWrap}>
                        <input
                          type="text"
                          placeholder="Search (Ctrl+Shift+F)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              triggerSearch();
                              if (searchQuery.trim()) {
                                setSearchHistory((prev) => Array.from(new Set([searchQuery, ...prev])).slice(0, 10));
                              }
                            }
                          }}
                          className={styles.searchInput}
                          autoFocus
                        />
                        <div className={styles.searchOptionsIcons}>
                          <button
                            className={cn(styles.optBtn, matchCase && styles.active)}
                            onClick={() => setMatchCase(!matchCase)}
                            title="Match Case (Alt+C)"
                          >
                            Aa
                          </button>
                          <button
                            className={cn(styles.optBtn, wholeWord && styles.active)}
                            onClick={() => setWholeWord(!wholeWord)}
                            title="Match Whole Word (Alt+W)"
                          >
                            Ab
                          </button>
                          <button
                            className={cn(styles.optBtn, useRegex && styles.active)}
                            onClick={() => setUseRegex(!useRegex)}
                            title="Use Regular Expression (Alt+R)"
                          >
                            .*
                          </button>
                        </div>
                      </div>

                      {isReplaceOpen && (
                        <div className={styles.searchInputWrap} style={{ marginTop: "4px" }}>
                          <input
                            type="text"
                            placeholder="Replace"
                            value={replaceQuery}
                            onChange={(e) => setReplaceQuery(e.target.value)}
                            className={styles.searchInput}
                          />
                          <div className={styles.searchOptionsIcons}>
                            <button
                              className={styles.optBtn}
                              onClick={replaceAllMatches}
                              title="Replace All (Ctrl+Alt+Enter)"
                            >
                              All
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.searchIncludeExcludeToggle}>
                    <span onClick={() => setShowIncludeExclude(!showIncludeExclude)}>
                      {showIncludeExclude ? <ChevronDown size={12} /> : <ChevronRight size={12} />} files to include/exclude
                    </span>
                  </div>

                  {showIncludeExclude && (
                    <div className={styles.includeExcludeBox}>
                      <input
                        type="text"
                        placeholder="files to include (e.g. *.tsx, src/**)"
                        value={includePattern}
                        onChange={(e) => setIncludePattern(e.target.value)}
                        className={styles.searchInput}
                      />
                      <input
                        type="text"
                        placeholder="files to exclude (e.g. node_modules, dist)"
                        value={excludePattern}
                        onChange={(e) => setExcludePattern(e.target.value)}
                        className={styles.searchInput}
                        style={{ marginTop: "4px" }}
                      />
                    </div>
                  )}

                  {regexError && <div className={styles.searchError}>{regexError}</div>}
                </div>

                <div className={styles.searchResults}>
                  {searchStatus === "searching" && searchResults.length === 0 && (
                    <div className={styles.searchingStatus}>Searching workspace...</div>
                  )}

                  {isTruncated && (
                    <div className={styles.truncatedNotice}>
                      Showing first 2,000 results. Refine your search to see more.
                    </div>
                  )}

                  {searchResults.length > 0 ? (
                    <>
                      <div className={styles.searchSummary}>
                        <span>
                          {searchResults.length} results in {new Set(searchResults.map((r) => r.fileUri)).size} files
                        </span>
                        {isReplaceOpen && (
                          <button
                            className={styles.replaceAllBtn}
                            onClick={() =>
                              setReplaceModal({
                                matchCount: searchResults.length,
                                fileCount: new Set(searchResults.map((r) => r.fileUri)).size,
                                type: "all",
                              })
                            }
                          >
                            Replace All
                          </button>
                        )}
                      </div>
                      {Array.from(new Set(searchResults.map((r) => r.fileUri))).map((fileUri) => {
                        const fileResults = searchResults.filter((r) => r.fileUri === fileUri);
                        const file = files.find((f) => f.path === fileUri);
                        const isCollapsed = collapsedFiles[fileUri];
                        const showAll = expandedMatchCounts[fileUri];
                        const visibleResults = showAll ? fileResults : fileResults.slice(0, 20);

                        return (
                          <div key={fileUri} className={styles.searchFileGroup}>
                            <div
                              className={styles.searchFileHeader}
                              onClick={() => setCollapsedFiles((prev) => ({ ...prev, [fileUri]: !isCollapsed }))}
                            >
                              {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                              <FileIcon fileName={file?.name || fileUri} size={14} />
                              <span className={styles.searchFileName}>{fileUri}</span>
                              <span className={styles.searchBadge}>{fileResults.length}</span>
                            </div>
                            {!isCollapsed && (
                              <div className={styles.searchMatchesList}>
                                {visibleResults.map((r, idx) => (
                                  <div
                                    key={idx}
                                    className={styles.searchMatchRow}
                                    onClick={() => handleSelectSearchResult(r)}
                                  >
                                    <span className={styles.searchMatchLineNum}>{r.line}:</span>
                                    <span className={styles.searchMatchText}>
                                      {r.lineText.substring(0, r.column - 1)}
                                      <mark className={styles.highlightMark}>{r.matchText}</mark>
                                      {r.lineText.substring(r.endColumn - 1)}
                                    </span>
                                    {isReplaceOpen && (
                                      <button
                                        className={styles.replaceOneBtn}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          replaceSingleMatch(r);
                                        }}
                                        title="Replace"
                                      >
                                        Replace
                                      </button>
                                    )}
                                  </div>
                                ))}
                                {!showAll && fileResults.length > 20 && (
                                  <button
                                    className={styles.showMoreBtn}
                                    onClick={() => setExpandedMatchCounts((prev) => ({ ...prev, [fileUri]: true }))}
                                  >
                                    Show {fileResults.length - 20} more matches...
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : searchQuery && searchStatus !== "searching" ? (
                    <div className={styles.noResults}>0 results found</div>
                  ) : !searchQuery ? (
                    <div className={styles.noResults}>Type to search workspace files</div>
                  ) : null}
                </div>
              </div>
            )}

            {activeSidebar === "git" && (
              <div className={styles.gitPanel}>
                <div className={styles.sidebarHeader}>SOURCE CONTROL</div>
                <div className={styles.gitContent}>
                  <div className={styles.gitBranch}>Local Workspace Changes</div>
                  {files.filter((f) => f.isModified).length > 0 && (
                    <div className={styles.gitCommitWrap}>
                      <input
                        type="text"
                        placeholder="Commit message..."
                        value={gitCommitMsg}
                        onChange={(e) => setGitCommitMsg(e.target.value)}
                        className={styles.searchInput}
                      />
                      <button
                        className={styles.commitBtn}
                        onClick={handleGitCommit}
                        style={{ marginTop: "6px" }}
                      >
                        Commit All ({files.filter((f) => f.isModified).length})
                      </button>
                    </div>
                  )}
                  <div className={styles.changesLabel}>Modified Files ({files.filter((f) => f.isModified).length})</div>
                  {files.filter((f) => f.isModified).map((f) => (
                    <div key={f.path} className={styles.gitFileItem} onClick={() => openFile(f.path)}>
                      <span className={styles.gitMod}>M</span>
                      <span>{f.path}</span>
                    </div>
                  ))}
                  {files.filter((f) => f.isModified).length === 0 && (
                    <div className={styles.noResults}>No uncommitted changes</div>
                  )}
                </div>
              </div>
            )}

            {activeSidebar === "debug" && (
              <div className={styles.debugPanel}>
                <div className={styles.sidebarHeader}>RUN & DEBUG</div>
                <div className={styles.debugContent}>
                  <p className={styles.noResults}>Debugger integration not connected in browser sandbox.</p>
                </div>
              </div>
            )}

            {activeSidebar === "extensions" && (
              <div className={styles.extPanel}>
                <div className={styles.sidebarHeader}>EXTENSIONS</div>
                <div className={styles.extList}>
                  <div className={styles.extItem}>
                    <strong>Monaco Built-in Language Support</strong>
                    <p>Syntax highlighting and IntelliSense</p>
                    <span className={styles.installedBadge}>Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* Draggable handle on right edge of sidebar */}
            <div
              className={styles.resizeHandleRight}
              onMouseDown={() => {
                isResizingSidebar.current = true;
                document.body.style.cursor = "col-resize";
              }}
            />
          </div>
        )}

        {/* Editor Main Content Area */}
        <div className={styles.editorMainArea}>
          {!isWorkspaceOpen || openPaths.length === 0 ? (
            <div className={styles.welcomeScreen}>
              <div className={styles.welcomeCardContainer}>
                <div className={styles.welcomeHeader}>
                  <h1>C2X Web IDE</h1>
                  <p>Editing evolved</p>
                </div>
                <div className={styles.welcomeSingleColumn}>
                  <div className={styles.welcomeCol}>
                    <h3>Start</h3>
                    <ul>
                      <li onClick={() => startCreating("", false)}><FileText size={16} /> New File...</li>
                      <li onClick={handleOpenFile}><FileCode size={16} /> Open File...</li>
                      <li onClick={handleOpenFolder}><FolderOpen size={16} /> Open Folder...</li>
                      <li onClick={() => setCloneModalOpen(true)}><GitBranch size={16} /> Open Repository...</li>
                      <li onClick={() => setTunnelModalOpen(true)}><Radio size={16} /> Open Tunnel...</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.welcomeFooter}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={showWelcomePageStartup}
                      onChange={(e) => setShowWelcomePageStartup(e.target.checked)}
                    />
                    Show welcome page on startup
                  </label>
                  <p className={styles.privacyText}>
                    C2X collects usage data. Read our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy statement</Link> and learn how to opt out.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs Row */}
              <div className={styles.editorTabs}>
                {openPaths.map((path) => {
                  const file = files.find((f) => f.path === path);
                  if (!file) return null;
                  const isActive = activePath === path;
                  return (
                    <div
                      key={path}
                      className={cn(styles.editorTab, isActive && styles.active)}
                      onClick={() => setActivePath(path)}
                    >
                      <FileIcon fileName={file.name} size={14} />
                      <span>{file.name}</span>
                      {file.isModified && <span className={styles.tabDot} />}
                      <button
                        className={styles.closeTabBtn}
                        onClick={(e) => closeTab(path, e)}
                        title="Close tab"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Breadcrumbs */}
              <div className={styles.breadcrumbs}>
                <span>{workspaceName || "workspace"}</span>
                {activeFile && (
                  <>
                    <ChevronRight size={12} />
                    <span>{activeFile.path.split("/")[0]}</span>
                    <ChevronRight size={12} />
                    <span style={{ color: "#fff", fontWeight: 500 }}>{activeFile.name}</span>
                  </>
                )}
              </div>

              {/* Monaco Editor Container */}
              <div className={styles.monacoContainer}>
                {activeFile ? (
                  <Editor
                    height="100%"
                    path={activeFile.path}
                    language={activeFile.language}
                    theme={theme}
                    value={activeFile.content}
                    onChange={handleEditorChange}
                    onMount={(editor, monaco) => {
                      editorRef.current = editor;
                      monacoRef.current = monaco;
                      editor.onDidChangeCursorPosition((e) => {
                        setCursorPos({ line: e.position.lineNumber, col: e.position.column });
                      });
                    }}
                    options={{
                      fontSize: fontSize,
                      minimap: { enabled: true },
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                    }}
                  />
                ) : (
                  <div className={styles.noFileOpen}>No file open</div>
                )}
              </div>
            </>
          )}

          {/* Bottom Panel Drawer with Resizable Height */}
          <div className={styles.bottomPanel} style={{ height: `${bottomPanelHeight}px` }}>
            {/* Draggable handle on top edge of bottom panel */}
            <div
              className={styles.resizeHandleTop}
              onMouseDown={() => {
                isResizingBottom.current = true;
                document.body.style.cursor = "row-resize";
              }}
            />

            <div className={styles.bottomPanelTabs}>
              <button
                className={cn(styles.bottomTab, activePanel === "problems" && styles.active)}
                onClick={() => setActivePanel("problems")}
              >
                Problems (0)
              </button>
              <button
                className={cn(styles.bottomTab, activePanel === "output" && styles.active)}
                onClick={() => setActivePanel("output")}
              >
                Output
              </button>
              <button
                className={cn(styles.bottomTab, activePanel === "terminal" && styles.active)}
                onClick={() => setActivePanel("terminal")}
              >
                Terminal
              </button>
            </div>

            {activePanel === "terminal" && (
              <div className={styles.terminalBox}>
                <div className={styles.terminalNotice}>
                  <strong>Integrated Terminal Notice:</strong> The integrated command-line terminal is not available in the C2X Web IDE browser sandbox environment. To run shell commands, build scripts, and local processes, please download and run the C2X desktop application.
                  <div style={{ marginTop: "10px" }}>
                    <a href="/download" target="_blank" rel="noopener noreferrer" className={styles.emptyActionBtn} style={{ display: "inline-block", textDecoration: "none" }}>
                      Download C2X Desktop
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activePanel === "problems" && (
              <div className={styles.problemsBox}>
                <p>No problems detected in workspace.</p>
              </div>
            )}

            {activePanel === "output" && (
              <div className={styles.outputBox}>
                <p>[C2X Sandbox] Browser environment ready.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explorer Context Menu Popup */}
      {contextMenu && (
        <div
          className={styles.explorerContextMenu}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div onClick={() => { startCreating(contextMenu.isDirectory ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf("/")), false); setContextMenu(null); }}>
            New File...
          </div>
          <div onClick={() => {
            startCreating(contextMenu.isDirectory ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf("/")), true);
            setContextMenu(null);
          }}>
            New Folder...
          </div>
          <div onClick={() => {
            const f = files.find(file => file.path === contextMenu.path);
            if (f && /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f.name)) {
              alert(`Opening image preview for ${f.name}`);
            } else {
              alert("Selected item is not an image file.");
            }
            setContextMenu(null);
          }}>
            Open in Images Preview
          </div>
          <div className={styles.menuDivider} />
          <div onClick={() => {
            setIncludePattern(`${contextMenu.path}/**`);
            setShowIncludeExclude(true);
            setActiveSidebar("search");
            setContextMenu(null);
          }}>
            Find in Folder... <span className={styles.shortcut}>Shift+Alt+F</span>
          </div>
          <div className={styles.menuDivider} />
          <div onClick={() => { navigator.clipboard.writeText(contextMenu.path); setContextMenu(null); }}>
            Cut <span className={styles.shortcut}>Ctrl+X</span>
          </div>
          <div onClick={() => { navigator.clipboard.writeText(contextMenu.path); setContextMenu(null); }}>
            Copy <span className={styles.shortcut}>Ctrl+C</span>
          </div>
          <div onClick={() => { handlePasteToEditor(); setContextMenu(null); }}>
            Paste <span className={styles.shortcut}>Ctrl+V</span>
          </div>
          <div className={styles.menuDivider} />
          <div onClick={() => { downloadFile(contextMenu.path); setContextMenu(null); }}>
            Download...
          </div>
          <div onClick={() => { handleOpenFile(); setContextMenu(null); }}>
            Upload...
          </div>
          <div className={styles.menuDivider} />
          <div onClick={() => { navigator.clipboard.writeText(contextMenu.path); setContextMenu(null); }}>
            Copy Path <span className={styles.shortcut}>Shift+Alt+C</span>
          </div>
          <div onClick={() => { navigator.clipboard.writeText(contextMenu.path); setContextMenu(null); }}>
            Copy Relative Path <span className={styles.shortcut}>Ctrl+K Ctrl+Shift+C</span>
          </div>
          <div className={styles.menuDivider} />
          <div onClick={() => { renameFile(contextMenu.path); setContextMenu(null); }}>
            Rename... <span className={styles.shortcut}>F2</span>
          </div>
          <div onClick={() => { deleteFile(contextMenu.path); setContextMenu(null); }}>
            Delete Permanently <span className={styles.shortcut}>Del</span>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <span className={styles.statusItem}>
            <GitBranch size={12} /> {workspaceName || "workspace"}
          </span>
          <span className={styles.statusItem}>
            <CheckCircle2 size={12} /> 0 Errors
          </span>
          <span className={styles.statusItem}>
            <Wifi size={12} /> Local Sandbox
          </span>
        </div>
        <div className={styles.statusRight}>
          <span className={styles.statusItem}>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span className={styles.statusItem}>UTF-8</span>
          <span className={styles.statusItem}>{activeFile?.language || "Plain Text"}</span>
          <span className={styles.statusItem}>
            <Bell size={12} />
          </span>
        </div>
      </div>

      {/* Clone Repository Modal */}
      {cloneModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setCloneModalOpen(false)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>Clone Repository</h2>
              <button onClick={() => setCloneModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCloneRepo} className={styles.settingsBody}>
              <div className={styles.settingGroup}>
                <label>Repository URL</label>
                <input
                  type="text"
                  autoFocus
                  placeholder="https://github.com/CollaborativeCodingExperience/C2X"
                  value={cloneUrl}
                  onChange={(e) => setCloneUrl(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.commitBtn}>
                Clone / Import
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Open Tunnel Modal */}
      {tunnelModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setTunnelModalOpen(false)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>Open Tunnel</h2>
              <button onClick={() => setTunnelModalOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.settingsBody}>
              <p style={{ fontSize: "0.85rem", color: "#b0b0b0", lineHeight: "1.5" }}>
                Remote Tunnels require the C2X CLI installed on your remote machine. Download the desktop app to connect to remote development tunnels securely.
              </p>
              <a href="/download" target="_blank" rel="noopener noreferrer" className={styles.commitBtn} style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
                Download C2X Desktop
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Go to Line Modal */}
      {gotoLineModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setGotoLineModalOpen(false)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>Go to Line/Column</h2>
              <button onClick={() => setGotoLineModalOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.settingsBody}>
              <div className={styles.settingGroup}>
                <label>Line number (1 - 1000)</label>
                <input
                  type="number"
                  autoFocus
                  min={1}
                  value={gotoLineNum}
                  onChange={(e) => setGotoLineNum(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGotoLine();
                  }}
                />
              </div>
              <button
                onClick={handleGotoLine}
                className={styles.commitBtn}
              >
                Go to Line
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {aboutModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setAboutModalOpen(false)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>About C2X Web IDE</h2>
              <button onClick={() => setAboutModalOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.settingsBody} style={{ gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className={styles.logoBadge} style={{ fontSize: "1rem", padding: "4px 8px" }}>C2X</span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", margin: 0, color: "#fff" }}>C2X Web IDE</h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#8b949e" }}>Version 2.4.1 (Production Release)</p>
                </div>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#ccc", lineHeight: "1.5" }}>
                Powered by Monaco Editor, React, TypeScript, and Vite. Designed for ultra-fast, modern developer workflows right inside your browser.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <a href="/docs" target="_blank" rel="noopener noreferrer" className={styles.commitBtn} style={{ textDecoration: "none", textAlign: "center" }}>
                  Documentation
                </a>
                <button onClick={() => setAboutModalOpen(false)} className={styles.commitBtn} style={{ background: "#30363d" }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className={styles.modalBackdrop} onClick={() => setCommandPaletteOpen(false)}>
          <div className={styles.commandPaletteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cpSearchWrap}>
              <Search size={16} />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                className={styles.cpInput}
              />
            </div>
            <div className={styles.cpList}>
              {filteredCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  className={styles.cpItem}
                  onClick={() => {
                    cmd.execute();
                    setCommandPaletteOpen(false);
                  }}
                >
                  <span>{cmd.title}</span>
                  {cmd.shortcut && <span className={styles.cpShortcut}>{cmd.shortcut}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Open Modal */}
      {quickOpenOpen && (
        <div className={styles.modalBackdrop} onClick={() => setQuickOpenOpen(false)}>
          <div className={styles.commandPaletteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cpSearchWrap}>
              <FileCode size={16} />
              <input
                type="text"
                autoFocus
                placeholder="Search files by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.cpInput}
              />
            </div>
            <div className={styles.cpList}>
              {files
                .filter((f) => f.path.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((f) => (
                  <div
                    key={f.path}
                    className={styles.cpItem}
                    onClick={() => {
                      openFile(f.path);
                      setQuickOpenOpen(false);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FileIcon fileName={f.name} size={14} />
                      <span>{f.path}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Replace Confirmation Modal */}
      {replaceModal && (
        <div className={styles.modalBackdrop} onClick={() => setReplaceModal(null)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>Confirm Replacement</h2>
              <button onClick={() => setReplaceModal(null)}><X size={18} /></button>
            </div>
            <div className={styles.settingsBody}>
              <p style={{ fontSize: "0.85rem", color: "#ccc", marginBottom: "16px" }}>
                Replace {replaceModal.matchCount} matches across {replaceModal.fileCount} files with "{replaceQuery}"?
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button onClick={() => setReplaceModal(null)} className={styles.commitBtn} style={{ background: "#30363d" }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    replaceAllMatches();
                    setReplaceModal(null);
                  }}
                  className={styles.commitBtn}
                >
                  Replace All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <div className={styles.modalBackdrop} onClick={() => setSettingsOpen(false)}>
          <div className={styles.settingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2>C2X Web IDE Settings</h2>
              <button onClick={() => setSettingsOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.settingsBody}>
              <div className={styles.settingGroup}>
                <label>Color Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
                  <option value="vs-dark">C2X Dark (Default)</option>
                  <option value="vs">C2X Light</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>
              <div className={styles.settingGroup}>
                <label>Editor Font Size</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  min={10}
                  max={24}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebIDE;
