import { GitBranch, Wifi, Bell, CheckCircle2 } from "lucide-react";
import styles from "./Editor.module.scss";
import { cn } from "@/utils/helpers";

interface StatusBarProps {
  branch?: string;
  language?: string;
  line?: number;
  column?: number;
}

/**
 * Bottom-most status bar replicating VS Code's blue status strip:
 * git branch, diagnostics, language mode, cursor position.
 */
const StatusBar = ({
  branch = "main",
  language = "TypeScript React",
  line = 24,
  column = 12,
}: StatusBarProps): React.ReactElement => {
  return (
    <div className={styles.statusBar} role="status" aria-label="Editor status bar">
      <div className={styles.statusLeft}>
        <span className={styles.statusItem}>
          <GitBranch size={12} />
          {branch}
        </span>
        <span className={cn(styles.statusItem, styles.hideMobile)}>
          <CheckCircle2 size={12} />
          0 Problems
        </span>
        <span className={styles.statusItem}>
          <Wifi size={12} />
          Synced
        </span>
      </div>
      <div className={styles.statusRight}>
        <span className={styles.statusItem}>
          Ln {line}, Col {column}
        </span>
        <span className={cn(styles.statusItem, styles.hideMobile)}>UTF-8</span>
        <span className={styles.statusItem}>{language}</span>
        <span className={cn(styles.statusItem, styles.hideMobile)}>
          <Bell size={12} />
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
