import { motion } from "framer-motion";
import { Sparkles, BookOpen, Users, TrendingUp, Code2, Cpu } from "lucide-react";
import styles from "./BlogHero.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";

const BlogHero = (): React.ReactElement => {
  const topics = [
    { icon: BookOpen, label: "Technical Guides" },
    { icon: Cpu, label: "AI Workflows" },
    { icon: Users, label: "Collaboration" },
    { icon: Sparkles, label: "Release Notes" },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={styles.content}
        >
          <motion.div variants={fadeUp} className={styles.badge}>
            <Sparkles size={14} />
            <span>C2X Blog</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className={styles.title}>
            Insights for <br />
            <span className={styles.gradient}>Modern Developers</span>
          </motion.h1>

          <motion.p variants={fadeUp} className={styles.description}>
            Engineering guides, tutorials, and product updates from the C2X team to help you build better software.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.stats}>
            {topics.map(({ icon: Icon, label }) => (
              <div key={label} className={styles.stat}>
                <Icon size={18} />
                <div>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
