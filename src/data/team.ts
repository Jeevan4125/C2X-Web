import type { TeamMember } from "@/types/team";

export const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Core Editor Engineering",
    role: "Workbench & Monaco Integration",
    avatar: "https://placehold.co/200x200/007acc/ffffff?text=CE",
    bio: "Focuses on editor performance, syntax highlighting, multi-cursor responsiveness, and workspace file indexing.",
    leadership: true,
    socials: {
      github: "https://github.com",
    },
  },
  {
    id: "2",
    name: "Collaboration Systems",
    role: "Real-Time Sync Engine",
    avatar: "https://placehold.co/200x200/4ade80/ffffff?text=CS",
    bio: "Maintains Operational Transform algorithms, WebSocket state replication, presence tracking, and Follow Mode.",
    leadership: true,
    socials: {
      github: "https://github.com",
    },
  },
  {
    id: "3",
    name: "AI & Context Engineering",
    role: "Language Model Workspace Integration",
    avatar: "https://placehold.co/200x200/8b5cf6/ffffff?text=AI",
    bio: "Develops workspace semantic embedding maps, ghost-text completions, prompt sandboxing, and local LLM provider adapters.",
    leadership: true,
    socials: {
      github: "https://github.com",
    },
  },
  {
    id: "4",
    name: "DevTools & Extensions",
    role: "Terminal, Debugger & Extension SDK",
    avatar: "https://placehold.co/200x200/f59e0b/ffffff?text=DX",
    bio: "Builds the integrated multi-pane shell, debugger adapter protocols, and VS Code API extension runner.",
    leadership: true,
    socials: {
      github: "https://github.com",
    },
  },
];
