import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Code2,
  Sparkles,
  Terminal as TerminalIcon,
  Bug,
  Search,
  Settings,
  Palette,
  Play,
} from "lucide-react";
import styles from "./C2XInAction.module.scss";
import Container from "@/components/common/Container";
import CodeEditor from "@/components/editor/CodeEditor";
import AIChat from "@/components/ai-assistant/AIChat";
import Terminal from "@/components/editor/Terminal";
import { fadeUp } from "@/animations/motion";

const WORKFLOW_STEPS = [
  { id: "project", label: "Open Project", icon: FolderOpen, desc: "Browse workspace folders, package.json configs, and multi-root directory trees instantly." },
  { id: "edit", label: "Edit Code", icon: Code2, desc: "Monaco-powered editing with multi-cursor support, autocompletes, and TypeScript typings." },
  { id: "ai", label: "AI Assistance", icon: Sparkles, desc: "Context-aware AI chat and inline completions trained on your active codebase." },
  { id: "palette", label: "Command Palette", icon: Search, desc: "Quickly access settings, color themes, and commands via Ctrl+Shift+P." },
  { id: "terminal", label: "Run in Terminal", icon: TerminalIcon, desc: "Run dev servers, test suites, and shell commands in split panes." },
  { id: "debug", label: "Debug", icon: Bug, desc: "Set margin breakpoints, inspect live variables, and step through call stacks." },
];

const COMMANDS = [
  { label: "Preferences: Open Settings", shortcut: "Ctrl+,", icon: Settings },
  { label: "Preferences: Open Keyboard Shortcuts", shortcut: "Ctrl+K Ctrl+S", icon: Play },
  { label: "View: Open Extensions", shortcut: "Ctrl+Shift+X", icon: Search },
  { label: "Preferences: Color Theme", shortcut: "Ctrl+K Ctrl+T", icon: Palette },
  { label: "View: Toggle Sidebar", shortcut: "Ctrl+B", icon: Search },
  { label: "View: Toggle Terminal", shortcut: "Ctrl+`", icon: TerminalIcon },
];

const C2XInAction = (): React.ReactElement => {
  const [activeStep, setActiveStep] = useState("project");

  return (
    <section className={styles.actionSection} aria-label="C2X in Action">
      <Container>
        <div className={styles.header}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.title}
          >
            C2X in <span className={styles.gradient}>Action</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.description}
          >
            One connected workflow for building, running, debugging and collaborating on software.
          </motion.p>
        </div>

        {/* Workflow Tabs */}
        <div className={styles.workflowTabs} role="tablist">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabBtn} ${isActive ? styles.active : ""}`}
                onClick={() => setActiveStep(step.id)}
              >
                <Icon size={16} strokeWidth={1.8} />
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Display Panel */}
        <div className={styles.displayPanel}>
          <div className={styles.panelHeaderInfo}>
            {WORKFLOW_STEPS.filter((s) => s.id === activeStep).map((s) => (
              <div key={s.id}>
                <h3>{s.label} Session</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* 1. Open Project */}
              {activeStep === "project" && (
                <div className={styles.debuggerBox}>
                  <div style={{ color: "#858585", marginBottom: "8px", fontWeight: 600, fontSize: "0.8rem" }}>WORKSPACE EXPLORER — package.json</div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`{`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`  "name": "c2x-workspace",`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`  "version": "2.4.1",`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`  "dependencies": {`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#ce9178" }}>{`    "react": "^19.0.0",`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#ce9178" }}>{`    "@c2x/sdk": "^1.2.0"`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`  }`}</span></div>
                  <div className={styles.debugRow}><span style={{ color: "#9cdcfe" }}>{`}`}</span></div>
                </div>
              )}

              {/* 2. Edit Code */}
              {activeStep === "edit" && <CodeEditor />}

              {/* 3. AI Assistance */}
              {activeStep === "ai" && <AIChat />}

              {/* 4. Command Palette */}
              {activeStep === "palette" && (
                <div className={styles.commandPaletteWrapper}>
                  <div className={styles.editorBgLayer}>
                    <CodeEditor />
                  </div>
                  <div className={styles.commandPaletteOverlay}>
                    <div className={styles.cpSearch}>
                      <Search size={16} />
                      <span>Type a command...</span>
                    </div>
                    <div className={styles.cpList}>
                      {COMMANDS.map((cmd, idx) => {
                        const CmdIcon = cmd.icon;
                        return (
                          <div key={cmd.label} className={`${styles.cpItem} ${idx === 2 ? styles.selected : ""}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <CmdIcon size={14} style={{ opacity: 0.6 }} />
                              <span>{cmd.label}</span>
                            </div>
                            <span className={styles.shortcut}>{cmd.shortcut}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Run in Terminal */}
              {activeStep === "terminal" && <Terminal />}

              {/* 6. Debug */}
              {activeStep === "debug" && (
                <div className={styles.debuggerBox}>
                  <div style={{ color: "#858585", marginBottom: "8px", fontWeight: 600, fontSize: "0.8rem" }}>DEBUGGER SESSION — active breakpoints (1)</div>
                  <div className={styles.debugRow}>
                    <span className={styles.gutterEmpty} />
                    <span style={{ color: "#569cd6" }}>async function</span>
                    <span style={{ color: "#dcdcaa" }}> processWorkspace</span>
                    <span style={{ color: "#d4d4d4" }}>(dir) {"{"}</span>
                  </div>
                  <div className={styles.debugRow}>
                    <span className={styles.gutterEmpty} />
                    <span style={{ color: "#569cd6" }}>  const</span>
                    <span style={{ color: "#9cdcfe" }}> files</span>
                    <span style={{ color: "#d4d4d4" }}> = </span>
                    <span style={{ color: "#dcdcaa" }}>await</span>
                    <span style={{ color: "#9cdcfe" }}> fs</span>
                    <span style={{ color: "#d4d4d4" }}>.</span>
                    <span style={{ color: "#dcdcaa" }}>readdir</span>
                    <span style={{ color: "#d4d4d4" }}>(dir);</span>
                  </div>
                  <div className={`${styles.debugRow} ${styles.breakpointActive}`}>
                    <span className={styles.gutterDot} />
                    <span style={{ color: "#6a9955" }}>  // Breakpoint hit: files.length = 42</span>
                  </div>
                  <div className={styles.debugRow}>
                    <span className={styles.gutterEmpty} />
                    <span style={{ color: "#569cd6" }}>  return</span>
                    <span style={{ color: "#9cdcfe" }}> files</span>
                    <span style={{ color: "#d4d4d4" }}>.</span>
                    <span style={{ color: "#dcdcaa" }}>filter</span>
                    <span style={{ color: "#d4d4d4" }}>(f =&gt; f.</span>
                    <span style={{ color: "#dcdcaa" }}>endsWith</span>
                    <span style={{ color: "#ce9178" }}>('.ts'</span>
                    <span style={{ color: "#d4d4d4" }}>));</span>
                  </div>
                  <div className={styles.debugRow}>
                    <span className={styles.gutterEmpty} />
                    <span style={{ color: "#d4d4d4" }}>{"}"}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default C2XInAction;
