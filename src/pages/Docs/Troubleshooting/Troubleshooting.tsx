import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import WarningBox from "@/components/docs/WarningBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "terminal", label: "Terminal Launch Issues", depth: 2 },
  { id: "lsp", label: "Language Server & IntelliSense", depth: 2 },
  { id: "collaboration", label: "Collaboration & WebSockets", depth: 2 },
  { id: "ai", label: "AI Proxy Timeouts", depth: 2 },
  { id: "reset", label: "Resetting Workspace Cache", depth: 2 },
];

const Troubleshooting = (): React.ReactElement => {
  return (
    <DocPage
      title="Troubleshooting Guide"
      description="Solutions for common workspace issues including terminal failures, language server crashes, WebSocket disconnects, and AI proxy timeouts."
      breadcrumbLabel="Troubleshooting"
      readingTime={7}
      tocEntries={tocEntries}
    >
      <h2 id="terminal">Terminal Launch Issues</h2>
      <h3>Problem: Integrated terminal fails to spawn shell process</h3>
      <p>
        If the bottom terminal pane displays a blank screen or outputs a <code>POSIX spawn failed</code> error, C2X cannot locate your default system shell path.
      </p>
      <p><strong>Solution:</strong> Open <code>Settings → Terminal → Default Shell</code> and explicitly set your shell binary path:</p>
      <ul>
        <li>macOS/Linux: <code>/bin/zsh</code> or <code>/bin/bash</code></li>
        <li>Windows: <code>C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe</code> or WSL <code>wsl.exe</code></li>
      </ul>

      <h2 id="lsp">Language Server & IntelliSense</h2>
      <h3>Problem: Autocomplete stops working or shows high CPU usage</h3>
      <p>
        Large <code>node_modules</code> directories or unindexed build outputs can saturate the language server worker thread.
      </p>
      <p><strong>Solution:</strong> Ensure <code>node_modules</code>, <code>dist</code>, and <code>build</code> directories are included in your <code>.c2xignore</code> file:</p>
      <CodeBlock
        language="bash"
        filename=".c2xignore"
        code={`node_modules/
dist/
.git/
*.log`}
      />

      <h2 id="collaboration">Collaboration & WebSockets</h2>
      <h3>Problem: Multiplayer room disconnects frequently or fails to sync edits</h3>
      <p>
        Corporate firewalls or strict VPN proxies can block WebSocket connections over port 443.
      </p>
      <p><strong>Solution:</strong> Enable WebSocket fallback in settings: set <code>"collaboration.transport": "polling-fallback"</code> in <code>settings.json</code>.</p>

      <h2 id="ai">AI Proxy Timeouts</h2>
      <h3>Problem: AI completions time out after 10 seconds</h3>
      <p>
        Network latency or large workspace context payloads can cause API gateway timeout limits to trigger.
      </p>
      <p><strong>Solution:</strong> Reduce active file context size by closing irrelevant background editor tabs or configure a custom API endpoint for local Ollama instances.</p>

      <h2 id="reset">Resetting Workspace Cache</h2>
      <p>
        If workspace state becomes corrupted, you can clear the local index cache without losing source files:
      </p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`c2x --clear-cache`}
      />
      <WarningBox title="Cache Reset">
        Clearing cache rebuilds the workspace symbol map. This may take 10–30 seconds on large monorepos.
      </WarningBox>
    </DocPage>
  );
};

export default Troubleshooting;
