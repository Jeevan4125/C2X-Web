import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import NoteBox from "@/components/docs/NoteBox";
import WarningBox from "@/components/docs/WarningBox";
import { estimateReadingTime } from "@/utils/readingTime";

const TOC = [
  { id: "install", label: "1. Install" },
  { id: "launch", label: "2. Launch the IDE" },
  { id: "workspace", label: "3. Create a Workspace" },
  { id: "open-project", label: "4. Open a Project" },
  { id: "run-code", label: "5. Run Code" },
  { id: "ai-assistant", label: "6. Use the AI Assistant" },
  { id: "collab-room", label: "7. Create a Collaboration Room" },
];

const WORDS = 780;

/** /docs/getting-started — first-run walkthrough from install to collaboration. */
const GettingStarted = (): React.ReactElement => {
  return (
    <DocPage
      title="Getting Started"
      description="A first-run walkthrough covering installation, your first workspace, running code, and inviting a teammate."
      breadcrumbLabel="Getting Started"
      readingTime={estimateReadingTime(WORDS)}
      tocEntries={TOC}
    >
      <h2 id="install">1. Install</h2>
      <p>
        Download the installer for your platform from the Download page, or use a package manager.
        C2X supports Windows, macOS, Linux, and a portable build that needs no installation.
      </p>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# macOS (Homebrew)\nbrew install --cask c2x\n\n# Windows (winget)\nwinget install C2X.IDE`}
      />
      <NoteBox title="Tip">
        Need platform-specific steps or system requirements? See the <code>Installation</code> guide
        for full detail.
      </NoteBox>

      <h2 id="launch">2. Launch the IDE</h2>
      <p>
        Open C2X from your applications menu, Start menu, or by running <code>c2x</code>{" "}
        from a terminal. On first launch you'll see the Welcome screen with quick actions for opening
        a folder, cloning a repository, or starting from a template.
      </p>

      <h2 id="workspace">3. Create a Workspace</h2>
      <p>
        A workspace is a saved collection of folders, settings, and extensions scoped to a project.
        Choose <strong>File → New Workspace</strong>, name it, and pick a location on disk.
      </p>
      <CodeBlock language="bash" filename="terminal" code={`c2x --new-workspace ./my-app`} />

      <h2 id="open-project">4. Open a Project</h2>
      <p>
        Use <strong>File → Open Folder</strong> to point C2X at an existing codebase. The
        Explorer panel on the left populates with your file tree, and any detected package manager
        (npm, pnpm, cargo, pip) is picked up automatically.
      </p>

      <h2 id="run-code">5. Run Code</h2>
      <p>
        Press <code>Ctrl/Cmd + Enter</code> on a file, or use the Run panel, to execute the active
        file with the language runtime C2X detects for your project.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/main.ts"
        code={`function greet(name: string) {\n  console.log(\`Hello, \${name}!\`);\n}\n\ngreet("C2X");`}
      />

      <h2 id="ai-assistant">6. Use the AI Assistant</h2>
      <p>
        Open the AI Assistant panel with <code>Ctrl/Cmd + Shift + A</code>. Ask it to explain a
        selection, generate a function, or review a diff before you commit.
      </p>
      <InfoBox title="Info">
        The AI Assistant respects your workspace's <code>.c2xignore</code> file, so sensitive
        paths are never sent to the model.
      </InfoBox>

      <h2 id="collab-room">7. Create a Collaboration Room</h2>
      <p>
        Click the <strong>Share</strong> icon in the status bar to start a live session. Anyone with
        the generated link can join with read or write access.
      </p>
      <WarningBox title="Warning">
        Anyone with write access to a collaboration room can edit and run code in your workspace.
        Only share links with people you trust.
      </WarningBox>
    </DocPage>
  );
};

export default GettingStarted;
