import { X } from "lucide-react";
import styles from "./Editor.module.scss";
import { cn } from "@/utils/helpers";
import type { EditorTab } from "@/types";

interface EditorTabsProps {
  tabs: EditorTab[];
  activeId: string;
  onSelect: (id: string) => void;
}

const LANGUAGE_COLOR: Record<string, string> = {
  typescriptreact: "#4ec9b0",
  typescript: "#4ec9b0",
  javascript: "#dcd979",
};

/**
 * Renders the horizontal file tab strip above the code area,
 * mirroring VS Code's editor tab bar.
 */
const EditorTabs = ({ tabs, activeId, onSelect }: EditorTabsProps): React.ReactElement => {
  return (
    <div className={styles.tabRow} role="tablist" aria-label="Open editor files">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeId}
          onClick={() => onSelect(tab.id)}
          className={cn(styles.tab, tab.id === activeId && styles.active)}
        >
          <span
            className={styles.tabDot}
            style={{ color: LANGUAGE_COLOR[tab.language] ?? "#a1a1aa" }}
          />
          {tab.fileName}
          <X size={12} className="opacity-0 hover:opacity-60" />
        </button>
      ))}
    </div>
  );
};

export default EditorTabs;
