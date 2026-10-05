import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import NoteBox from "@/components/docs/NoteBox";
import WarningBox from "@/components/docs/WarningBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "overview", label: "Overview", depth: 2 },
  { id: "creating-room", label: "Creating & Joining Rooms", depth: 2 },
  { id: "presence-cursors", label: "Presence & Follow Mode", depth: 2 },
  { id: "roles-permissions", label: "Roles & Workspace Permissions", depth: 2 },
  { id: "shared-terminal", label: "Shared Terminal Safety", depth: 2 },
];

const CollaborationDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="Collaboration Guide"
      description="Real-time multiplayer pair programming, shared workspaces, presence tracking, roles, and terminal permissions in C2X."
      breadcrumbLabel="Collaboration"
      readingTime={7}
      tocEntries={tocEntries}
    >
      <h2 id="overview">Overview</h2>
      <p>
        C2X includes native real-time multiplayer pair programming. Multiple developers can open the same project workspace and edit files concurrently with sub-50ms latency using Operational Transform (OT) state synchronization.
      </p>

      <h2 id="creating-room">Creating & Joining Rooms</h2>
      <h3>Starting a Session</h3>
      <p>
        Click the <strong>Share Session</strong> button in the top right header bar or execute <code>c2x room create</code> in the CLI. C2X generates a unique 6-digit room code and secure invitation link.
      </p>

      <h3>Joining a Session</h3>
      <p>
        Teammates can join by pasting the share link into their browser or entering the 6-digit code in C2X under <strong>File → Join Collaboration Room</strong>.
      </p>
      <CodeBlock
        language="bash"
        filename="CLI Join"
        code={`c2x room join 829-104`}
      />

      <h2 id="presence-cursors">Presence & Follow Mode</h2>
      <p>
        Every participant in the collaboration room is assigned a unique color avatar. Active cursors and text selections display in real time across the editor canvas.
      </p>
      <NoteBox title="Follow Mode">
        Click a teammate's avatar in the status bar to activate <strong>Follow Mode</strong>. Your viewport will automatically scroll to mirror their active file and cursor location.
      </NoteBox>

      <h2 id="roles-permissions">Roles & Workspace Permissions</h2>
      <p>
        Room owners can assign granular permissions to maintain security:
      </p>
      <ul>
        <li><strong>Owner:</strong> Full administrative rights to room configuration, participant management, and session ending.</li>
        <li><strong>Editor:</strong> Can edit files, run approved terminal commands, and initiate AI prompts.</li>
        <li><strong>Viewer:</strong> Read-only access to view code, follow cursors, and leave line comments.</li>
      </ul>

      <h2 id="shared-terminal">Shared Terminal Safety</h2>
      <p>
        Terminal sharing is permissions-gated. Room owners must explicitly enable terminal access for Editors before terminal commands can be run remotely.
      </p>
      <WarningBox title="Terminal Security">
        Only grant Editor or Terminal permissions to trusted teammates.
      </WarningBox>
    </DocPage>
  );
};

export default CollaborationDocs;
