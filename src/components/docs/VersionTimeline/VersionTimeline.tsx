import { motion } from "framer-motion";
import styles from "./VersionTimeline.module.scss";
import ReleaseCard, { type ReleaseSection } from "@/components/docs/ReleaseCard";
import { fadeUp, viewportOnce } from "@/animations/motion";

export interface ReleaseEntry {
  version: string;
  date: string;
  tag?: "latest" | "stable" | "legacy";
  summary: string;
  sections: ReleaseSection;
}

interface VersionTimelineProps {
  releases: ReleaseEntry[];
}

/** Vertical changelog timeline: a connecting rail with a dot + ReleaseCard per version. */
const VersionTimeline = ({ releases }: VersionTimelineProps): React.ReactElement => {
  return (
    <div className={styles.timeline}>
      {releases.map((release, i) => (
        <motion.div
          key={release.version}
          className={styles.row}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className={styles.rail}>
            <span className={styles.dot} />
            {i < releases.length - 1 && <span className={styles.line} />}
          </div>
          <div className={styles.content}>
            <ReleaseCard {...release} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VersionTimeline;
