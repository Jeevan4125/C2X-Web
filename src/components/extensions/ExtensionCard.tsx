import { motion } from "framer-motion";
import { Star, Download, Check } from "lucide-react";
import styles from "./ExtensionCard.module.scss";
import { cn } from "@/utils/helpers";
import type { Extension } from "@/types";

interface ExtensionCardProps {
  extension: Extension;
  index: number;
}

const ExtensionCard = ({
  extension,
  index,
}: ExtensionCardProps): React.ReactElement => {
  const {
    icon: Icon,
    iconColor,
    name,
    publisher,
    description,
    downloads,
    rating,
    category,
    verified,
  } = extension;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper} style={{ color: iconColor }}>
          <Icon size={24} strokeWidth={1.75} />
        </div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{name}</h3>
            {verified && (
              <span className={styles.verifiedBadge}>
                <Check size={12} strokeWidth={2.5} />
              </span>
            )}
          </div>
          <span className={styles.publisher}>{publisher}</span>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <div className={styles.stats}>
            <span className={styles.rating}>
              <Star size={14} strokeWidth={1.5} />
              {rating.toFixed(1)}
            </span>
            <span className={styles.downloads}>
              <Download size={14} strokeWidth={1.5} />
              {downloads}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtensionCard;
