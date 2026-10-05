export interface DocSearchEntry {
  title: string;
  path: string;
  section: string;
  keywords: string[];
  excerpt: string;
}

export const DOCS_SEARCH_INDEX: DocSearchEntry[] = [
  {
    title: "Documentation Home",
    path: "/docs",
    section: "Overview",
    keywords: ["introduction", "home", "overview", "docs"],
    excerpt: "Everything you need to start building with C2X.",
  },
  {
    title: "Getting Started",
    path: "/docs/getting-started",
    section: "Getting Started",
    keywords: ["install", "launch", "workspace", "onboarding", "ai assistant", "collaboration room"],
    excerpt: "Install, launch the IDE, and create your first workspace.",
  },
  {
    title: "Installation",
    path: "/docs/installation",
    section: "Getting Started",
    keywords: ["windows", "macos", "linux", "portable", "system requirements", "troubleshooting"],
    excerpt: "Platform-specific installation steps and system requirements.",
  },
  {
    title: "Quick Start",
    path: "/docs/quick-start",
    section: "Getting Started",
    keywords: ["quick start", "git", "commit", "invite team", "run code"],
    excerpt: "A fast, step-by-step path from install to your first commit.",
  },
  {
    title: "User Guide",
    path: "/docs/user-guide",
    section: "Getting Started",
    keywords: [
      "explorer",
      "search",
      "editor",
      "split editor",
      "tabs",
      "terminal",
      "debugger",
      "problems",
      "output",
      "status bar",
      "settings",
    ],
    excerpt: "A tour of every panel in the C2X workbench.",
  },
  {
    title: "AI Assistant",
    path: "/docs/ai",
    section: "Features",
    keywords: [
      "ai",
      "generate code",
      "explain code",
      "refactor",
      "generate tests",
      "generate docs",
      "debug code",
      "translate code",
      "prompt",
    ],
    excerpt: "Generate, explain, refactor, test, document, debug, and translate code with AI.",
  },
  {
    title: "Collaboration",
    path: "/docs/collaboration",
    section: "Features",
    keywords: [
      "collaboration",
      "room",
      "permissions",
      "viewer mode",
      "voice",
      "video",
      "chat",
      "comments",
      "tasks",
      "conflict resolution",
    ],
    excerpt: "Work together in real time with live rooms, chat, and shared tasks.",
  },
  {
    title: "Extensions",
    path: "/docs/extensions",
    section: "Features",
    keywords: ["extensions", "marketplace", "install", "disable", "update", "remove", "publish", "manifest"],
    excerpt: "Browse the marketplace, manage installed extensions, and publish your own.",
  },
  {
    title: "Themes",
    path: "/docs/themes",
    section: "Features",
    keywords: ["themes", "theme json", "tokens", "fonts", "icons", "publish theme"],
    excerpt: "Author a custom color theme, package it, and publish it to the marketplace.",
  },
  {
    title: "API Documentation",
    path: "/docs/api",
    section: "Reference",
    keywords: [
      "api",
      "authentication",
      "workspace api",
      "editor api",
      "files api",
      "ai api",
      "collaboration api",
      "extensions api",
      "theme api",
      "rest",
      "error codes",
    ],
    excerpt: "REST endpoints for workspaces, the editor, files, AI, collaboration, and more.",
  },
  {
    title: "CLI",
    path: "/docs/cli",
    section: "Reference",
    keywords: ["cli", "c2x init", "c2x login", "c2x dev", "c2x build", "c2x deploy"],
    excerpt: "Command-line reference for scaffolding, running, building, and deploying.",
  },
  {
    title: "Keyboard Shortcuts",
    path: "/docs/shortcuts",
    section: "Reference",
    keywords: ["shortcuts", "keyboard", "command palette", "terminal", "search", "rename", "quick fix", "ai chat"],
    excerpt: "Every default keybinding in C2X, filterable by action and platform.",
  },
  {
    title: "Release Notes",
    path: "/releases",
    section: "Reference",
    keywords: ["release notes", "changelog", "version", "v2.0", "v1.2", "v1.1", "v1.0", "breaking changes"],
    excerpt: "What's new, improved, and fixed in every C2X release.",
  },
  {
    title: "Troubleshooting",
    path: "/docs/troubleshooting",
    section: "Support",
    keywords: [
      "troubleshooting",
      "installation issues",
      "terminal issues",
      "git issues",
      "ai issues",
      "performance",
      "network",
      "extension errors",
    ],
    excerpt: "Fixes for common installation, runtime, and performance problems.",
  },
  {
    title: "FAQ",
    path: "/docs/faq",
    section: "Support",
    keywords: ["faq", "questions", "billing", "pricing", "offline"],
    excerpt: "Answers to common questions about C2X.",
  },
];

export const searchDocs = (query: string): DocSearchEntry[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DOCS_SEARCH_INDEX.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.excerpt.toLowerCase().includes(q) ||
      entry.keywords.some((k) => k.includes(q))
    );
  });
};
