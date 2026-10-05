import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, CornerDownLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./DocsSearch.module.scss";
import { searchDocs, type DocSearchEntry } from "@/data/docsSearchIndex";

interface DocsSearchProps {
  className?: string;
}

const DocsSearch = ({ className }: DocsSearchProps): React.ReactElement => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results: DocSearchEntry[] = query ? searchDocs(query) : [];
  const isOpen = focused && query.length > 0;

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const isTypingTarget =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA");

      if (
        (e.key === "/" && !isTypingTarget) ||
        ((e.metaKey || e.ctrlKey) && e.key === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const goTo = (path: string) => {
    navigate(path);
    setQuery("");
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[activeIndex].path);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.wrapper} ${className || ""}`} ref={wrapperRef}>
      <div className={styles.inputRow}>
        <Search size={15} strokeWidth={2} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search documentation..."
          className={styles.input}
          onFocus={() => setFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search documentation"
        />
        {query ? (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={14} strokeWidth={2} />
          </button>
        ) : (
          <kbd className={styles.kbd}>⌘K</kbd>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.results}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {results.length === 0 ? (
              <div className={styles.empty}>
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className={styles.resultList}>
                {results.map((entry, i) => (
                  <li key={entry.path}>
                    <button
                      type="button"
                      className={
                        i === activeIndex
                          ? `${styles.result} ${styles.activeResult}`
                          : styles.result
                      }
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => goTo(entry.path)}
                    >
                      <FileText
                        size={15}
                        strokeWidth={1.9}
                        className={styles.resultIcon}
                      />
                      <span className={styles.resultBody}>
                        <span className={styles.resultTitle}>
                          {entry.title}
                        </span>
                        <span className={styles.resultExcerpt}>
                          {entry.excerpt}
                        </span>
                      </span>
                      <span className={styles.resultSection}>
                        {entry.section}
                      </span>
                      {i === activeIndex && (
                        <CornerDownLeft size={13} strokeWidth={2} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocsSearch;
