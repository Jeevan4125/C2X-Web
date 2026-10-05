import { motion } from "framer-motion";
import { Download } from "lucide-react";
import styles from "./PlatformCard.module.scss";
import { fadeUp } from "@/animations/motion";
import type { Platform } from "@/types";

interface PlatformCardProps {
  platform: Platform;
  index: number;
}

const PlatformCard = ({
  platform,
  index,
}: PlatformCardProps): React.ReactElement => {
  const Icon = platform.icon;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className={styles.iconWrapper}>
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <h3 className={styles.name}>{platform.name}</h3>
      <p className={styles.tagline}>{platform.tagline}</p>

      <div className={styles.downloads}>
        {platform.downloads.map((download) => (
          <a
            key={download.id}
            href={download.href}
            download={download.href !== "#" ? true : undefined}
            className={styles.downloadItem}
          >
            <div className={styles.downloadInfo}>
              <span className={styles.downloadLabel}>{download.label}</span>
              <span className={styles.downloadFormat}>{download.format}</span>
            </div>
            <div className={styles.downloadRight}>
              <span className={styles.downloadSize}>{download.size}</span>
              <Download
                size={16}
                strokeWidth={2}
                className={styles.downloadIcon}
              />
            </div>
          </a>
        ))}
      </div>

      {platform.recommended && (
        <p className={styles.recommended}>{platform.recommended}</p>
      )}
    </motion.div>
  );
};

export default PlatformCard;
