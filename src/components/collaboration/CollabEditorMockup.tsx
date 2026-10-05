import { motion } from "framer-motion";
import { Atom, X } from "lucide-react";
import styles from "./CollabEditorMockup.module.scss";
import { fadeUp } from "@/animations/motion";

const LINES = Array.from({ length: 10 }, (_, i) => i + 1);

const CollabEditorMockup = (): React.ReactElement => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.mockupContainer}
      aria-label="Real-time Pair Programming Live Code Editor Mockup"
    >
      {/* Top Window Bar */}
      <div className={styles.windowBar}>
        <div className={styles.tabActive}>
          <Atom size={15} className={styles.tabIcon} />
          <span>index.js</span>
          <X size={12} className={styles.closeBtn} />
        </div>
      </div>

      {/* Editor Body */}
      <div className={styles.editorBody}>
        {/* Line Numbers */}
        <div className={styles.lineNumbers}>
          {LINES.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Code Area with Live Collaborator Selection Highlight */}
        <div className={styles.codeArea}>
          {/* Active Multiplayer Highlight Box */}
          <div className={styles.activeSelectionBox}>
            <div className={styles.cursorBadge}>Ives van Hoorne</div>
          </div>

          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>import</span>
            <span style={{ color: "#d4d4d4" }}> * </span>
            <span style={{ color: "#569cd6" }}>as</span>
            <span style={{ color: "#4ec9b0" }}> React</span>
            <span style={{ color: "#569cd6" }}> from</span>
            <span style={{ color: "#ce9178" }}> '"react"'</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>import</span>
            <span style={{ color: "#4ec9b0" }}> ReactDOM</span>
            <span style={{ color: "#569cd6" }}> from</span>
            <span style={{ color: "#ce9178" }}> '"react-dom"'</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>import</span>
            <span style={{ color: "#4ec9b0" }}> Button</span>
            <span style={{ color: "#569cd6" }}> from</span>
            <span style={{ color: "#ce9178" }}> '"@material-ui/core/Button"'</span>
          </span>
          <span className={styles.codeLine} />
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>function</span>
            <span style={{ color: "#dcdcaa" }}> App</span>
            <span style={{ color: "#d4d4d4" }}>() {"{"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>  return</span>
            <span style={{ color: "#d4d4d4" }}> (</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#808080" }}>{"    <"}</span>
            <span style={{ color: "#4ec9b0" }}>Button</span>
            <span style={{ color: "#9cdcfe" }}> variant</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"contained"'</span>
            <span style={{ color: "#9cdcfe" }}> color</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"primary"'</span>
            <span style={{ color: "#808080" }}>{">"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#d4d4d4" }}>      Hello World</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#808080" }}>{"    </"}</span>
            <span style={{ color: "#4ec9b0" }}>Button</span>
            <span style={{ color: "#808080" }}>{">"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#d4d4d4" }}>  );</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CollabEditorMockup;
