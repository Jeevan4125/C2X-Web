import { motion } from "framer-motion";
import styles from "./DevWorkflow.module.scss";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { fadeUp } from "@/animations/motion";

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "Create Project",
    description:
      "Initialize a brand-new project from template or import existing repositories directly from GitHub, GitLab, or Bitbucket.",
  },
  {
    step: 2,
    title: "Open Workspace",
    description:
      "Launch a light, high-performance editor instance with configured toolchains, workspace settings, and dependency environments.",
  },
  {
    step: 3,
    title: "Explore & Navigate",
    description:
      "Locate functions, symbols, and files instantly using fuzzy file search, breadcrumb bars, and symbol definitions.",
  },
  {
    step: 4,
    title: "Write Clean Code",
    description:
      "Code with Monaco-powered IntelliSense, multi-cursor editing, automatic formatting, and instant syntax diagnostics.",
  },
  {
    step: 5,
    title: "AI Assistance",
    description:
      "Ask AI to generate functions, refactor messy blocks, write unit tests, or explain complex logic in natural language.",
  },
  {
    step: 6,
    title: "Run & Test",
    description:
      "Execute terminal commands, run test scripts, or start local dev servers in the integrated multi-tab shell.",
  },
  {
    step: 7,
    title: "Debug Issues",
    description:
      "Set breakpoints, inspect live variable state, traverse call stacks, and evaluate expressions interactively.",
  },
  {
    step: 8,
    title: "Collaborate Live",
    description:
      "Invite teammates via secure room codes to pair-program with live cursors, shared selection, and in-editor chat.",
  },
  {
    step: 9,
    title: "Build & Ship",
    description:
      "Stage changes, make Git commits, create pull requests, and deploy containerized apps seamlessly to production.",
  },
];

const DevWorkflow = (): React.ReactElement => {
  return (
    <section className={styles.workflowSection} aria-label="Development Workflow">
      <Container>
        <SectionTitle
          eyebrow="Workflow"
          title="From first commit to production deployment"
          description="A complete end-to-end developer lifecycle unified in one intelligent workspace."
          align="center"
        />
        <div className={styles.timeline}>
          {WORKFLOW_STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index}
              className={styles.stepCard}
            >
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>{item.step}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
              </div>
              <p className={styles.stepDesc}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DevWorkflow;
