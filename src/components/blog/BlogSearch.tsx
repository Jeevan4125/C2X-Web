import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BlogSearch.module.scss";
import { cn } from "@/utils/helpers";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const BlogSearch = ({
  value,
  onChange,
  placeholder = "Search articles...",
  className,
}: BlogSearchProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={cn(styles.search, isFocused && styles.focused, className)}>
      <Search size={18} className={styles.icon} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Search blog posts"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className={styles.clear}
            aria-label="Clear search"
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>
      <kbd className={styles.kbd}>⌘K</kbd>
    </div>
  );
};

export default BlogSearch;
