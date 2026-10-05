import { motion } from "framer-motion";
import styles from "./TechnologyCard.module.scss";
import { fadeUp } from "@/animations/motion";

interface TechnologyCardProps {
  tech: {
    name: string;
    icon: string;
    category: string;
  };
  index: number;
}

const TechnologyCard = ({
  tech,
  index,
}: TechnologyCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.icon}>{tech.icon}</div>
      <div className={styles.info}>
        <h4 className={styles.name}>{tech.name}</h4>
        <span className={styles.category}>{tech.category}</span>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
