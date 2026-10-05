import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "overview", label: "Overview", depth: 2 },
  { id: "authentication", label: "Authentication", depth: 2 },
  { id: "workspaces-api", label: "Workspace Endpoints", depth: 2 },
  { id: "collaboration-api", label: "Collaboration Session API", depth: 2 },
  { id: "ai-api", label: "AI Completion API", depth: 2 },
];

const ApiDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="API Reference"
      description="Programmatic REST and WebSocket API reference for C2X workspace management, collaboration sessions, and AI service integration."
      breadcrumbLabel="API"
      readingTime={8}
      tocEntries={tocEntries}
    >
      <h2 id="overview">Overview</h2>
      <p>
        The C2X REST and Real-Time WebSocket APIs enable developers and teams to manage workspace sessions, programmatically trigger AI completions, generate room invites, and integrate C2X with CI/CD pipelines.
      </p>

      <h2 id="authentication">Authentication</h2>
      <p>
        All HTTP requests require a Bearer token in the <code>Authorization</code> header. Obtain your API key from <code>Settings → Developer Tokens</code>.
      </p>
      <CodeBlock
        language="bash"
        filename="HTTP Request Header"
        code={`Authorization: Bearer c2x_pat_live_9f83a710bc281e4a`}
      />

      <h2 id="workspaces-api">Workspace Endpoints</h2>

      <h3>GET /v1/workspaces</h3>
      <p>Retrieve a list of all active workspaces associated with the authenticated account.</p>
      <CodeBlock
        language="json"
        filename="Response 200 OK"
        code={`{
  "object": "list",
  "data": [
    {
      "id": "ws_8f93a10e",
      "name": "Frontend Monorepo",
      "path": "/users/dev/projects/frontend",
      "created_at": 1774829100
    }
  ]
}`}
      />

      <h3>POST /v1/workspaces</h3>
      <p>Create a new cloud workspace directory from a template repository.</p>
      <CodeBlock
        language="json"
        filename="Request Payload"
        code={`{
  "name": "Backend API",
  "template": "express-typescript",
  "visibility": "private"
}`}
      />

      <h2 id="collaboration-api">Collaboration Session API</h2>

      <h3>POST /v1/collaboration/rooms</h3>
      <p>Programmatically initialize a real-time multiplayer room session and generate an invite code.</p>
      <CodeBlock
        language="json"
        filename="Response 201 Created"
        code={`{
  "room_id": "room_9921ab",
  "invite_code": "829-104",
  "share_url": "https://c2x.dev/join/room_9921ab",
  "max_users": 20
}`}
      />

      <h2 id="ai-api">AI Completion API</h2>

      <h3>POST /v1/ai/completions</h3>
      <p>Send a context payload to generate code completions or explanations.</p>
      <CodeBlock
        language="json"
        filename="Request Payload"
        code={`{
  "prompt": "Create a TypeScript interface for UserProfile",
  "language": "typescript",
  "max_tokens": 150
}`}
      />
    </DocPage>
  );
};

export default ApiDocs;
