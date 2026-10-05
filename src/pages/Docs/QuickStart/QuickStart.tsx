import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import NoteBox from "@/components/docs/NoteBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "create-project", label: "1. Create or Open a Project", depth: 2 },
  { id: "editor-basics", label: "2. Editor Basics & IntelliSense", depth: 2 },
  { id: "ai-assistant", label: "3. Leverage AI Coding Assistance", depth: 2 },
  { id: "terminal-run", label: "4. Run Commands in Terminal", depth: 2 },
  { id: "debug-code", label: "5. Debugging & Breakpoints", depth: 2 },
  { id: "collaboration", label: "6. Launch a Collaboration Room", depth: 2 },
];

const QuickStart = (): React.ReactElement => {
  return (
    <DocPage
      title="Quick Start Guide"
      description="Get up and running with C2X in 5 minutes — from project creation and AI assistance to live multiplayer collaboration."
      breadcrumbLabel="Quick Start"
      readingTime={6}
      tocEntries={tocEntries}
    >
      <h2 id="create-project">1. Create or Open a Project</h2>
      <p>
        Launch C2X and open an existing repository or create a new workspace using <strong>File → Open Folder</strong> (<code>Ctrl/Cmd + O</code>) or the CLI terminal:
      </p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# Open any folder in C2X
c2x ./my-web-project`}
      />

      <h2 id="editor-basics">2. Editor Basics & IntelliSense</h2>
      <p>
        Begin typing in any TypeScript, JavaScript, Python, or Go file. C2X provides real-time Monaco IntelliSense with parameter hints, auto-imports, and instant type definitions.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/index.ts"
        code={`import { createServer } from "http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "online", timestamp: Date.now() }));
});

server.listen(3000, () => console.log("Server running on port 3000"));`}
      />

      <h2 id="ai-assistant">3. Leverage AI Coding Assistance</h2>
      <p>
        Press <code>Ctrl/Cmd + Shift + A</code> to toggle the AI Assistant side panel. Ask questions about your code, or highlight a function and press <code>Tab</code> to accept inline ghost-text completions.
      </p>
      <NoteBox title="Context Awareness">
        C2X AI indexes your active workspace files so answers match your project architecture and variable names.
      </NoteBox>

      <h2 id="terminal-run">4. Run Commands in Terminal</h2>
      <p>
        Toggle the integrated terminal with <code>Ctrl/Cmd + `</code>. Execute dev servers, install npm packages, or run tests without leaving your editor.
      </p>
      <CodeBlock
        language="bash"
        filename="Integrated Terminal"
        code={`npm install
npm run dev`}
      />

      <h2 id="debug-code">5. Debugging & Breakpoints</h2>
      <p>
        Set breakpoints by clicking the margin gutter next to line numbers. Press <code>F5</code> to launch the debugger, step through execution frames, and inspect live variables.
      </p>

      <h2 id="collaboration">6. Launch a Collaboration Room</h2>
      <p>
        Click the <strong>Share Session</strong> button in the header bar to generate an instant 6-digit invite room code. Send the link to teammates to pair-program live with shared cursors!
      </p>
      <InfoBox title="Multiplayer Editing">
        Collaborators join directly without needing local project setup or Git cloning.
      </InfoBox>
    </DocPage>
  );
};

export default QuickStart;
