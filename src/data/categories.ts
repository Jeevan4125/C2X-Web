interface Category {
  id: string;
  label: string;
  description: string;
  color: string;
  icon?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "announcements",
    label: "Announcements",
    description: "Official news and announcements from the C2X team",
    color: "#007acc",
    icon: "📢",
  },
  {
    id: "tutorials",
    label: "Tutorials",
    description: "Step-by-step guides and tutorials for building with C2X",
    color: "#4ade80",
    icon: "📚",
  },
  {
    id: "guides",
    label: "Guides",
    description: "Comprehensive guides on various development topics",
    color: "#f59e0b",
    icon: "📖",
  },
  {
    id: "features",
    label: "Features",
    description: "Deep dives into C2X's features",
    color: "#8b5cf6",
    icon: "⚡",
  },
  {
    id: "security",
    label: "Security",
    description: "Security best practices and vulnerability analysis",
    color: "#ef4444",
    icon: "🔒",
  },
  {
    id: "community",
    label: "Community",
    description: "Community guides and contributions",
    color: "#ec4899",
    icon: "🌟",
  },
  {
    id: "releases",
    label: "Releases",
    description: "Release notes and version updates",
    color: "#14b8a6",
    icon: "🚀",
  },
];
