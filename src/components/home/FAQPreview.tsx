import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "./FAQPreview.module.scss";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { cn } from "@/utils/helpers";
import type { FAQItem } from "@/types";

const FAQS: FAQItem[] = [
  {
    id: "what-is",
    question: "What is C2X?",
    answer:
      "C2X is an AI-assisted, collaborative development environment designed to unite code editing, intelligent assistance, real-time pair programming, terminal management, and debugging into a single workspace.",
  },
  {
    id: "how-differs",
    question: "How does C2X differ from traditional desktop IDEs?",
    answer:
      "Unlike traditional IDEs that require separate plugins for AI, collaboration, and remote server access, C2X integrates Monaco-based editing, multi-cursor team synchronization, context-aware AI chat, and SSH/Docker remote capabilities out of the box.",
  },
  {
    id: "ai-privacy",
    question: "Is my source code kept private when using AI features?",
    answer:
      "Yes. Your codebase context is processed securely and is never stored, used to train public foundation models, or leaked outside your workspace. Local model setups with Ollama are also supported.",
  },
  {
    id: "extensions",
    question: "Does C2X support VS Code extensions?",
    answer:
      "Yes. C2X is compatible with the open VS Code extension ecosystem, allowing you to install linters, themes, language packs, and custom developer tools directly into your workspace.",
  },
  {
    id: "collab",
    question: "Can multiple developers edit code simultaneously?",
    answer:
      "Absolutely. C2X includes real-time multiplayer editing with live presence, individual cursor tracking, in-editor comments, and workspace permission controls (Owner, Editor, Viewer).",
  },
  {
    id: "terminal-debug",
    question: "Does C2X include an integrated terminal and debugger?",
    answer:
      "Yes. C2X features an integrated multi-tab terminal supporting Bash, Zsh, PowerShell, and WSL alongside a debugger with breakpoints, call stack inspection, and variable watches.",
  },
  {
    id: "offline",
    question: "Does C2X work offline?",
    answer:
      "Core editing, local project navigation, file search, and syntax diagnostics work seamlessly without an internet connection. AI suggestions can also leverage local Ollama models when offline.",
  },
  {
    id: "platforms",
    question: "Which operating systems and platforms are supported?",
    answer:
      "C2X runs smoothly as a desktop application on macOS, Windows, and Linux, and can also be deployed as a web-accessible workspace for remote environments.",
  },
  {
    id: "languages",
    question: "Which programming languages and frameworks are supported?",
    answer:
      "C2X provides first-class support and IntelliSense for TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, HTML/CSS, Docker, SQL, Shell, and over 50 additional syntax definitions.",
  },
  {
    id: "monorepo",
    question: "Can C2X handle large monorepos and complex projects?",
    answer:
      "Yes. C2X is optimized with multi-threaded indexing, lazy virtual file tree loading, and fast symbol search, ensuring smooth performance even in large repositories.",
  },
];

const FAQPreview = (): React.ReactElement => {
  const [openId, setOpenId] = useState<string | null>("what-is");

  return (
    <section className="section-pad" aria-label="Frequently Asked Questions">
      <Container>
        <SectionTitle
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before getting started."
          align="center"
        />
        <div className={styles.list}>
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={styles.item}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                  <Plus size={18} className={cn(styles.icon, isOpen && styles.open)} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={styles.answerWrap}
                    >
                      <p className={`${styles.answer} text-body`}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FAQPreview;
