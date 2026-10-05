import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import styles from "./QuoteBlock.module.scss";
import { fadeUp } from "@/animations/motion";

interface QuoteBlockProps {
  quote: string;
  author?: string;
  source?: string;
  className?: string;
}

const QuoteBlock = ({
  quote,
  author,
  source,
  className,
}: QuoteBlockProps): React.ReactElement => {
  return (
    <motion.blockquote
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={`${styles.quote} ${className || ""}`}
    >
      <Quote size={24} className={styles.icon} />
      <p className={styles.text}>{quote}</p>
      {(author || source) && (
        <footer className={styles.footer}>
          {author && <span className={styles.author}>{author}</span>}
          {source && <span className={styles.source}>{source}</span>}
        </footer>
      )}
    </motion.blockquote>
  );
};

export default QuoteBlock;
