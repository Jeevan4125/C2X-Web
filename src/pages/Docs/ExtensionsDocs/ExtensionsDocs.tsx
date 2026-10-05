import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "overview", label: "Overview", depth: 2 },
  { id: "marketplace", label: "Browsing & Installing Extensions", depth: 2 },
  { id: "workspace-scope", label: "Workspace Scoped Extensions", depth: 2 },
  { id: "developing-extensions", label: "Building Custom Extensions", depth: 2 },
];

const ExtensionsDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="Extensions Guide"
      description="Learn how to install, configure, and develop custom extensions for C2X using the open VS Code extension API specification."
      breadcrumbLabel="Extensions"
      readingTime={8}
      tocEntries={tocEntries}
    >
      <h2 id="overview">Overview</h2>
      <p>
        C2X features a built-in Extension Marketplace compatible with the open VS Code Extension API. You can install existing language servers, debuggers, formatters, syntax highlighters, and AI extensions directly into your workspace.
      </p>

      <h2 id="marketplace">Browsing & Installing Extensions</h2>
      <p>
        Click the <strong>Extensions</strong> icon in the left activity bar (<code>Ctrl/Cmd + Shift + X</code>) to open the Marketplace. Search by extension name, publisher tag, or category filter (Languages, Themes, Debugging, AI Tools).
      </p>
      <ul>
        <li>Click <strong>Install</strong> to download and activate the extension without restarting C2X.</li>
        <li>Extensions run in isolated worker threads to protect main editor UI responsiveness.</li>
      </ul>

      <h2 id="workspace-scope">Workspace Scoped Extensions</h2>
      <p>
        To prevent extension bloat across unrelated projects, C2X allows enabling or disabling extensions on a per-workspace basis.
      </p>
      <CodeBlock
        language="json"
        filename=".c2x/extensions.json"
        code={`{
  "recommendations": [
    "c2x.python-intellisense",
    "c2x.docker-debugger",
    "rust-lang.rust-analyzer"
  ]
}`}
      />

      <h2 id="developing-extensions">Building Custom Extensions</h2>
      <p>
        Create custom developer tools using TypeScript and the C2X Extension API:
      </p>
      <CodeBlock
        language="typescript"
        filename="src/extension.ts"
        code={`import * as c2x from "@c2x/extension-sdk";

export function activate(context: c2x.ExtensionContext) {
  const disposable = c2x.commands.registerCommand("myExt.sayHello", () => {
    c2x.window.showInformationMessage("Hello from C2X Extension!");
  });

  context.subscriptions.push(disposable);
}`}
      />
      <InfoBox title="Extension SDK">
        Install the official SDK via npm: <code>npm install --save-dev @c2x/extension-sdk</code>.
      </InfoBox>
    </DocPage>
  );
};

export default ExtensionsDocs;
