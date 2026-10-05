import DocPage from "@/components/docs/DocPage";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "general", label: "General", depth: 2 },
  { id: "ai", label: "AI Assistance", depth: 2 },
  { id: "collaboration", label: "Real-Time Collaboration", depth: 2 },
  { id: "development", label: "Development & Tooling", depth: 2 },
  { id: "account", label: "Account & Sync", depth: 2 },
];

const Faq = (): React.ReactElement => {
  return (
    <DocPage
      title="Frequently Asked Questions"
      description="Comprehensive answers to common questions about C2X features, AI capabilities, collaboration, and workspace setup."
      breadcrumbLabel="FAQ"
      readingTime={8}
      tocEntries={tocEntries}
    >
      <h2 id="general">General</h2>

      <h3>What is C2X?</h3>
      <p>
        C2X is an AI-first, collaborative development workspace designed to unite code editing, context-aware AI assistance, real-time multiplayer pair programming, terminal management, and debugging into a single unified IDE.
      </p>

      <h3>Who is C2X designed for?</h3>
      <p>
        C2X is built for individual developers, software engineering teams, students, educators, and hackathon participants who want a fast, zero-config environment with native AI and real-time collaboration.
      </p>

      <h3>Is C2X an IDE or a code editor?</h3>
      <p>
        C2X combines the speed and simplicity of lightweight code editors with full IDE capabilities — including integrated debugging, terminal panes, Git version control, and multi-threaded symbol indexing.
      </p>

      <h3>Which programming languages are supported out of the box?</h3>
      <p>
        C2X provides first-class syntax highlighting and IntelliSense for TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, HTML, CSS, SQL, Dockerfiles, Shell scripts, and over 50 additional syntax definitions.
      </p>

      <h2 id="ai">AI Assistance</h2>

      <h3>What can the C2X AI assistant do?</h3>
      <p>
        The AI assistant can generate functions and full components from plain instructions, explain unfamiliar blocks of code, draft unit test suites, apply refactoring suggestions, and analyze stack traces for automated bug fixes.
      </p>

      <h3>Can AI explain complex or unfamiliar code?</h3>
      <p>
        Yes. Highlight any code snippet in the editor and click "Explain Code" or press <code>Ctrl+Shift+E</code> / <code>Cmd+Shift+E</code> to receive a plain-language explanation of data flow, dependencies, and execution logic.
      </p>

      <h3>Can AI help fix bugs and runtime stack traces?</h3>
      <p>
        When an exception occurs in the terminal or debugger, pass the error output to C2X AI to receive an exact root-cause breakdown and a recommended one-click code patch.
      </p>

      <h3>Is my source code private when using AI capabilities?</h3>
      <p>
        Yes. C2X enforces strict privacy boundaries. Your codebase context is transmitted over encrypted channels and is never stored, sold, or used to train public foundation models.
      </p>

      <h2 id="collaboration">Real-Time Collaboration</h2>

      <h3>How do multiplayer collaboration rooms work?</h3>
      <p>
        Workspace owners can start a collaboration session with one click. Inviting teammates via room code or secure link opens a synchronized workspace with live multi-cursor editing and active line highlights.
      </p>

      <h3>Can multiple developers edit the same file simultaneously?</h3>
      <p>
        Yes. C2X uses low-latency Operational Transform algorithms to synchronize concurrent file edits without overwriting changes or creating editing locks.
      </p>

      <h3>What role permissions are available for shared sessions?</h3>
      <p>
        C2X supports three distinct roles: <strong>Owner</strong> (full workspace administration), <strong>Editor</strong> (active coding and execution rights), and <strong>Viewer</strong> (read-only inspection and feedback pins).
      </p>

      <h3>Is collaborative terminal sharing safe?</h3>
      <p>
        Terminal sharing is strictly permissions-gated. Room owners must explicitly grant terminal execution privileges to collaborators before commands can be run on shared environments.
      </p>

      <h2 id="development">Development & Tooling</h2>

      <h3>Can I execute terminal commands directly in C2X?</h3>
      <p>
        Yes. C2X features an integrated multi-pane terminal supporting Bash, Zsh, PowerShell, and WSL with full ANSI color support and split layout capabilities.
      </p>

      <h3>How does the built-in debugger work?</h3>
      <p>
        Set breakpoints directly in the code editor gutter, run your app in debug mode, and use the debugger panel to step through code, inspect variables, and evaluate expressions in real time.
      </p>

      <h3>Does C2X support VS Code extensions?</h3>
      <p>
        Yes. C2X implements the open VS Code extension API specification, allowing you to install themes, formatters, language packs, and devtools from the marketplace.
      </p>

      <h3>Does C2X integrate with Git and GitHub?</h3>
      <p>
        Yes. C2X includes visual Git branch management, staged diff viewing, commit tools, and GitHub pull request integration directly inside the IDE layout.
      </p>

      <h2 id="account">Account & Sync</h2>

      <h3>How does user authentication work?</h3>
      <p>
        Sign in using email OTP or OAuth providers (GitHub, Google) to sync workspace preferences, extensions, snippets, and active session history across devices.
      </p>

      <h3>Is Guest Mode available for quick coding?</h3>
      <p>
        Yes. You can launch C2X in Guest Mode without logging in to edit local files, run terminal commands, or explore template projects immediately.
      </p>

      <h3>How are settings and themes synchronized?</h3>
      <p>
        When signed in, setting preferences saved to <code>.c2x/settings.json</code> automatically synchronize to your account cloud profile.
      </p>
    </DocPage>
  );
};

export default Faq;
