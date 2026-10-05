import { motion } from "framer-motion";
import { ChevronRight, FileCode, X, Plus } from "lucide-react";
import styles from "./HeroEditorMockup.module.scss";
import { fadeUp } from "@/animations/motion";

const LINES = Array.from({ length: 28 }, (_, i) => i + 1);

const HeroEditorMockup = (): React.ReactElement => {
  return (
    <motion.div
      variants={fadeUp}
      className={styles.mockupWrapper}
      aria-label="C2X Code Editor Mockup"
    >
      {/* Top Window Bar */}
      <div className={styles.windowBar}>
        <div className={styles.windowDots}>
          <span style={{ background: "#ff5f56" }} />
          <span style={{ background: "#ffbd2e" }} />
          <span style={{ background: "#27c93f" }} />
        </div>
        <div className={styles.tabsRow}>
          <div className={styles.tabActive}>
            <FileCode size={14} className={styles.tabIcon} />
            <span>index.html</span>
            <X size={12} className={styles.closeBtn} />
          </div>
          <Plus size={14} className={styles.newTabBtn} />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className={styles.breadcrumbBar}>
        <span>c2x</span>
        <ChevronRight size={12} />
        <span>src</span>
        <ChevronRight size={12} />
        <span>workspace</span>
        <ChevronRight size={12} />
        <span style={{ color: "#ffffff", fontWeight: 500 }}>index.html</span>
        <span style={{ opacity: 0.4 }}>...</span>
      </div>

      {/* Editor Body */}
      <div className={styles.editorBody}>
        {/* Line Numbers */}
        <div className={styles.lineNumbers}>
          {LINES.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Syntax Highlighted Code */}
        <div className={styles.codeArea}>
          <span className={styles.codeLine}>
            <span style={{ color: "#808080" }}>{"<!DOCTYPE html>"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"<html "}</span>
            <span style={{ color: "#9cdcfe" }}>lang</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"en"'</span>
            <span style={{ color: "#569cd6" }}>{">"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"  <head>"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <meta "}</span>
            <span style={{ color: "#9cdcfe" }}>charset</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"UTF-8"'</span>
            <span style={{ color: "#569cd6" }}>{" />"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <meta "}</span>
            <span style={{ color: "#9cdcfe" }}>name</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"viewport"'</span>
            <span style={{ color: "#9cdcfe" }}> content</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"width=device-width, initial-scale=1.0"'</span>
            <span style={{ color: "#569cd6" }}>{" />"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <title>"}</span>
            <span style={{ color: "#d4d4d4" }}>C2X — AI-Powered Collaborative IDE</span>
            <span style={{ color: "#569cd6" }}>{"</title>"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <link "}</span>
            <span style={{ color: "#9cdcfe" }}>rel</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"preconnect"'</span>
            <span style={{ color: "#9cdcfe" }}> href</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"https://fonts.googleapis.com"'</span>
            <span style={{ color: "#569cd6" }}>{" />"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <link "}</span>
            <span style={{ color: "#9cdcfe" }}>rel</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"stylesheet"'</span>
            <span style={{ color: "#9cdcfe" }}> href</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"/styles/main.css"'</span>
            <span style={{ color: "#569cd6" }}>{" />"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"    <link "}</span>
            <span style={{ color: "#9cdcfe" }}>rel</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"stylesheet"'</span>
            <span style={{ color: "#9cdcfe" }}> href</span>
            <span style={{ color: "#d4d4d4" }}>=</span>
            <span style={{ color: "#ce9178" }}>'"/styles/theme.css"'</span>
            <span style={{ color: "#569cd6" }}>{" />"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"  </head>"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#569cd6" }}>{"  <style>"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#6a9955" }}>{"    /* ==================== C2X DESIGN SYSTEM ==================== */"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#d7ba7d" }}>{"    :root "}</span>
            <span style={{ color: "#d4d4d4" }}>{"{"}</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-bg: "}</span>
            <span className={styles.swatch} style={{ background: "#09090b" }} />
            <span style={{ color: "#ce9178" }}>"#09090b"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-surface: "}</span>
            <span className={styles.swatch} style={{ background: "#111111" }} />
            <span style={{ color: "#ce9178" }}>"#111111"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-panel: "}</span>
            <span className={styles.swatch} style={{ background: "#181818" }} />
            <span style={{ color: "#ce9178" }}>"#181818"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-border: "}</span>
            <span className={styles.swatch} style={{ background: "#2a2a2a" }} />
            <span style={{ color: "#ce9178" }}>"#2a2a2a"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-accent: "}</span>
            <span className={styles.swatch} style={{ background: "#007acc" }} />
            <span style={{ color: "#ce9178" }}>"#007acc"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-accent-hover: "}</span>
            <span className={styles.swatch} style={{ background: "#1b8fe0" }} />
            <span style={{ color: "#ce9178" }}>"#1b8fe0"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-accent-dim: "}</span>
            <span className={styles.swatch} style={{ background: "#0a5a96" }} />
            <span style={{ color: "#ce9178" }}>"#0a5a96"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-teal: "}</span>
            <span className={styles.swatch} style={{ background: "#00e5c8" }} />
            <span style={{ color: "#ce9178" }}>"#00e5c8"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-text-primary: "}</span>
            <span className={styles.swatch} style={{ background: "#ffffff" }} />
            <span style={{ color: "#ce9178" }}>"#ffffff"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-text-secondary: "}</span>
            <span className={styles.swatch} style={{ background: "#a1a1aa" }} />
            <span style={{ color: "#ce9178" }}>"#a1a1aa"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-glass: "}</span>
            <span className={styles.swatch} style={{ background: "rgba(255, 255, 255, 0.08)" }} />
            <span style={{ color: "#ce9178" }}>"rgba(255, 255, 255, 0.08)"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-shadow: "}</span>
            <span style={{ color: "#ce9178" }}>"0 12px 50px rgba(0, 122, 204, 0.14)"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-radius: "}</span>
            <span style={{ color: "#b5cea8" }}>"16px"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#9cdcfe" }}>{"      --c2x-transition: "}</span>
            <span style={{ color: "#ce9178" }}>"0.25s cubic-bezier(0.22, 1, 0.36, 1)"</span>
            <span style={{ color: "#d4d4d4" }}>;</span>
          </span>
          <span className={styles.codeLine}>
            <span style={{ color: "#d4d4d4" }}>{"    }"}</span>
          </span>
        </div>

        {/* Minimap */}
        <div className={styles.minimap}>
          <div className={`${styles.minimapLine} ${styles.accent} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.long}`} />
          <div className={`${styles.minimapLine} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.long}`} />
          <div className={`${styles.minimapLine} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.comment} ${styles.long}`} />
          <div className={`${styles.minimapLine} ${styles.accent} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.long}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.long}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.medium}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.short}`} />
          <div className={`${styles.minimapLine} ${styles.string} ${styles.long}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroEditorMockup;
