import { motion } from "framer-motion";
import styles from "./Editor.module.scss";

interface TerminalLog {
  id: string;
  text: string;
  color?: string;
}

const LOGS: TerminalLog[] = [
  { id: "t1", text: "npm run dev" },
  { id: "t2", text: "VITE v5.4.10  ready in 312 ms", color: "#4ec9b0" },
  { id: "t3", text: "➜  Local:   http://localhost:5173/", color: "#9cdcfe" },
  { id: "t4", text: "✓ AI sync connected — 3 collaborators online", color: "#569cd6" },
];

/**
 * Bottom terminal panel with staggered command-log reveal to
 * simulate a live dev server session.
 */
const Terminal = (): React.ReactElement => {
  return (
    <div className={styles.terminalBody} aria-label="Integrated terminal output">
      {LOGS.map((log, i) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.35, duration: 0.4 }}
          className={styles.terminalLine}
        >
          {i === 0 && <span className={styles.terminalPrompt}>➜</span>}
          <span style={{ color: log.color }}>{log.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default Terminal;
