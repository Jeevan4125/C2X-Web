import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/common/Container";
import VersionTimeline, { type ReleaseEntry } from "@/components/docs/VersionTimeline";
import styles from "./Releases.module.scss";
import { fadeUp, viewportOnce } from "@/animations/motion";

const RELEASES: ReleaseEntry[] = [
  {
    version: "v2.0",
    date: "January 2026",
    tag: "latest",
    summary:
      "A major architectural milestone introducing the redesigned AI Assistant panel, live multiplayer collaboration rooms, multi-threaded indexing, and a rebuilt extension marketplace.",
    sections: {
      features: [
        "AI Assistant panel with inline edits, automated unit test generation, and root-cause error debugging",
        "Real-time collaboration rooms with live multi-cursor sync, Follow Mode, and in-editor comments",
        "Redesigned Extensions marketplace with verified publisher badges, category filters, and ratings",
        "Integrated multi-tab terminal with split-pane capability and persistent shell history",
      ],
      improvements: [
        "Editor cold startup time reduced by roughly 40% across Windows, macOS, and Linux",
        "Terminal rendering engine upgraded to WebGL2 for smooth 60fps throughput",
        "Memory consumption during large search and replace operations decreased by 35%",
      ],
      fixes: [
        "Fixed a memory leak when closing high volumes of editor tabs in rapid succession",
        "Resolved non-US keyboard shortcut registration bugs on macOS Monterey",
        "Fixed TypeScript language server crash when navigating circular type references",
      ],
      breaking: [
        "Extension manifest v1 is no longer supported — extension authors should migrate to v2 schema",
        "The legacy Themes API (pre-v1.2) has been removed in favor of the unified token color format",
      ],
    },
  },
  {
    version: "v1.2",
    date: "September 2025",
    tag: "stable",
    summary:
      "Focused on core editor performance, multi-pane layouts, and expanded language servers across the workbench.",
    sections: {
      features: [
        "Split editor supporting up to four grid panes simultaneously",
        "First-class Rust (Rust Analyzer) and Go (gopls) language server integration",
        "Integrated breadcrumb navigation bar displaying active class, method, and symbol scopes",
      ],
      improvements: [
        "Accelerated full-workspace text search indexing for repositories exceeding 100,000 files",
        "Reduced AI Assistant query latency by roughly 25% via streaming token optimizations",
        "Improved high-contrast dark theme contrast ratios for accessibility compliance",
      ],
      fixes: [
        "Fixed incorrect line offset highlights in the Problems panel after pasting large code blocks",
        "Resolved intermittent WebSocket disconnects during prolonged collaboration sessions",
      ],
    },
  },
  {
    version: "v1.1",
    date: "May 2025",
    tag: "legacy",
    summary:
      "Introduced the integrated debugger with breakpoints, variable watches, and status bar Git integration.",
    sections: {
      features: [
        "Integrated node/browser debugger with breakpoints, call stack view, and watch expressions",
        "Status bar Git branch indicator with quick checkout and sync controls",
        "Custom keybinding editor with chord-sequence shortcut support",
      ],
      improvements: [
        "Settings UI reorganized into searchable categories with instant search filter",
        "Enhanced auto-closing bracket and quotation pairing intelligence",
      ],
      fixes: [
        "Fixed integrated terminal losing keyboard focus after switching workspace tabs",
        "Resolved file tree reload lag on network-attached storage mounts",
      ],
    },
  },
  {
    version: "v1.0",
    date: "January 2025",
    tag: "legacy",
    summary: "The inaugural stable release of C2X: Monaco editor, file explorer, terminal, and theme engine.",
    sections: {
      features: [
        "Core Monaco-powered editor with syntax highlighting for 50+ languages and multi-cursor editing",
        "Workspace file explorer, integrated shell terminal, and customizable theme palette",
        "Command palette (Ctrl+Shift+P / Cmd+Shift+P) for fast keyboard navigation",
      ],
      improvements: [
        "Optimized virtual file tree rendering for large workspace directories",
      ],
    },
  },
];

/** /releases — standalone changelog timeline, outside the /docs shell. */
const Releases = (): React.ReactElement => {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="Release Notes"
        description="What's new, improved, and fixed in every C2X release."
      />
      <section className={styles.section}>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
            <VersionTimeline releases={RELEASES} />
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default Releases;
