import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./StatisticCard.module.scss";
import { fadeUp } from "@/animations/motion";
import type { Statistic } from "@/types/statistic";

interface StatisticCardProps {
  stat: Statistic;
  index: number;
}

const StatisticCard = ({
  stat,
  index,
}: StatisticCardProps): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      const stepDuration = duration / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.round(current * 10) / 10);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.icon}>{stat.icon}</div>
      <div className={styles.value}>
        <span>{stat.prefix}</span>
        {count.toFixed(stat.decimals || 0)}
        <span>{stat.suffix}</span>
      </div>
      <p className={styles.label}>{stat.label}</p>
    </motion.div>
  );
};

export default StatisticCard;
