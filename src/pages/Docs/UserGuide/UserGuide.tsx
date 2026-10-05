import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "explorer", label: "Workspace Explorer", depth: 2 },
  { id: "editor", label: "Monaco Editor Features", depth: 2 },
  { id: "productivity", label: "Editing Productivity", depth: 2 },
  { id: "terminal", label: "Integrated Terminal", depth: 2 },
  { id: "ai", label: "AI Assistant Panel", depth: 2 },
  { id: "collaboration", label: "Multiplayer Collaboration", depth: 2 },
  { id: "settings", label: "Workspace Settings", depth: 2 },
];

const UserGuide = (): React.ReactElement => {
  return (
    <DocPage
      title="User Guide"
      description="A complete guide to navigating and using the C2X workbench, editor, terminal, AI panel, and collaboration tools."
      breadcrumbLabel="User Guide"
      readingTime={10}
      tocEntries={tocEntries}
    >
      <h2 id="explorer">Workspace Explorer</h2>
      <p>
        The Explorer panel on the left sidebar provides full file system navigation for your active project. You can create, rename, duplicate, and delete files or folders, and drag-and-drop files across directories.
      </p>
      <ul>
        <li><code>Ctrl/Cmd + P</code> — Quick File Open by fuzzy name search.</li>
        <li><code>Ctrl/Cmd + Shift + F</code> — Full workspace multi-file text search with regex support.</li>
        <li><code>Right-Click</code> — Context menu for Git staging, copy path, and AI analysis.</li>
      </ul>

      <h2 id="editor">Monaco Editor Features</h2>
      <p>
        Powered by the industry-standard Monaco engine, C2X provides rich IntelliSense autocomplete, parameter hints, type definitions, and syntax diagnostics across 50+ languages.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/example.ts"
        code={`// IntelliSense active
interface User {
  id: string;
  name: string;
  role: "admin" | "developer";
}

function printUser(user: User): void {
  console.log(\`User \${user.name} [\${user.role}]\`);
}`}
      />

      <h2 id="productivity">Editing Productivity</h2>
      <p>
        Boost coding velocity with multi-cursor editing, line transposition, and instant formatting:
      </p>
      <ul>
        <li><code>Alt + Click</code> (macOS: <code>Option + Click</code>) — Add additional cursor.</li>
        <li><code>Ctrl/Cmd + Alt + Up/Down</code> — Add cursor above or below.</li>
        <li><code>Shift + Alt + F</code> — Format current document using configured formatter (e.g. Prettier).</li>
        <li><code>Ctrl/Cmd + /</code> — Toggle line or block comments.</li>
      </ul>

      <h2 id="terminal">Integrated Terminal</h2>
      <p>
        C2X includes a full multi-tab terminal panel built into the bottom container. You can run dev servers, execute test scripts, install npm/pip/cargo packages, and inspect CLI output without switching application windows.
      </p>
      <InfoBox title="Multi-Pane Shells">
        Click the split terminal icon to view two shell sessions side-by-side (e.g., frontend server on left, backend API on right).
      </InfoBox>

      <h2 id="ai">AI Assistant Panel</h2>
      <p>
        Press <code>Ctrl/Cmd + Shift + A</code> to toggle the AI Assistant side panel. Ask questions about your code, generate functions from plain language instructions, or request automated unit tests for active selections.
      </p>

      <h2 id="collaboration">Multiplayer Collaboration</h2>
      <p>
        Click the <strong>Share Session</strong> icon in the header bar to launch a multiplayer room. Invite teammates with a 6-digit code to pair program live with shared cursors, live selection highlights, and in-editor chat.
      </p>

      <h2 id="settings">Workspace Settings</h2>
      <p>
        Customize C2X behavior, font family, tab size, line height, auto-save delay, and color themes in <code>File → Settings</code> or by editing <code>.c2x/settings.json</code> directly.
      </p>
    </DocPage>
  );
};

export default UserGuide;
