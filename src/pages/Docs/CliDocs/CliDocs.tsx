import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "installation", label: "CLI Installation", depth: 2 },
  { id: "commands", label: "Command Reference", depth: 2 },
  { id: "workspaces", label: "Workspace & Project Commands", depth: 2 },
  { id: "collaboration", label: "Collaboration & Remote Commands", depth: 2 },
];

const CliDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="CLI Command Reference"
      description="Full command-line reference for controlling C2X from terminal workflows, scripts, and CI/CD pipelines."
      breadcrumbLabel="CLI"
      readingTime={6}
      tocEntries={tocEntries}
    >
      <h2 id="installation">CLI Installation</h2>
      <p>
        The <code>c2x</code> command-line executable is automatically installed alongside C2X desktop releases. You can also install the stand-alone binary via Homebrew, Winget, or npm:
      </p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# npm global install
npm install -g @c2x/cli

# Verify version
c2x --version`}
      />

      <h2 id="commands">Command Reference</h2>

      <h3 id="workspaces">c2x open [directory]</h3>
      <p>Launch C2X and open the specified project directory as the active workspace.</p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# Open current directory
c2x .

# Open specific folder
c2x ~/projects/my-web-app`}
      />

      <h3>c2x init [template]</h3>
      <p>Initialize a new project scaffold pre-configured with C2X linter and workspace settings.</p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`c2x init react-ts my-new-app`}
      />

      <h3 id="collaboration">c2x room create</h3>
      <p>Initialize a real-time collaboration room directly from the CLI and print the share URL.</p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`c2x room create --role editor`}
      />

      <h3>c2x room join &lt;room-code&gt;</h3>
      <p>Join an active multiplayer room session directly by code.</p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`c2x room join 829-104`}
      />
    </DocPage>
  );
};

export default CliDocs;
