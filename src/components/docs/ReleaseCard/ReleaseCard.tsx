import { Sparkles, Wrench, Bug, AlertTriangle } from "lucide-react";
import styles from "./ReleaseCard.module.scss";

export interface ReleaseSection {
  features?: string[];
  improvements?: string[];
  fixes?: string[];
  breaking?: string[];
}

interface ReleaseCardProps {
  version: string;
  date: string;
  tag?: "latest" | "stable" | "legacy";
  summary: string;
  sections: ReleaseSection;
}

const GROUPS: { key: keyof ReleaseSection; label: string; icon: typeof Sparkles; cls: string }[] = [
  { key: "features", label: "Features", icon: Sparkles, cls: "features" },
  { key: "improvements", label: "Improvements", icon: Wrench, cls: "improvements" },
  { key: "fixes", label: "Bug Fixes", icon: Bug, cls: "fixes" },
  { key: "breaking", label: "Breaking Changes", icon: AlertTriangle, cls: "breaking" },
];

/** Changelog card for a single release version, grouped by change type. */
const ReleaseCard = ({ version, date, tag, summary, sections }: ReleaseCardProps): React.ReactElement => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.versionRow}>
          <h3 className={styles.version}>{version}</h3>
          {tag && <span className={`${styles.tag} ${styles[tag]}`}>{tag}</span>}
        </div>
        <span className={styles.date}>{date}</span>
      </div>
      <p className={styles.summary}>{summary}</p>

      <div className={styles.groups}>
        {GROUPS.map(({ key, label, icon: Icon, cls }) => {
          const list = sections[key];
          if (!list || list.length === 0) return null;
          return (
            <div key={key} className={styles.group}>
              <div className={`${styles.groupHeader} ${styles[cls]}`}>
                <Icon size={14} strokeWidth={2} />
                <span>{label}</span>
              </div>
              <ul className={styles.items}>
                {list.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReleaseCard;
