import { motion } from "framer-motion";
import { Bot, Zap, Sparkles } from "lucide-react";
import styles from "./AIShowcase.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { AIChat } from "@/components/ai-assistant";

const AIShowcase = (): React.ReactElement => {
  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={styles.header}
        >
          <motion.div variants={fadeUp} className={styles.badge}>
            <Zap size={14} strokeWidth={2.5} />
            <span>AI-Powered Development</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className={styles.title}>
            Code with an AI pair programmer
            <br />
            <span className={styles.gradient}>right inside your editor</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={styles.description}>
            Ask questions, request refactors, and get explanations without
            leaving your editor. C2X's AI assistant understands your
            codebase structure and coding conventions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className={styles.chatWrapper}
        >
          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <Bot size={18} strokeWidth={2} />
                <span>C2X</span>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>
                  Connected to workspace
                </span>
              </div>
            </div>
            <AIChat />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcase;
