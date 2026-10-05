import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./CodeSnippet.module.scss";
import { cn } from "@/utils/helpers";

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  expandable?: boolean;
  maxHeight?: number;
}

const CodeSnippet = ({
  code,
  language = "typescript",
  title,
  showLineNumbers = true,
  expandable = false,
  maxHeight = 300,
}: CodeSnippetProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const lines = code.split("\n");
  const displayLines = expanded ? lines : lines;

  return (
    <div className={styles.snippet}>
      {(title || language) && (
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          <div className={styles.actions}>
            <span className={styles.language}>{language}</span>
            <button
              onClick={handleCopy}
              className={styles.copyBtn}
              aria-label="Copy code"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Check size={14} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Copy size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(styles.body, !expanded && styles.collapsed)}
        style={{ maxHeight: expanded ? "none" : maxHeight }}
      >
        <pre className={styles.pre}>
          <code className={`language-${language}`}>
            {displayLines.map((line, index) => (
              <div key={index} className={styles.line}>
                {showLineNumbers && (
                  <span className={styles.lineNumber}>{index + 1}</span>
                )}
                <span className={styles.lineContent}>{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {expandable && lines.length > 10 && (
        <button
          className={styles.toggleBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show more ({lines.length - 10} lines)
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeSnippet;
