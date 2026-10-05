interface Tag {
  id: string;
  label: string;
  color: string;
  icon?: string;
}

export const TAGS: Tag[] = [
  { id: "release", label: "Release", color: "#007acc", icon: "🚀" },
  { id: "features", label: "Features", color: "#8b5cf6", icon: "⚡" },
  { id: "collaboration", label: "Collaboration", color: "#4ade80", icon: "🤝" },
  { id: "ai", label: "AI", color: "#06b6d4", icon: "🤖" },
  { id: "teams", label: "Teams", color: "#f59e0b", icon: "👥" },
  { id: "workflow", label: "Workflow", color: "#8b5cf6", icon: "🔄" },
  { id: "real-time", label: "Real-Time", color: "#14b8a6", icon: "⚡" },
  { id: "productivity", label: "Productivity", color: "#4ade80", icon: "📈" },
  { id: "automation", label: "Automation", color: "#f43f5e", icon: "🤖" },
  { id: "extensions", label: "Extensions", color: "#8b5cf6", icon: "🧩" },
  { id: "development", label: "Development", color: "#3b82f6", icon: "💻" },
  { id: "api", label: "API", color: "#06b6d4", icon: "🔌" },
  { id: "customization", label: "Customization", color: "#f59e0b", icon: "🎨" },
  { id: "security", label: "Security", color: "#ef4444", icon: "🔒" },
  {
    id: "best-practices",
    label: "Best Practices",
    color: "#4ade80",
    icon: "✅",
  },
  { id: "analysis", label: "Analysis", color: "#8b5cf6", icon: "📊" },
  {
    id: "vulnerabilities",
    label: "Vulnerabilities",
    color: "#ef4444",
    icon: "⚠️",
  },
  { id: "optimization", label: "Optimization", color: "#14b8a6", icon: "📉" },
  { id: "profiling", label: "Profiling", color: "#f59e0b", icon: "📊" },
  { id: "debugging", label: "Debugging", color: "#06b6d4", icon: "🐛" },
  { id: "code-review", label: "Code Review", color: "#4ade80", icon: "👀" },
  { id: "quality", label: "Quality", color: "#8b5cf6", icon: "⭐" },
  { id: "comparison", label: "Comparison", color: "#f59e0b", icon: "⚖️" },
  { id: "assistant", label: "Assistant", color: "#14b8a6", icon: "🤖" },
];
