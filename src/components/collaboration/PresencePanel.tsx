import styles from "./Collaboration.module.scss";
import type { Collaborator } from "@/types";

interface PresencePanelProps {
  collaborators: Collaborator[];
}

/**
 * Sidebar listing everyone currently active in the workspace, with
 * their color, current file, and cursor line — mirrors a real
 * presence panel in a collaborative editor.
 */
const PresencePanel = ({ collaborators }: PresencePanelProps): React.ReactElement => {
  return (
    <div className={styles.presencePanel} aria-label="Active collaborators">
      <p className={styles.presenceHeader}>
        <span className={styles.liveDot} /> {collaborators.length} online
      </p>
      <ul className={styles.presenceList}>
        {collaborators.map((c) => (
          <li key={c.id} className={styles.presenceItem}>
            <span className={styles.presenceAvatar} style={{ backgroundColor: c.color }}>
              {c.initials}
            </span>
            <div className={styles.presenceMeta}>
              <span className={styles.presenceName}>{c.name}</span>
              <span className={styles.presenceLocation}>
                {c.file}:{c.line}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresencePanel;
