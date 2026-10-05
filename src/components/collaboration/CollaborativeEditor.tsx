import { motion } from "framer-motion";
import styles from "./Collaboration.module.scss";
import type { Collaborator } from "@/types";

interface Token {
  text: string;
  color: string;
}

const CODE_LINES: Token[][] = [
  [{ text: "export function ", color: "#569cd6" }, { text: "usePresence", color: "#dcdcaa" }, { text: "(roomId: string) {", color: "#d4d4d4" }],
  [{ text: "  const ", color: "#569cd6" }, { text: "[peers, setPeers]", color: "#9cdcfe" }, { text: " = ", color: "#d4d4d4" }, { text: "useState", color: "#dcdcaa" }, { text: "([]);", color: "#d4d4d4" }],
  [{ text: "", color: "#d4d4d4" }],
  [{ text: "  useEffect(() => {", color: "#d4d4d4" }],
  [{ text: "    const socket = ", color: "#d4d4d4" }, { text: "connect", color: "#dcdcaa" }, { text: "(roomId);", color: "#d4d4d4" }],
  [{ text: "    socket.", color: "#d4d4d4" }, { text: "on", color: "#dcdcaa" }, { text: "(", color: "#d4d4d4" }, { text: '"presence"', color: "#ce9178" }, { text: ", setPeers);", color: "#d4d4d4" }],
  [{ text: "  }, [roomId]);", color: "#d4d4d4" }],
  [{ text: "", color: "#d4d4d4" }],
  [{ text: "  return peers;", color: "#d4d4d4" }],
  [{ text: "}", color: "#d4d4d4" }],
];

interface CollaborativeEditorProps {
  collaborators: Collaborator[];
}

/**
 * Mock code surface used to demonstrate realtime editing: static
 * syntax-highlighted lines with animated remote cursors that move
 * between line positions to simulate live collaborators.
 */
const CollaborativeEditor = ({ collaborators }: CollaborativeEditorProps): React.ReactElement => {
  return (
    <div className={styles.editorWindow}>
      <div className={styles.editorTitleBar}>
        <span className={styles.dot} style={{ background: "#ff5f57" }} />
        <span className={styles.dot} style={{ background: "#febc2e" }} />
        <span className={styles.dot} style={{ background: "#28c840" }} />
        <span className={styles.editorTitleLabel}>usePresence.ts — shared workspace</span>
      </div>
      <div className={styles.editorSurface}>
        {CODE_LINES.map((line, i) => (
          <div key={i} className={styles.codeLine}>
            <span className={styles.lineNumber}>{i + 1}</span>
            <span>
              {line.map((token, j) => (
                <span key={j} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
            </span>
          </div>
        ))}

        {collaborators.map((c, i) => (
          <motion.div
            key={c.id}
            className={styles.remoteCursor}
            style={{ ["--cursor-color" as string]: c.color }}
            animate={{
              top: [`${(c.line % CODE_LINES.length) * 26 + 8}px`, `${((c.line + 3) % CODE_LINES.length) * 26 + 8}px`, `${(c.line % CODE_LINES.length) * 26 + 8}px`],
              left: ["55px", "220px", "55px"],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className={styles.cursorFlag}>{c.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollaborativeEditor;
