import { motion } from "framer-motion";
import styles from "./CultureCard.module.scss";
import { fadeUp } from "@/animations/motion";

interface CultureCardProps {
  icon: string;
  title: string;
  description: string;
}

const CultureCard = ({
  icon,
  title,
  description,
}: CultureCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={styles.card}
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default CultureCard;
