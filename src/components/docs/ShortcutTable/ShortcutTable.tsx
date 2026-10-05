import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import styles from "./ShortcutTable.module.scss";
import { cn } from "@/utils/helpers";

export interface Shortcut {
  action: string;
  windows: string;
  macos: string;
  linux: string;
}

export interface ShortcutGroup {
  category: string;
  shortcuts: Shortcut[];
}

interface ShortcutTableProps {
  groups: ShortcutGroup[];
}

type OS = "windows" | "macos" | "linux";

const OS_TABS: { id: OS; label: string }[] = [
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
  { id: "linux", label: "Linux" },
];

const renderKeys = (combo: string): React.ReactElement => (
  <span className={styles.keys}>
    {combo.split("+").map((key, i, arr) => (
      <span key={i} className={styles.keyGroup}>
        <kbd className={styles.kbd}>{key.trim()}</kbd>
        {i < arr.length - 1 && <span className={styles.plus}>+</span>}
      </span>
    ))}
  </span>
);

/** Searchable, per-OS keyboard shortcut reference table grouped by category. */
const ShortcutTable = ({ groups }: ShortcutTableProps): React.ReactElement => {
  const [query, setQuery] = useState("");
  const [os, setOs] = useState<OS>("windows");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        shortcuts: group.shortcuts.filter(
          (s) =>
            s.action.toLowerCase().includes(q) ||
            s[os].toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.shortcuts.length > 0);
  }, [groups, query, os]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={14} strokeWidth={2} />
          <input
            type="text"
            placeholder="Filter shortcuts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter keyboard shortcuts"
          />
        </div>
        <div className={styles.osTabs} role="tablist">
          {OS_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={os === tab.id}
              className={cn(styles.osTab, os === tab.id && styles.activeOsTab)}
              onClick={() => setOs(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No shortcuts match &ldquo;{query}&rdquo;.</p>
      ) : (
        filtered.map((group) => (
          <div key={group.category} className={styles.group}>
            <h3 className={styles.category}>{group.category}</h3>
            <div className={styles.table}>
              {group.shortcuts.map((s) => (
                <div key={s.action} className={styles.row}>
                  <span className={styles.action}>{s.action}</span>
                  {renderKeys(s[os])}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShortcutTable;
