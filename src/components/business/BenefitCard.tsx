import { motion } from "framer-motion";
import styles from "./BenefitCard.module.scss";
import { fadeUp } from "@/animations/motion";

interface BenefitCardProps {
  benefit: {
    icon: string;
    title: string;
    description: string;
  };
  index: number;
}

const BenefitCard = ({
  benefit,
  index,
}: BenefitCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.icon}>{benefit.icon}</div>
      <h3 className={styles.title}>{benefit.title}</h3>
      <p className={styles.description}>{benefit.description}</p>
    </motion.div>
  );
};

export default BenefitCard;
