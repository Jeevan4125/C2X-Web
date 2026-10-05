import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Button from "@/components/common/Button/Button";
import HeroEditorMockup from "./HeroEditorMockup";
import { GITHUB_REPO_URL } from "@/constants";

const Hero = (): React.ReactElement => {
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
            <Sparkles size={14} strokeWidth={2.5} />
            <span>Now with GPT-powered pair programming</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className={styles.heading}>
            The Next Generation
            <br />
            <span className={styles.gradient}>
              AI-Powered Collaborative IDE
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className={styles.description}>
            Code, collaborate, debug and ship software faster with intelligent
            AI assistance and real-time teamwork.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              to="/download"
            >
              Download C2X
            </Button>
            <Button variant="secondary" size="lg" href={GITHUB_REPO_URL}>
              View on GitHub
            </Button>
            <Button variant="secondary" size="lg" to="/docs">
              Read Documentation
            </Button>
          </motion.div>

          {/* Built-in Editor Screenshot Mockup */}
          <HeroEditorMockup />
        </motion.div>
      </div>
      <div className={styles.grid} />
    </section>
  );
};

export default Hero;
