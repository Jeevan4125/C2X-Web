import type { Author } from "@/types/blog";

export const AUTHORS: Author[] = [
  {
    id: "author1",
    name: "C2X Engineering",
    email: "engineering@c2x.dev",
    avatar: "https://placehold.co/200x200/007acc/ffffff?text=CE",
    initials: "CE",
    title: "Core Workbench Team",
    bio: "Technical engineering team focused on Monaco editor performance, syntax highlighting, and workspace navigation.",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://c2x.dev",
    createdAt: "2024-01-01",
  },
  {
    id: "author2",
    name: "C2X Systems",
    email: "systems@c2x.dev",
    avatar: "https://placehold.co/200x200/4ade80/ffffff?text=CS",
    initials: "CS",
    title: "Real-Time Collaboration Team",
    bio: "Engineers maintaining WebSocket synchronization protocols, operational transform algorithms, and Follow Mode.",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://c2x.dev",
    createdAt: "2024-02-15",
  },
  {
    id: "author3",
    name: "C2X AI Team",
    email: "ai@c2x.dev",
    avatar: "https://placehold.co/200x200/8b5cf6/ffffff?text=AI",
    initials: "AI",
    title: "AI & Context Intelligence",
    bio: "Research team developing workspace context mapping, ghost-text completions, and local model integrations.",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://c2x.dev",
    createdAt: "2024-03-01",
  },
];

export default AUTHORS;
