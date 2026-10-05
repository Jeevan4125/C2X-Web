import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./Features.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { FEATURES } from "@/data/featureData";

const Features = memo((): React.ReactElement => {
  const displayFeatures = FEATURES.slice(0, 6);

  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className={styles.header}
        >
          <motion.h2 variants={fadeUp} className={styles.title}>
            Powerful Features for <br />
            <span className={styles.gradient}>Modern Development</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={styles.description}>
            Everything you need to build, debug, and deploy your applications in
            one place.
          </motion.p>
        </motion.div>

        <div className={styles.grid}>
          {displayFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                to={`/features/${feature.slug}`}
                className={styles.cardLink}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={index}
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className={styles.category}>{feature.category}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{feature.name}</h3>
                  <p className={styles.cardDescription}>
                    {feature.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.viewDetails}>
                      View Details
                      <ArrowRight size={16} className={styles.arrow} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

Features.displayName = "Features";

export default Features;
