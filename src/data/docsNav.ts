import {
  BookOpen,
  Rocket,
  Terminal,
  User,
  Code2,
  Bot,
  Users,
  Puzzle,
  Palette,
  Command,
  Keyboard,
  HelpCircle,
  LayoutGrid,
} from "lucide-react";

export interface DocsNavItem {
  path: string;
  label: string;
  icon: any;
  available: boolean;
}

export interface DocsNavSection {
  id: string;
  label: string;
  items: DocsNavItem[];
}

export const DOCS_NAV: DocsNavSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    items: [
      { path: "/docs", label: "Introduction", icon: BookOpen, available: true },
      {
        path: "/docs/installation",
        label: "Installation",
        icon: Terminal,
        available: true,
      },
      {
        path: "/docs/quick-start",
        label: "Quick Start",
        icon: Rocket,
        available: true,
      },
      {
        path: "/docs/user-guide",
        label: "User Guide",
        icon: User,
        available: true,
      },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    items: [
      { path: "/docs/api", label: "API", icon: Code2, available: true },
      { path: "/docs/ai", label: "AI Assistant", icon: Bot, available: true },
      {
        path: "/docs/collaboration",
        label: "Collaboration",
        icon: Users,
        available: true,
      },
      {
        path: "/docs/extensions",
        label: "Extensions",
        icon: Puzzle,
        available: true,
      },
      { path: "/docs/themes", label: "Themes", icon: Palette, available: true },
      { path: "/docs/cli", label: "CLI", icon: Command, available: true },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      {
        path: "/docs/shortcuts",
        label: "Keyboard Shortcuts",
        icon: Keyboard,
        available: true,
      },
      {
        path: "/docs/troubleshooting",
        label: "Troubleshooting",
        icon: HelpCircle,
        available: true,
      },
      { path: "/docs/faq", label: "FAQ", icon: HelpCircle, available: true },
    ],
  },
];

export const getAdjacentDocs = (currentPath: string) => {
  const allItems = DOCS_NAV.flatMap((section) => section.items);
  const currentIndex = allItems.findIndex((item) => item.path === currentPath);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return { prev, next };
};
