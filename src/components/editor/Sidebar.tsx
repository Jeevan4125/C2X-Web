import { ChevronDown, FileCode2, FolderOpen } from "lucide-react";
import styles from "./Editor.module.scss";
import { cn } from "@/utils/helpers";

interface SidebarProps {
  selectedFile: string;
}

const FILES = [
  { name: "App.tsx" },
  { name: "server.ts" },
  { name: "main.tsx" },
  { name: "types.ts" },
  { name: "vite.config.ts" },
];

/**
 * Explorer panel replicating VS Code's file tree sidebar, scoped to
 * the demo project shown in the hero editor showcase.
 */
const Sidebar = ({ selectedFile }: SidebarProps): React.ReactElement => {
  return (
    <aside className={styles.sidebar} aria-label="File explorer">
      <p className={styles.sidebarHeader}>Explorer</p>
      <div className={styles.fileTree}>
        <div className={styles.fileItem}>
          <ChevronDown size={13} />
          <FolderOpen size={13} />
          c2x-demo
        </div>
        {FILES.map((file) => (
          <div
            key={file.name}
            className={cn(
              styles.fileItem,
              styles.nested,
              file.name === selectedFile && styles.selected
            )}
          >
            <FileCode2 size={13} />
            {file.name}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
