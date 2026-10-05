import { motion } from "framer-motion";
import styles from "./SectionTitle.module.scss";
import { cn } from "@/utils/helpers";
import { fadeUp, viewportOnce } from "@/animations/motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Standardized section heading block: eyebrow label, title, and
 * optional supporting description. Used at the top of every homepage
 * section for visual consistency.
 */
const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps): React.ReactElement => {
  return (
    <div className={cn(styles.wrapper, align === "center" && styles.center, className)}>
      {eyebrow && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className={cn(styles.eyebrow, "text-eyebrow")}
        >
          <span className={styles.dot} />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        custom={1}
        className={cn(styles.title, "text-h2")}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          custom={2}
          className={cn(styles.description, "text-body-lg")}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
