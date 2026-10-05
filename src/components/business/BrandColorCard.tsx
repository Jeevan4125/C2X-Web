import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import styles from "./BrandColorCard.module.scss";
import { fadeUp } from "@/animations/motion";

interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
}

interface BrandColorCardProps {
  color: BrandColor;
  index: number;
  onCopy: () => void;
  copied: boolean;
}

const BrandColorCard = ({
  color,
  index,
  onCopy,
  copied,
}: BrandColorCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.swatch} style={{ backgroundColor: color.hex }} />
      <div className={styles.info}>
        <span className={styles.name}>{color.name}</span>
        <div className={styles.values}>
          <code className={styles.hex}>{color.hex}</code>
          <code className={styles.rgb}>RGB({color.rgb})</code>
        </div>
      </div>
      <button
        className={styles.copyBtn}
        onClick={onCopy}
        aria-label="Copy color"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </motion.div>
  );
};

export default BrandColorCard;
