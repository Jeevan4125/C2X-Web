import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import styles from "./LanguageSupport.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";

const LanguageSupport = (): React.ReactElement => {
  const languages = [
    { name: "TypeScript", color: "#3178c6" },
    { name: "JavaScript", color: "#f7df1e" },
    { name: "Python", color: "#3776ab" },
    { name: "Java", color: "#007396" },
    { name: "C++", color: "#00599c" },
  ];

  return (
    <section className={styles.languageSupport}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.header}
        >
          <motion.div variants={fadeUp} className={styles.badge}>
            <Code2 size={14} strokeWidth={2.5} />
            <span>LANGUAGE SUPPORT</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className={styles.title}>
            Native tooling for <br />
            <span className={styles.gradient}>every stack</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={styles.description}>
            First-class syntax highlighting, IntelliSense, and debugging across
            the languages your team actually uses.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.grid}
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              variants={fadeUp}
              custom={index}
              className={styles.card}
            >
              <span
                className={styles.dot}
                style={{ backgroundColor: lang.color }}
              />
              <span className={styles.name}>{lang.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageSupport;
