import styles from "./CodeBlock.module.scss";
import CopyButton from "@/components/docs/CopyButton";
import { cn } from "@/utils/helpers";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

const KEYWORDS = [
  "const", "let", "var", "function", "return", "import", "export", "from",
  "default", "if", "else", "async", "await", "new", "class", "extends",
  "interface", "type", "npm", "cd", "sudo", "brew", "winget", "sh",
];

/**
 * Tokenizes a single line of code using a small regex pass so common
 * keywords, strings, and comments pick up the shared syntax palette.
 * Not a real parser — good enough for short documentation snippets.
 */
const tokenizeLine = (line: string): React.ReactNode => {
  const pattern = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(#.*$)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const pushPlain = (text: string) => {
    const words = text.split(/(\s+|[(){}\[\];,.<>])/);
    words.forEach((word) => {
      if (!word) return;
      if (KEYWORDS.includes(word)) {
        parts.push(
          <span key={key++} className={styles.keyword}>
            {word}
          </span>
        );
      } else {
        parts.push(<span key={key++}>{word}</span>);
      }
    });
  };

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      pushPlain(line.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(
        <span key={key++} className={styles.comment}>
          {match[1]}
        </span>
      );
    } else if (match[2]) {
      parts.push(
        <span key={key++} className={styles.string}>
          {match[2]}
        </span>
      );
    } else if (match[3]) {
      parts.push(
        <span key={key++} className={styles.comment}>
          {match[3]}
        </span>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < line.length) {
    pushPlain(line.slice(lastIndex));
  }
  return parts;
};

/**
 * Documentation code block: filename/language header, copy button,
 * and lightweight syntax-colored lines matching the site's editor palette.
 */
const CodeBlock = ({ code, language = "bash", filename, className }: CodeBlockProps): React.ReactElement => {
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div className={cn(styles.block, className)}>
      <div className={styles.header}>
        <div className={styles.meta}>
          {filename && <span className={styles.filename}>{filename}</span>}
          <span className={styles.language}>{language}</span>
        </div>
        <CopyButton value={code} />
      </div>
      <pre className={styles.pre}>
        <code>
          {lines.map((line, i) => (
            <div key={i} className={styles.line}>
              <span className={styles.lineNumber}>{i + 1}</span>
              <span className={styles.lineContent}>{tokenizeLine(line) || "\u00A0"}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
