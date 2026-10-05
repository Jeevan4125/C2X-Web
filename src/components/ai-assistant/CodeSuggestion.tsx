import { motion } from "framer-motion";
import { Check, Columns, PlusSquare } from "lucide-react";
import styles from "./CodeSuggestion.module.scss";

interface CodeSuggestionProps {
  code: string;
  onApplied?: () => void;
}

/**
 * Renders an AI-proposed code block with Apply / Insert / Compare
 * actions, matching the response actions of a real AI coding
 * assistant panel.
 */
const CodeSuggestion = ({
  code,
  onApplied,
}: CodeSuggestionProps): React.ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={styles.wrap}
    >
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
      <div className={styles.actions}>
        <button className={styles.applyBtn} onClick={onApplied}>
          <Check size={13} /> Apply
        </button>
        <button className={styles.actionBtn}>
          <PlusSquare size={13} /> Insert
        </button>
        <button className={styles.actionBtn}>
          <Columns size={13} /> Compare
        </button>
      </div>
    </motion.div>
  );
};

export default CodeSuggestion;
