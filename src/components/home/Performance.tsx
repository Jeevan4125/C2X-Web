import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MemoryStick, Languages, Package } from "lucide-react";
import styles from "./Performance.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { PERFORMANCE_STATS } from "@/data/performanceStats";

const Performance = memo((): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const getIcon = (id: string) => {
    switch (id) {
      case "startup":
        return Zap;
      case "memory":
        return MemoryStick;
      case "languages":
        return Languages;
      case "extensions":
        return Package;
      default:
        return Zap;
    }
  };

  return (
    <section className={styles.performance} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className={styles.header}
        >
          <motion.h2 variants={fadeUp} className={styles.title}>
            Blazing fast, <br />
            <span className={styles.gradient}>always responsive</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={styles.description}>
            C2X is designed for a responsive development workflow. Launch quickly, handle large
            codebases, and stay responsive during pair sessions.
          </motion.p>
        </motion.div>

        <div className={styles.grid}>
          {PERFORMANCE_STATS.map((stat, index) => {
            const Icon = getIcon(stat.id);
            return (
              <motion.div
                key={stat.id}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={index}
                className={styles.card}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.value}>
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className={styles.label}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Performance.displayName = "Performance";

export default Performance;
