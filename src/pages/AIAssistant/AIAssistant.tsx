import { useState } from "react";
import {
  Wand2,
  BookOpen,
  FlaskConical,
  FileText,
  Bug,
  Repeat,
  Languages,
  Sparkles,
  ShieldCheck,
  Check,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AIAssistant.module.scss";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import PageHero from "@/components/common/PageHero";
import { AIChat } from "@/components/ai-assistant";
import AiAssistantMockup from "@/components/ai-assistant/AiAssistantMockup";
import { fadeUp, viewportOnce, cardHover } from "@/animations/motion";
import type { AICapability } from "@/types";

const CAPABILITIES: AICapability[] = [
  {
    id: "generate",
    icon: Wand2,
    title: "Code Generation",
    description:
      "Describe what you need in plain language and get working, idiomatic code instantly.",
  },
  {
    id: "explain",
    icon: BookOpen,
    title: "Explain Code",
    description:
      "Select any block and get a plain-language walkthrough of logic, dependencies, and flow.",
  },
  {
    id: "tests",
    icon: FlaskConical,
    title: "Generate Tests",
    description:
      "Scaffold unit and integration tests that cover real edge cases and error scenarios.",
  },
  {
    id: "docs",
    icon: FileText,
    title: "Generate Documentation",
    description:
      "Produce comprehensive JSDoc, PyDoc, and README files directly from active source code.",
  },
  {
    id: "debug",
    icon: Bug,
    title: "Debug Errors",
    description:
      "Analyze stack traces and runtime exceptions with exact root-cause analysis and automated fixes.",
  },
  {
    id: "refactor",
    icon: Repeat,
    title: "Refactor Code",
    description:
      "Clean up legacy code structures, improve type safety, and enforce design principles.",
  },
  {
    id: "translate",
    icon: Languages,
    title: "Translate Code",
    description:
      "Port functions and components between languages while preserving logic and behavior.",
  },
  {
    id: "inline",
    icon: Sparkles,
    title: "Inline Suggestions",
    description:
      "Ghost-text autocompletions that adapt to your coding style as you type.",
  },
];

const AI_WORKFLOW = [
  {
    step: 1,
    title: "Ask or Prompt",
    description:
      "Initiate request via inline ghost text, command palette, or side-panel chat using plain instructions.",
  },
  {
    step: 2,
    title: "Analyze Context",
    description:
      "C2X indexing engine analyzes active files, imports, types, and project structure.",
  },
  {
    step: 3,
    title: "Generate Code",
    description:
      "Context-aware LLM generates syntactically valid code matching your codebase conventions.",
  },
  {
    step: 4,
    title: "Review Diff",
    description:
      "Inspect generated suggestions side-by-side using unified git-style visual diff previews.",
  },
  {
    step: 5,
    title: "Apply & Format",
    description:
      "Accept suggestions with a single keypress; formatting rules apply automatically.",
  },
  {
    step: 6,
    title: "Validate & Test",
    description:
      "Run tests and linter diagnostics in the integrated terminal to confirm reliability.",
  },
];

const AI_FAQS = [
  {
    q: "How does C2X AI understand my entire codebase?",
    a: "C2X generates semantic embeddings of your workspace files locally, mapping symbols, function signatures, and imports into a context map provided to the AI prompt window.",
  },
  {
    q: "Will C2X send my private code to public model training data?",
    a: "No. C2X enforces strict privacy policies. Zero user code is stored or used for retraining public LLM base models.",
  },
  {
    q: "Can I use local LLM models like Ollama or Llama 3?",
    a: "Yes! C2X supports custom API endpoints, allowing you to route AI queries to locally hosted models for 100% offline development.",
  },
  {
    q: "Which languages produce the best AI completions?",
    a: "C2X AI excels in TypeScript, JavaScript, Python, Go, Rust, Java, C++, HTML/CSS, SQL, Dockerfiles, and Shell scripts.",
  },
  {
    q: "How does C2X handle security and secret key leakage?",
    a: "Integrated security filters strip API keys, secrets, and hardcoded tokens before any context payload is transmitted to AI services.",
  },
  {
    q: "Can AI generate full database schema migrations?",
    a: "Yes. C2X can inspect your ORM models (Prisma, Drizzle, SQLAlchemy, TypeORM) and draft valid SQL migration scripts.",
  },
];

const AIAssistant = (): React.ReactElement => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="AI Assistant"
        title="Your intelligent coding partner."
        description="C2X reads your whole workspace — not just the open file — to generate, explain, test, and fix code without breaking your flow."
      >
        <AIChat />
        <AiAssistantMockup />
      </PageHero>

      {/* Capabilities Section */}
      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title="One assistant, every workflow"
            description="Available from the command palette, inline ghost text, or the dedicated chat panel — wherever you work."
          />
          <div className={styles.grid}>
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                id={
                  cap.id === "generate"
                    ? "generation"
                    : cap.id === "explain"
                      ? "explanation"
                      : cap.id === "refactor"
                        ? "refactoring"
                        : cap.id === "inline"
                          ? "inline"
                          : ""
                }
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={i % 4}
                whileHover={cardHover}
                className={styles.card}
              >
                <div className={styles.icon}>
                  <cap.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className={styles.cardTitle}>{cap.title}</h3>
                <p className="text-small">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* AI Developer Workflow Section */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Workflow"
            title="How AI-Assisted coding works"
            description="From initial prompt to validated production code in six seamless steps."
          />
          <div className={styles.workflowGrid}>
            {AI_WORKFLOW.map((item) => (
              <div key={item.step} className={styles.workflowCard}>
                <span className={styles.stepNum}>{item.step}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Detailed Generation Breakdown */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Deep Dive"
            title="Comprehensive generation & analysis"
            description="Explore how C2X assists with complex engineering tasks across the entire application stack."
          />
          <div className={styles.featureListGrid}>
            <div className={styles.featureListItem}>
              <h3>Full-Stack Component Generation</h3>
              <p>
                Generate React, Vue, or Svelte components styled with Tailwind CSS or CSS Modules, complete with TypeScript props, state management, and accessibility attributes.
              </p>
            </div>
            <div className={styles.featureListItem}>
              <h3>REST & GraphQL API Builders</h3>
              <p>
                Draft Express, Fastify, FastAPI, or Gin route handlers with request validation, response serialization, error handling, and OpenAPI documentation tags.
              </p>
            </div>
            <div className={styles.featureListItem}>
              <h3>Database Queries & Schemas</h3>
              <p>
                Formulate optimized SQL queries, indexes, and migrations from natural language descriptions or existing data model definitions.
              </p>
            </div>
            <div className={styles.featureListItem}>
              <h3>Automated Test Scaffolding</h3>
              <p>
                Instantly create Jest, Vitest, PyTest, or Go test suites covering boundary conditions, mock dependencies, and async error paths.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* AI Safety & Verification */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Safety & Trust"
            title="Responsible AI & Human-in-the-Loop"
            description="C2X empowers developers with AI suggestions while leaving ultimate architectural control in human hands."
          />
          <div className={styles.safetyBox}>
            <h3>Developer Verification & Security First</h3>
            <p>
              All AI-generated code is presented as interactive diffs. Developers review, test, and approve suggestions before committing to the codebase.
            </p>
            <ul>
              <li>
                <Check size={18} className="text-accent" />
                Context sandboxing isolates workspace secrets and environment variables.
              </li>
              <li>
                <Check size={18} className="text-accent" />
                Automated security scanning checks generated code for common CVEs.
              </li>
              <li>
                <Check size={18} className="text-accent" />
                Support for local LLMs ensures strict air-gapped compliance.
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* AI FAQs */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="AI Assistant FAQ"
            description="Common questions regarding C2X AI models, context, and privacy."
          />
          <div className={styles.faqGrid}>
            {AI_FAQS.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AIAssistant;
