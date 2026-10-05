import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import styles from "./TestimonialCard.module.scss";
import { fadeUp } from "@/animations/motion";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string;
  };
  index: number;
}

const TestimonialCard = ({
  testimonial,
  index,
}: TestimonialCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <Quote size={24} className={styles.quoteIcon} />
      <p className={styles.content}>"{testimonial.content}"</p>
      <div className={styles.footer}>
        <div className={styles.avatar}>
          <img src={testimonial.avatar} alt={testimonial.name} />
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{testimonial.name}</span>
          <span className={styles.role}>{testimonial.role}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
