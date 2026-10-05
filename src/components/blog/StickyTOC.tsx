import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import styles from "./StickyTOC.module.scss";
import { cn } from "@/utils/helpers";

interface TocEntry {
  id: string;
  label: string;
  depth?: 2 | 3;
}

interface StickyTOCProps {
  entries: TocEntry[];
}

const StickyTOC = ({ entries }: StickyTOCProps): React.ReactElement => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingEls = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  if (entries.length === 0) return <></>;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <div className={styles.header}>
        <List size={14} strokeWidth={2} />
        <span>On this page</span>
      </div>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id} className={cn(entry.depth === 3 && styles.nested)}>
            <a
              href={`#${entry.id}`}
              onClick={handleClick(entry.id)}
              className={cn(
                styles.link,
                activeId === entry.id && styles.active,
              )}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StickyTOC;
