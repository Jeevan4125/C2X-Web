import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./VersionCard.module.scss";
import { cn } from "@/utils/helpers";
import { fadeUp, viewportOnce } from "@/animations/motion";
import type { VersionEntry } from "@/types";

interface VersionCardProps {
  entry: VersionEntry;
  index?: number;
}

const CHANNEL_LABEL: Record<VersionEntry["channel"], string> = {
  stable: "Stable",
  insiders: "Insiders",
  nightly: "Nightly",
};

/**
 * Single row in the Version History / Release Notes Preview timeline
 * on the Download page.
 */
const VersionCard = ({ entry, index = 0 }: VersionCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      custom={index}
      className={styles.row}
    >
      <div className={styles.marker}>
        <span className={cn(styles.dot, entry.isLatest && styles.dotLatest)} />
        {index !== undefined && <span className={styles.line} />}
      </div>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.version}>v{entry.version}</span>
          <span className={cn(styles.channelBadge, styles[entry.channel])}>
            {CHANNEL_LABEL[entry.channel]}
          </span>
          {entry.isLatest && <span className={styles.latestBadge}>Latest</span>}
          <span className={styles.date}>{entry.date}</span>
        </div>

        <ul className={styles.highlights}>
          {entry.highlights.map((h) => (
            <li key={h}>
              <Check size={14} strokeWidth={2.25} className={styles.checkIcon} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default VersionCard;
