import {
  Brain,
  Code2,
  GitBranch,
  Bug,
  Container,
  Terminal,
  Sparkles,
  Zap,
  Shield,
  Users,
  Clock,
  RefreshCw,
  Globe,
  Server,
  Database,
  Layers,
  Cpu,
  Cloud,
  Lock,
  GitMerge,
  Play,
  Wrench,
  Settings,
  Box,
  Link2,
  Monitor,
  Command,
  FileCode,
  Github,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  id: string;
  slug: string;
  name: string;
  icon: LucideIcon;
  category: string;
  description: string;
  longDescription: string;
  benefits: string[];
  keyFeatures: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  codeExample: {
    language: string;
    code: string;
    caption?: string;
  };
  screenshots: string[];
  workflow: {
    step: number;
    title: string;
    description: string;
  }[];
  specifications: {
    performance: string;
    platforms: string[];
    requirements: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedFeatures: string[];
  ctaLabel: string;
}

export const FEATURES: Feature[] = [
  {
    id: "1",
    slug: "ai-coding",
    name: "AI-Powered Coding",
    icon: Brain,
    category: "Intelligence",
    description:
      "Write code faster with intelligent completions and suggestions powered by developer-controlled AI.",
    longDescription:
      "C2X's AI coding assistant understands your active workspace context and provides intelligent completions, refactoring suggestions, and generates functions from natural language prompts. It adapts to your project conventions and helps streamline repetitive coding tasks.",
    benefits: [
      "Contextual inline ghost-text completions",
      "Reduced context switching across files",
      "Automatic docstring and comment generation",
      "Intelligent refactoring and test scaffolding",
    ],
    keyFeatures: [
      {
        title: "Smart Completions",
        description:
          "Get context-aware completions that understand your project structure and active imports.",
        icon: Sparkles,
      },
      {
        title: "Natural Language Prompts",
        description:
          "Describe what you need in plain language and review AI-generated suggestions.",
        icon: Brain,
      },
      {
        title: "Intelligent Refactoring",
        description:
          "Restructure legacy code patterns with automated refactoring suggestions.",
        icon: RefreshCw,
      },
      {
        title: "Workspace Privacy",
        description:
          "Private code context sandboxing ensuring code is never stored for public AI training.",
        icon: Shield,
      },
    ],
    codeExample: {
      language: "typescript",
      code: `// Type this prompt comment and press Tab
// Create a function that fetches user data from an API

async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  const data = await response.json();
  return data;
}`,
      caption: "AI code generation in action",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=AI+Coding+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=AI+Coding+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Start Typing",
        description: "Begin writing code or a prompt comment.",
      },
      {
        step: 2,
        title: "AI Suggests",
        description: "The AI provides inline ghost-text completions.",
      },
      {
        step: 3,
        title: "Review & Accept",
        description: "Review suggestions and press Tab to accept.",
      },
      {
        step: 4,
        title: "Validate & Test",
        description: "Test and verify generated code in the workspace.",
      },
    ],
    specifications: {
      performance: "Optimized streaming completions",
      platforms: ["Web", "macOS", "Windows", "Linux"],
      requirements: ["Node.js 18+", "Modern browser", "Internet or local Ollama"],
    },
    faqs: [
      {
        question: "Is my code private when using AI features?",
        answer:
          "Yes. Your workspace code is processed securely over encrypted connections and is never used to train public base LLM models.",
      },
      {
        question: "Which programming languages does the AI support?",
        answer:
          "The AI supports all major languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, HTML, CSS, SQL, and Shell.",
      },
      {
        question: "Can I use local LLM models offline?",
        answer:
          "Yes. C2X supports local Ollama endpoints for 100% offline AI development.",
      },
    ],
    relatedFeatures: ["monaco-editor", "git-integration", "debugger"],
    ctaLabel: "Try AI Coding",
  },
  {
    id: "2",
    slug: "monaco-editor",
    name: "Monaco Editor",
    icon: Code2,
    category: "Editor",
    description:
      "Experience the power of VS Code's editor kernel with full IntelliSense.",
    longDescription:
      "The Monaco Editor kernel powers C2X's editing experience. It provides syntax highlighting, IntelliSense, code navigation, and multi-cursor editing in a responsive workbench.",
    benefits: [
      "Full IntelliSense support",
      "Syntax highlighting for 50+ languages",
      "Responsive keystroke processing",
      "Customizable dark, light, and high-contrast themes",
      "Multi-cursor editing and column selection",
    ],
    keyFeatures: [
      {
        title: "IntelliSense",
        description:
          "Get smart completions with parameter hints and type documentation.",
        icon: Sparkles,
      },
      {
        title: "Multi-Cursor Editing",
        description:
          "Edit multiple lines simultaneously with multi-cursor shortcuts.",
        icon: Users,
      },
      {
        title: "Syntax Highlighting",
        description:
          "Rich syntax highlighting for major programming languages.",
        icon: Code2,
      },
      {
        title: "Custom Themes",
        description: "Select from curated themes or customize via JSON.",
        icon: Zap,
      },
    ],
    codeExample: {
      language: "javascript",
      code: `// The Monaco Editor provides full IntelliSense
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

// Multi-cursor editing: Press Alt+Click to add cursors`,
      caption: "Monaco Editor in action",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Monaco+Editor+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Monaco+Editor+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Open File",
        description: "Open any file in the workspace explorer.",
      },
      {
        step: 2,
        title: "Start Editing",
        description: "Begin typing with full IntelliSense support.",
      },
      {
        step: 3,
        title: "Navigate Code",
        description: "Use go-to-definition and symbol search.",
      },
      {
        step: 4,
        title: "Save & Commit",
        description: "Save changes and sync version control.",
      },
    ],
    specifications: {
      performance: "Designed for a responsive development workflow",
      platforms: ["Web", "macOS", "Windows", "Linux"],
      requirements: ["Modern browser", "4GB RAM minimum"],
    },
    faqs: [
      {
        question: "Is the Monaco Editor free to use?",
        answer:
          "Yes, the Monaco Editor kernel is open-source and free for development.",
      },
      {
        question: "Can I add custom extensions?",
        answer:
          "Yes, C2X supports extensions built with the open VS Code extension API.",
      },
      {
        question: "Does it work offline?",
        answer: "Yes, local code editing works 100% offline.",
      },
    ],
    relatedFeatures: ["ai-coding", "git-integration", "debugger"],
    ctaLabel: "Try Editor",
  },
  {
    id: "3",
    slug: "git-integration",
    name: "Git Integration",
    icon: GitBranch,
    category: "Version Control",
    description:
      "Seamless Git workflow with visual diff, branch management, and conflict resolution.",
    longDescription:
      "C2X's Git integration brings version control directly into your IDE. Visual diff tools, conflict resolution, branch switching, and commit tracking are accessible from the sidebar.",
    benefits: [
      "Visual side-by-side diff highlighting",
      "Branch management and switching",
      "Commit history visualization",
      "Conflict resolution tools",
      "Pull request reviews",
    ],
    keyFeatures: [
      {
        title: "Visual Diff",
        description:
          "Inspect staged and unstaged changes side-by-side.",
        icon: GitBranch,
      },
      {
        title: "Branch Management",
        description: "Create, switch, and merge branches with ease.",
        icon: RefreshCw,
      },
      {
        title: "Pull Request Support",
        description: "Review pull requests directly within the editor.",
        icon: Shield,
      },
      {
        title: "Commit History",
        description: "Visualize repository commit history.",
        icon: Clock,
      },
    ],
    codeExample: {
      language: "bash",
      code: `# Git commands integrated into C2X
git checkout -b feature/awesome
git add .
git commit -m "Add feature"
git push origin feature/awesome`,
      caption: "Git workflow in C2X",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Git+Integration+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Git+Integration+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Clone Repository",
        description: "Clone your repository into C2X.",
      },
      {
        step: 2,
        title: "Create Branch",
        description: "Create a feature branch.",
      },
      {
        step: 3,
        title: "Make Changes",
        description: "Edit files and stage changes.",
      },
      {
        step: 4,
        title: "Push & PR",
        description: "Commit and push changes to remote.",
      },
    ],
    specifications: {
      performance: "Optimized repository indexing",
      platforms: ["Web", "macOS", "Windows", "Linux"],
      requirements: ["Git 2.0+", "Modern browser"],
    },
    faqs: [
      {
        question: "Does it support GitHub, GitLab, and Bitbucket?",
        answer:
          "Yes, C2X integrates with major Git providers including GitHub, GitLab, and Bitbucket.",
      },
      {
        question: "Can I use Git hooks?",
        answer: "Yes, standard Git hooks execute seamlessly.",
      },
    ],
    relatedFeatures: ["ai-coding", "monaco-editor", "debugger"],
    ctaLabel: "Try Git Integration",
  },
  {
    id: "4",
    slug: "debugger",
    name: "Built-in Debugger",
    icon: Bug,
    category: "Debugging",
    description:
      "Debug application code with breakpoints, watch variables, and interactive console.",
    longDescription:
      "The C2X debugger provides an integrated debugging experience with breakpoints, variable inspection, call stack navigation, and an interactive evaluation console.",
    benefits: [
      "Breakpoint debugging in margin gutter",
      "Variable inspection and watch panel",
      "Interactive evaluation console",
      "Call stack frame inspection",
      "Step over, step into, step out controls",
    ],
    keyFeatures: [
      {
        title: "Breakpoints",
        description: "Set conditional breakpoints by clicking the gutter.",
        icon: Bug,
      },
      {
        title: "Variable Inspection",
        description: "Hover over variables to inspect active runtime values.",
        icon: Sparkles,
      },
      {
        title: "Call Stack",
        description: "View the call stack and navigate execution frames.",
        icon: RefreshCw,
      },
      {
        title: "Console Access",
        description: "Evaluate expressions in the debug console.",
        icon: Terminal,
      },
    ],
    codeExample: {
      language: "javascript",
      code: `// Set a breakpoint by clicking line margin
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    // Breakpoint here to inspect item
    total += item.price;
  }
  return total;
}

const result = calculateTotal(cart);`,
      caption: "Debugging in action",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Debugger+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Debugger+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Set Breakpoint",
        description: "Click line gutter to toggle breakpoints.",
      },
      {
        step: 2,
        title: "Start Debugging",
        description: "Launch application in debug mode (F5).",
      },
      {
        step: 3,
        title: "Inspect State",
        description: "Inspect active variable values in watch panel.",
      },
      {
        step: 4,
        title: "Step Through",
        description: "Step through execution frames.",
      },
    ],
    specifications: {
      performance: "Low-overhead process attachment",
      platforms: ["Web", "macOS", "Windows", "Linux"],
      requirements: ["Node.js 18+", "Modern browser"],
    },
    faqs: [
      {
        question: "Does it support remote debugging?",
        answer:
          "Yes, C2X supports remote debugging for Node.js process targets.",
      },
      {
        question: "Which languages are supported?",
        answer:
          "Node.js, TypeScript, JavaScript, and browser target debugging are supported.",
      },
    ],
    relatedFeatures: ["ai-coding", "monaco-editor", "docker"],
    ctaLabel: "Try Debugger",
  },
  {
    id: "5",
    slug: "docker",
    name: "Docker Integration",
    icon: Container,
    category: "Containers",
    description:
      "Manage Docker containers, view logs, and inspect volumes directly from your IDE.",
    longDescription:
      "C2X's Docker integration allows containerized application workflows. Manage containers, inspect streaming logs, build images, and work with Docker Compose from the sidebar.",
    benefits: [
      "Container state management",
      "Live container log streaming",
      "Image build triggers",
      "Docker Compose integration",
    ],
    keyFeatures: [
      {
        title: "Container Management",
        description: "Start, stop, and restart containers from the sidebar.",
        icon: Container,
      },
      {
        title: "Log Streaming",
        description: "Stream container stdout/stderr logs live.",
        icon: Terminal,
      },
      {
        title: "Image Building",
        description: "Trigger image builds from active Dockerfile.",
        icon: RefreshCw,
      },
      {
        title: "Compose Support",
        description: "Inspect Docker Compose services.",
        icon: Users,
      },
    ],
    codeExample: {
      language: "dockerfile",
      code: `# Dockerfile for Node.js app
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`,
      caption: "Dockerfile in C2X",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Docker+Integration+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=Docker+Integration+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Create Dockerfile",
        description: "Create or open a Dockerfile in your workspace.",
      },
      { step: 2, title: "Build Image", description: "Build image from sidebar action." },
      {
        step: 3,
        title: "Run Container",
        description: "Launch container service.",
      },
      {
        step: 4,
        title: "Stream Logs",
        description: "Monitor container logs in terminal.",
      },
    ],
    specifications: {
      performance: "Multi-container management support",
      platforms: ["Web", "macOS", "Windows", "Linux"],
      requirements: ["Docker Engine / Desktop", "Modern browser"],
    },
    faqs: [
      {
        question: "Does it require local Docker?",
        answer:
          "Yes, a running Docker daemon is required for local container management.",
      },
      {
        question: "Can I connect to remote Docker daemons?",
        answer: "Yes, C2X supports remote Docker host connections via SSH.",
      },
    ],
    relatedFeatures: ["ssh-development", "git-integration", "debugger"],
    ctaLabel: "Try Docker Integration",
  },
  {
    id: "6",
    slug: "ssh-development",
    name: "SSH Development",
    icon: Terminal,
    category: "Remote",
    description:
      "Develop on remote servers via secure SSH with full editor capabilities.",
    longDescription:
      "C2X's SSH development allows remote server editing. Browse files, run remote terminal commands, and manage processes on remote hosts using secure SSH key authentication.",
    benefits: [
      "Remote file system editing",
      "Remote terminal shell access",
      "Port forwarding support",
      "Encrypted SSH transport",
    ],
    keyFeatures: [
      {
        title: "Remote Editing",
        description: "Edit files directly on remote servers.",
        icon: Terminal,
      },
      {
        title: "Terminal Shell",
        description: "Open remote interactive shell sessions.",
        icon: Sparkles,
      },
      {
        title: "Port Forwarding",
        description: "Forward ports to access remote web servers locally.",
        icon: RefreshCw,
      },
      {
        title: "Encrypted Transport",
        description: "Encrypted via SSH key-based authentication.",
        icon: Shield,
      },
    ],
    codeExample: {
      language: "bash",
      code: `# Connect to remote host
ssh dev@remote-server.com -p 22

# Edit files directly in C2X
c2x /var/www/my-app`,
      caption: "SSH development workflow",
    },
    screenshots: [
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=SSH+Demo+1",
      "https://placehold.co/1200x700/1a1a2e/ffffff?text=SSH+Demo+2",
    ],
    workflow: [
      {
        step: 1,
        title: "Connect",
        description: "Configure SSH host connection details.",
      },
      {
        step: 2,
        title: "Browse Files",
        description: "Browse remote directory tree.",
      },
      {
        step: 3,
        title: "Run Commands",
        description: "Execute commands in remote terminal.",
      },
      {
        step: 4,
        title: "Forward Ports",
        description: "Access remote dev ports locally.",
      },
    ],
    specifications: {
      performance: "Responsive remote file tree indexing",
      platforms: ["macOS", "Windows", "Linux"],
      requirements: ["SSH client", "SSH access to target host"],
    },
    faqs: [
      {
        question: "Is connection encrypted?",
        answer:
          "Yes, connections use standard SSH protocol encryption.",
      },
      {
        question: "Does it support Windows WSL?",
        answer:
          "Yes, SSH and WSL targets are fully supported.",
      },
    ],
    relatedFeatures: ["docker", "debugger", "git-integration"],
    ctaLabel: "Try SSH Development",
  },
];

export default FEATURES;
