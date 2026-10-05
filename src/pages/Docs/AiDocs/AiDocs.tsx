import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import NoteBox from "@/components/docs/NoteBox";
import WarningBox from "@/components/docs/WarningBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "overview", label: "Overview", depth: 2 },
  { id: "inline-completions", label: "Inline Ghost-Text Completions", depth: 2 },
  { id: "chat-panel", label: "AI Chat Side-Panel", depth: 2 },
  { id: "code-generation", label: "Generating Code & Tests", depth: 2 },
  { id: "privacy", label: "Privacy & .c2xignore Rules", depth: 2 },
  { id: "local-models", label: "Connecting Local Models (Ollama)", depth: 2 },
];

const AiDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="AI Assistant Guide"
      description="In-depth guide to C2X AI capabilities including inline completions, chat assistant, automated refactoring, privacy filters, and local LLM integration."
      breadcrumbLabel="AI Assistant"
      readingTime={9}
      tocEntries={tocEntries}
    >
      <h2 id="overview">Overview</h2>
      <p>
        The C2X AI Assistant acts as an intelligent pair programmer embedded inside your IDE. Unlike basic line completion tools, C2X indexes your entire workspace — parsing types, exported functions, and dependencies — to deliver contextually accurate suggestions.
      </p>

      <h2 id="inline-completions">Inline Ghost-Text Completions</h2>
      <p>
        As you write code or comment prompts, C2X displays ghost-text inline completions in light gray.
      </p>
      <ul>
        <li><code>Tab</code> — Accept full inline completion.</li>
        <li><code>Ctrl/Cmd + Right Arrow</code> — Accept next word of completion.</li>
        <li><code>Esc</code> — Dismiss current completion.</li>
      </ul>
      <CodeBlock
        language="typescript"
        filename="src/services/user.ts"
        code={`// Prompt comment: Create async function to fetch user profile with error handling
async function getUserProfile(userId: string): Promise<UserProfile> {
  const res = await fetch(\`/api/users/\${userId}\`);
  if (!res.ok) {
    throw new Error(\`Failed to fetch user \${userId}: \${res.statusText}\`);
  }
  return await res.json();
}`}
      />

      <h2 id="chat-panel">AI Chat Side-Panel</h2>
      <p>
        Toggle the AI Chat panel using <code>Ctrl/Cmd + Shift + A</code>. You can ask natural language questions, request explanations for complex functions, or ask for bug fixes on terminal errors.
      </p>

      <h2 id="code-generation">Generating Code & Tests</h2>
      <p>
        Select any function in the editor, right-click, and select <strong>C2X AI → Generate Unit Tests</strong>. The assistant scaffolds a test suite covering edge cases and boundary conditions.
      </p>
      <InfoBox title="Automated Refactoring">
        Use <strong>C2X AI → Refactor Selection</strong> to convert legacy callback code to modern async/await syntax or clean up complex nested conditionals.
      </InfoBox>

      <h2 id="privacy">Privacy & .c2xignore Rules</h2>
      <p>
        Protect sensitive files, API secrets, and private directories by adding a <code>.c2xignore</code> file to your repository root:
      </p>
      <CodeBlock
        language="bash"
        filename=".c2xignore"
        code={`.env
.env.local
secrets/
*.pem`}
      />
      <WarningBox title="Privacy Guarantee">
        C2X never uses your private source code to train public base AI models.
      </WarningBox>

      <h2 id="local-models">Connecting Local Models (Ollama)</h2>
      <p>
        For air-gapped or 100% offline environments, route C2X AI queries to a locally hosted Ollama or Llama 3 instance:
      </p>
      <CodeBlock
        language="json"
        filename=".c2x/settings.json"
        code={`{
  "ai.provider": "ollama",
  "ai.ollamaEndpoint": "http://localhost:11434",
  "ai.model": "codellama:13b"
}`}
      />
    </DocPage>
  );
};

export default AiDocs;
