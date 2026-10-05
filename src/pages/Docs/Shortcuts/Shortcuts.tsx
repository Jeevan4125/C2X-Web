import DocPage from "@/components/docs/DocPage";
import ShortcutTable, { type ShortcutGroup } from "@/components/docs/ShortcutTable";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "general", label: "General & Workbench", depth: 2 },
  { id: "editing", label: "Code Editing", depth: 2 },
  { id: "navigation", label: "Navigation & Search", depth: 2 },
  { id: "ai-collab", label: "AI & Collaboration", depth: 2 },
];

const GENERAL_GROUPS: ShortcutGroup[] = [
  {
    category: "General & Workbench",
    shortcuts: [
      { action: "Command Palette", windows: "Ctrl + Shift + P", macos: "Cmd + Shift + P", linux: "Ctrl + Shift + P" },
      { action: "Open File", windows: "Ctrl + O", macos: "Cmd + O", linux: "Ctrl + O" },
      { action: "Save File", windows: "Ctrl + S", macos: "Cmd + S", linux: "Ctrl + S" },
      { action: "Toggle Terminal", windows: "Ctrl + `", macos: "Cmd + `", linux: "Ctrl + `" },
      { action: "Toggle Sidebar", windows: "Ctrl + B", macos: "Cmd + B", linux: "Ctrl + B" },
    ],
  },
];

const EDITING_GROUPS: ShortcutGroup[] = [
  {
    category: "Code Editing",
    shortcuts: [
      { action: "Multi-Cursor Add", windows: "Alt + Click", macos: "Option + Click", linux: "Alt + Click" },
      { action: "Add Cursor Above", windows: "Ctrl + Alt + Up", macos: "Cmd + Option + Up", linux: "Ctrl + Alt + Up" },
      { action: "Add Cursor Below", windows: "Ctrl + Alt + Down", macos: "Cmd + Option + Down", linux: "Ctrl + Alt + Down" },
      { action: "Format Document", windows: "Shift + Alt + F", macos: "Shift + Option + F", linux: "Shift + Alt + F" },
      { action: "Toggle Comment", windows: "Ctrl + /", macos: "Cmd + /", linux: "Ctrl + /" },
    ],
  },
];

const NAVIGATION_GROUPS: ShortcutGroup[] = [
  {
    category: "Navigation & Search",
    shortcuts: [
      { action: "Quick File Search", windows: "Ctrl + P", macos: "Cmd + P", linux: "Ctrl + P" },
      { action: "Global Text Search", windows: "Ctrl + Shift + F", macos: "Cmd + Shift + F", linux: "Ctrl + Shift + F" },
      { action: "Go to Line", windows: "Ctrl + G", macos: "Cmd + G", linux: "Ctrl + G" },
      { action: "Go to Definition", windows: "F12", macos: "F12", linux: "F12" },
    ],
  },
];

const AI_GROUPS: ShortcutGroup[] = [
  {
    category: "AI & Collaboration",
    shortcuts: [
      { action: "Toggle AI Assistant", windows: "Ctrl + Shift + A", macos: "Cmd + Shift + A", linux: "Ctrl + Shift + A" },
      { action: "Explain Code", windows: "Ctrl + Shift + E", macos: "Cmd + Shift + E", linux: "Ctrl + Shift + E" },
      { action: "Accept AI Suggestion", windows: "Tab", macos: "Tab", linux: "Tab" },
      { action: "Share Room", windows: "Ctrl + Shift + L", macos: "Cmd + Shift + L", linux: "Ctrl + Shift + L" },
    ],
  },
];

const Shortcuts = (): React.ReactElement => {
  return (
    <DocPage
      title="Keyboard Shortcuts"
      description="Complete keyboard bindings reference for Windows, Linux, and macOS across workbench navigation, editing, AI, and collaboration."
      breadcrumbLabel="Shortcuts"
      readingTime={6}
      tocEntries={tocEntries}
    >
      <h2 id="general">General & Workbench</h2>
      <ShortcutTable groups={GENERAL_GROUPS} />

      <h2 id="editing">Code Editing</h2>
      <ShortcutTable groups={EDITING_GROUPS} />

      <h2 id="navigation">Navigation & Search</h2>
      <ShortcutTable groups={NAVIGATION_GROUPS} />

      <h2 id="ai-collab">AI & Collaboration</h2>
      <ShortcutTable groups={AI_GROUPS} />
    </DocPage>
  );
};

export default Shortcuts;
