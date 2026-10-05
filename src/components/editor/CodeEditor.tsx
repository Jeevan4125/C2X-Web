import { useState, useEffect, useMemo } from "react";
import { Files, Search, GitBranch, LayoutGrid, User } from "lucide-react";
import styles from "./Editor.module.scss";
import { cn } from "@/utils/helpers";
import EditorTabs from "./EditorTabs";
import Sidebar from "./Sidebar";
import Terminal from "./Terminal";
import StatusBar from "./StatusBar";
import type { EditorTab } from "@/types";

const TABS: EditorTab[] = [
  { id: "app", fileName: "App.tsx", language: "typescriptreact" },
  { id: "server", fileName: "server.ts", language: "typescript" },
  { id: "main", fileName: "main.tsx", language: "typescriptreact" },
];

interface Token {
  text: string;
  color: string;
}

const CODE_LINES: Token[][] = [
  [
    { text: "import", color: "#569cd6" },
    { text: " { useState } ", color: "#d4d4d4" },
    { text: "from", color: "#569cd6" },
    { text: " ", color: "#d4d4d4" },
    { text: '"react"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ],
  [
    { text: "import", color: "#569cd6" },
    { text: " { useCollabSession } ", color: "#d4d4d4" },
    { text: "from", color: "#569cd6" },
    { text: " ", color: "#d4d4d4" },
    { text: '"@c2x/sdk"', color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
  ],
  [{ text: "", color: "#d4d4d4" }],
  [
    { text: "export default function ", color: "#569cd6" },
    { text: "App", color: "#dcdcaa" },
    { text: "() {", color: "#d4d4d4" },
  ],
  [
    { text: "  const ", color: "#569cd6" },
    { text: "[count, setCount]", color: "#9cdcfe" },
    { text: " = ", color: "#d4d4d4" },
    { text: "useState", color: "#dcdcaa" },
    { text: "(", color: "#d4d4d4" },
    { text: "0", color: "#b5cea8" },
    { text: ");", color: "#d4d4d4" },
  ],
  [
    { text: "  const { peers } = ", color: "#d4d4d4" },
    { text: "useCollabSession", color: "#dcdcaa" },
    { text: "();", color: "#d4d4d4" },
  ],
  [{ text: "", color: "#d4d4d4" }],
  [
    { text: "  ", color: "#d4d4d4" },
    { text: "// AI suggests: memoize this handler", color: "#6a9955" },
  ],
  [{ text: "  return (", color: "#d4d4d4" }],
  [
    { text: "    <", color: "#808080" },
    { text: "div", color: "#569cd6" },
    { text: " className=", color: "#9cdcfe" },
    { text: '"app"', color: "#ce9178" },
    { text: ">", color: "#808080" },
  ],
  [
    { text: "      <", color: "#808080" },
    { text: "Editor", color: "#4ec9b0" },
    { text: " peers={peers} ", color: "#9cdcfe" },
    { text: "/>", color: "#808080" },
  ],
  [
    { text: "    </", color: "#808080" },
    { text: "div", color: "#569cd6" },
    { text: ">", color: "#808080" },
  ],
  [{ text: "  );", color: "#d4d4d4" }],
  [{ text: "}", color: "#d4d4d4" }],
];

/**
 * Central VS Code style editor showcase: activity bar, explorer,
 * tabbed editor with animated typing/syntax highlighting, terminal,
 * and status bar. Used in the Hero section.
 */
const CodeEditor = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState("app");
  const [visibleLines, setVisibleLines] = useState(0);

  const currentTab = useMemo(
    () => TABS.find((t) => t.id === activeTab) ?? TABS[0],
    [activeTab],
  );

  useEffect(() => {
    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [activeTab]);

  const activityIcons = [
    { icon: Files, active: true },
    { icon: Search, active: false },
    { icon: GitBranch, active: false },
    { icon: LayoutGrid, active: false },
    { icon: User, active: false },
  ];

  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <span className={cn(styles.dot, styles.dotRed)} />
        <span className={cn(styles.dot, styles.dotYellow)} />
        <span className={cn(styles.dot, styles.dotGreen)} />
        <span className={styles.titleLabel}>c2x-demo — C2X</span>
      </div>

      <div className={styles.body}>
        <div className={styles.activityBar} aria-label="Activity bar">
          {activityIcons.map(({ icon: Icon, active }, i) => (
            <div
              key={i}
              className={cn(styles.activityIcon, active && styles.active)}
            >
              <Icon size={18} strokeWidth={1.75} />
            </div>
          ))}
        </div>

        <Sidebar selectedFile={currentTab.fileName} />

        <div className={styles.editorArea}>
          <EditorTabs
            tabs={TABS}
            activeId={activeTab}
            onSelect={setActiveTab}
          />

          <div className={styles.codeArea} aria-label="Code editor content">
            {CODE_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={styles.codeLine}>
                <span className={styles.lineNumber}>{i + 1}</span>
                <span className={styles.lineContent}>
                  {line.map((token, j) => (
                    <span key={j} style={{ color: token.color }}>
                      {token.text}
                    </span>
                  ))}
                  {i === visibleLines - 1 && <span className={styles.cursor} />}
                </span>
              </div>
            ))}
          </div>

          <div
            className={styles.panelTabs}
            role="tablist"
            aria-label="Bottom panels"
          >
            <span className={cn(styles.panelTab, styles.active)}>Terminal</span>
            <span className={styles.panelTab}>Problems</span>
            <span className={styles.panelTab}>Output</span>
          </div>
          <Terminal />
        </div>
      </div>

      <StatusBar
        branch="feature/ai-refactor"
        language="TypeScript React"
        line={11}
        column={18}
      />
    </div>
  );
};

export default CodeEditor;
