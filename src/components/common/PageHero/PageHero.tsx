import type { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./PageHero.module.scss";
import Container from "@/components/common/Container";
import { fadeUp, viewportOnce } from "@/animations/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * Shared hero shell for Phase 2A interior pages: eyebrow, headline,
 * supporting copy, and an optional slot for a hero visual/demo below.
 */
const PageHero = ({ eyebrow, title, description, children }: PageHeroProps): React.ReactElement => {
  return (
    <section className={styles.hero}>
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={styles.copy}
        >
          <span className="text-eyebrow">{eyebrow}</span>
          <h1 className={`text-h1 ${styles.title}`}>{title}</h1>
          <p className={`text-body-lg ${styles.description}`}>{description}</p>
        </motion.div>

        {children && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            viewport={viewportOnce}
            className={styles.demoSlot}
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default PageHero;
