import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./DocsSidebar.module.scss";
import { cn } from "@/utils/helpers";
import { DOCS_NAV } from "@/data/docsNav";
import VersionSelector from "@/components/docs/VersionSelector";

interface DocsSidebarProps {
  onNavigate?: () => void;
}

const DocsSidebar = ({ onNavigate }: DocsSidebarProps): React.ReactElement => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <VersionSelector />
      </div>

      <nav className={styles.nav} aria-label="Documentation">
        {DOCS_NAV.map((section) => {
          const isCollapsed = collapsed[section.id] ?? false;
          return (
            <div key={section.id} className={styles.section}>
              <button
                type="button"
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
                aria-expanded={!isCollapsed}
              >
                <span>{section.label}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={cn(
                    styles.chevron,
                    isCollapsed && styles.collapsed,
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.ul
                    className={styles.itemList}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;

                      if (!item.available) {
                        return (
                          <li key={item.path}>
                            <span className={cn(styles.item, styles.disabled)}>
                              <Icon size={15} strokeWidth={1.9} />
                              <span>{item.label}</span>
                              <span className={styles.soonTag}>Soon</span>
                            </span>
                          </li>
                        );
                      }

                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={onNavigate}
                            className={cn(
                              styles.item,
                              isActive && styles.active,
                            )}
                          >
                            <Icon size={15} strokeWidth={1.9} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default DocsSidebar;
