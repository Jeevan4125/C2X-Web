import { motion } from "framer-motion";
import { useRef } from "react";
import styles from "./Timeline.module.scss";
import { fadeUp } from "@/animations/motion";
import type { TimelineItem } from "@/types/timeline";

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.timeline}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={index}
          className={styles.item}
        >
          <div className={styles.marker}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.line} />
          </div>
          <div className={styles.content}>
            <span className={styles.year}>{item.year}</span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
