import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./HiringStep.module.scss";
import { fadeUp } from "@/animations/motion";

interface HiringStepProps {
  step: {
    step: number;
    title: string;
    description: string;
  };
  index: number;
}

const HiringStep = ({ step, index }: HiringStepProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.step}
    >
      <div className={styles.number}>
        <span>{step.step}</span>
        <Check size={16} className={styles.check} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.description}>{step.description}</p>
      </div>
    </motion.div>
  );
};

export default HiringStep;
