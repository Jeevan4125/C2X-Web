import { useEffect, useState, RefObject } from "react";
import { motion } from "framer-motion";
import styles from "./ReadingProgress.module.scss";

interface ReadingProgressProps {
  target: RefObject<HTMLElement | null>;
}

const ReadingProgress = ({
  target,
}: ReadingProgressProps): React.ReactElement => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!target.current) return;

      const el = target.current;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const elementTop = rect.top + scrollTop;

      const scrollable = totalHeight - viewportHeight;
      const scrolled = scrollTop - elementTop;

      if (scrollable > 0) {
        const value = Math.min(Math.max((scrolled / scrollable) * 100, 0), 100);
        setProgress(value);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [target]);

  return (
    <div className={styles.progressBar}>
      <motion.div
        className={styles.progressFill}
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default ReadingProgress;
