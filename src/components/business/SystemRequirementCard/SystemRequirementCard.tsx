import { motion } from "framer-motion";
import styles from "./SystemRequirementCard.module.scss";
import { fadeUp, viewportOnce } from "@/animations/motion";
import type { SystemRequirement } from "@/types";

interface SystemRequirementCardProps {
  requirement: SystemRequirement;
  index?: number;
}

/**
 * Per-platform minimum vs. recommended spec breakdown used inside
 * the Download page's System Requirements section.
 */
const SystemRequirementCard = ({
  requirement,
  index = 0,
}: SystemRequirementCardProps): React.ReactElement => {
  const Icon = requirement.icon;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.header}>
        <Icon size={18} strokeWidth={1.75} className={styles.icon} />
        <h3 className={styles.platformName}>{requirement.platformName}</h3>
      </div>

      <div className={styles.specList}>
        <div className={styles.specHeaderRow}>
          <span></span>
          <span className={styles.colLabel}>Minimum</span>
          <span className={styles.colLabel}>Recommended</span>
        </div>
        {requirement.specs.map((spec) => (
          <div key={spec.label} className={styles.specRow}>
            <span className={styles.specLabel}>{spec.label}</span>
            <span className={styles.specValue}>{spec.minimum}</span>
            <span className={`${styles.specValue} ${styles.recommended}`}>
              {spec.recommended}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SystemRequirementCard;
