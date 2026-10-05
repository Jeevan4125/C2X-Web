interface KnowledgeBase {
  keywords: string[];
  response: string;
}

const knowledgeBase: KnowledgeBase[] = [
  // General
  {
    keywords: [
      "what is c2x",
      "what is code sync",
      "c2x ide",
      "code sync ide",
      "introduce c2x",
      "about c2x",
    ],
    response:
      "C2X is an AI-native collaborative cloud IDE that helps developers code, collaborate, debug, and ship software faster. It combines powerful AI assistance with real-time teamwork, right from your browser.",
  },
  {
    keywords: [
      "features",
      "what features",
      "capabilities",
      "what can it do",
      "what does it do",
    ],
    response:
      "C2X offers AI-powered coding assistance, real-time collaboration, Git integration, built-in debugger, Docker support, SSH development, extensions marketplace, customizable themes, and more. It's designed to be your all-in-one development environment.",
  },
  {
    keywords: [
      "ai",
      "ai assistant",
      "ai pair programming",
      "how does ai work",
      "artificial intelligence",
      "coding assistant",
    ],
    response:
      "C2X is your pair programmer built into the IDE. It provides context-aware suggestions, one-click refactors, code explanations, and intelligent completions. The AI understands your entire codebase, not just the open file, to give relevant answers. It's private by default — your code never leaves your workspace unless you explicitly opt in.",
  },
  {
    keywords: [
      "download",
      "install",
      "installation",
      "how to download",
      "get c2x",
      "setup",
      "installer",
    ],
    response:
      "You can download C2X from our Download page. We offer native builds for Windows, macOS, and Linux. The installation takes about 60 seconds — just download the installer for your platform and follow the setup wizard.",
  },
  {
    keywords: [
      "free",
      "price",
      "pricing",
      "cost",
      "paid",
      "subscription",
      "premium",
      "costs",
    ],
    response:
      "C2X is free to install and use. We offer a free tier that includes all core features. For advanced features like team management, enhanced security, and priority support, we have Pro and Enterprise plans. Check our Pricing page for more details.",
  },
  {
    keywords: [
      "collaborate",
      "collaboration",
      "team",
      "multi user",
      "multiple users",
      "edit together",
      "real time",
      "share workspace",
    ],
    response:
      "C2X supports real-time collaboration where multiple users can edit the same file simultaneously. You can see team members' cursors, presence indicators, and live changes. Invite teammates to your workspace and start coding together instantly — no setup required.",
  },
  {
    keywords: [
      "extensions",
      "plugins",
      "marketplace",
      "vs code api",
      "install extensions",
      "add-ons",
    ],
    response:
      "C2X has a growing extensions marketplace compatible with the open VS Code API. You can install extensions for languages, themes, debugging, productivity, and AI tools. Popular extensions include ESLint, Prettier, GitLens, and many more.",
  },
  {
    keywords: [
      "git",
      "github",
      "version control",
      "commit",
      "push",
      "pull",
      "repository",
      "clone",
      "branch",
    ],
    response:
      "Yes! C2X integrates seamlessly with Git and GitHub. You can clone repositories, make commits, create pull requests, view diffs, manage branches, and collaborate with your team without leaving the IDE. It supports GitHub, GitLab, and Bitbucket.",
  },
  {
    keywords: [
      "cloud",
      "cloud based",
      "remote",
      "browser",
      "online",
      "web based",
      "cloud ide",
    ],
    response:
      "C2X is a cloud-based IDE that runs in your browser. There's nothing to install — just open your browser and start coding. Your workspace is always available, and your code is automatically saved and synced across devices.",
  },
  {
    keywords: [
      "java",
      "python",
      "c++",
      "javascript",
      "typescript",
      "go",
      "rust",
      "language",
      "languages",
      "supported languages",
      "c#",
      "php",
      "ruby",
      "swift",
      "kotlin",
    ],
    response:
      "C2X supports all major programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, C#, PHP, Ruby, Swift, Kotlin, and many more. New languages are added regularly through our extensions marketplace.",
  },
  {
    keywords: [
      "debug",
      "debugger",
      "debugging",
      "breakpoint",
      "breakpoints",
      "console",
      "debug tool",
    ],
    response:
      "C2X includes a full-featured debugger with breakpoints, variable inspection, call stack viewing, and an interactive console. You can debug JavaScript, TypeScript, Node.js, Python, and more. Set breakpoints by clicking the gutter and step through your code line by line.",
  },
  {
    keywords: [
      "themes",
      "theme",
      "dark",
      "light",
      "color",
      "customize",
      "appearance",
    ],
    response:
      "C2X offers dozens of curated dark, light, and high-contrast color themes. You can also create your own custom themes. Popular themes include Midnight, Solar, Contrast+, and many more. Themes sync across all your devices.",
  },
  {
    keywords: [
      "security",
      "secure",
      "privacy",
      "private",
      "safe",
      "encrypted",
      "data",
      "protect",
    ],
    response:
      "Security is a top priority for C2X. All connections are encrypted, your code stays private by default, and we never store your code without explicit permission. Enterprise plans include additional security features like SSO and advanced access controls.",
  },
  {
    keywords: [
      "project",
      "create project",
      "new project",
      "workspace",
      "folder",
      "create workspace",
    ],
    response:
      "Creating a new project in C2X is easy. Click the 'Create Project' button, choose a template or start from scratch, and you're ready to code. You can also clone existing repositories from GitHub or import projects from other IDEs.",
  },
  {
    keywords: [
      "invite",
      "teammate",
      "team member",
      "add user",
      "share workspace",
      "add teammate",
    ],
    response:
      "To invite teammates, open your workspace, click the 'Share' button, and enter their email addresses. They'll receive an invitation to join your workspace. You can also set permissions for each team member — view, edit, or admin.",
  },
  {
    keywords: [
      "documentation",
      "docs",
      "guide",
      "tutorial",
      "help",
      "learn",
      "document",
    ],
    response:
      "You can find comprehensive documentation at our Docs section. It covers everything from getting started to advanced features including AI assistance, collaboration, extensions, and API references. We also have tutorials and guides to help you master C2X.",
  },
  {
    keywords: [
      "shortcut",
      "keyboard shortcut",
      "hotkey",
      "keybind",
      "ctrl",
      "cmd",
      "shortcuts",
    ],
    response:
      "C2X includes a comprehensive set of keyboard shortcuts to boost your productivity. You can view and customize all shortcuts in the Settings menu. Common shortcuts include Ctrl+S to save, Ctrl+Shift+P for command palette, and Ctrl+Shift+E to open the sidebar.",
  },
  {
    keywords: [
      "docker",
      "container",
      "containerization",
      "dockerfile",
      "compose",
      "docker compose",
    ],
    response:
      "C2X has built-in Docker integration. You can build images, run containers, view logs, and manage volumes — all from within the IDE. It supports Docker Compose for multi-container applications and works on all major platforms.",
  },
  {
    keywords: [
      "ssh",
      "remote server",
      "server",
      "ssh development",
      "remote editing",
      "remote development",
    ],
    response:
      "C2X supports SSH development, allowing you to edit and run code on remote servers. Access files, run commands, and manage processes on any server with SSH access. All connections are encrypted and secure.",
  },
  {
    keywords: [
      "refactor",
      "refactoring",
      "code refactor",
      "refactor code",
      "optimize",
      "optimize code",
    ],
    response:
      "C2X provides intelligent refactoring suggestions. You can apply proposed refactors instantly or review them as a diff first. The AI understands your codebase and suggests safe, optimized ways to restructure your code.",
  },
  {
    keywords: [
      "test",
      "tests",
      "testing",
      "unit tests",
      "generate tests",
      "test generation",
    ],
    response:
      "C2X can automatically generate unit tests for your code. The AI analyzes your functions and creates comprehensive test suites that cover edge cases and common scenarios. Supports Jest, Vitest, and other testing frameworks.",
  },
  {
    keywords: [
      "monaco",
      "editor",
      "code editor",
      "monaco editor",
      "vs code",
      "vscode",
    ],
    response:
      "C2X uses the Monaco Editor, the same editor that powers VS Code. It provides full IntelliSense, syntax highlighting, multi-cursor editing, and all the features you love from VS Code, right in your browser.",
  },
];

// Common variations and synonyms
const keywordVariations: Record<string, string> = {
  "code sync": "c2x",
  "code-sync": "c2x",
  "code sync ide": "c2x ide",
  "ai coding": "ai",
  "ai code": "ai",
  "machine learning": "ai",
  ml: "ai",
  "git integration": "git",
  "github integration": "git",
  "version control": "git",
  "debugging tool": "debugger",
  "debug tools": "debugger",
  plugins: "extensions",
  "add-ons": "extensions",
  "vs code": "vs code api",
  vscode: "vs code api",
  "cloud ide": "cloud",
  "online ide": "cloud",
  "web ide": "cloud",
  price: "pricing",
  costs: "pricing",
  "subscription plan": "pricing",
  docs: "documentation",
  help: "documentation",
  guide: "documentation",
  tutorial: "documentation",
};

export const getAIResponse = (userInput: string): string => {
  const normalizedInput = userInput.toLowerCase().trim();

  // Check for keyword variations
  let processedInput = normalizedInput;
  for (const [key, value] of Object.entries(keywordVariations)) {
    if (processedInput.includes(key)) {
      processedInput = processedInput.replace(key, value);
    }
  }

  // Find matching response
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (processedInput.includes(keyword.toLowerCase())) {
        return item.response;
      }
    }
  }

  // Check for common question patterns
  const questionPatterns = [
    {
      pattern: /how (do i|to|can i)/,
      response:
        "I can help you with that! Could you please specify which feature or area you'd like to learn more about? For detailed guides, check our Documentation section.",
    },
    {
      pattern: /what is (the|a|an)/,
      response:
        "I can help you understand C2X's features! Please specify which feature you're interested in, or check our Documentation for comprehensive guides.",
    },
    {
      pattern: /why (should|would|is)/,
      response:
        "That's a great question! Could you be more specific about what you'd like to know about C2X? I can provide detailed information about any feature.",
    },
    {
      pattern: /can (you|i|we)/,
      response:
        "I'd be happy to help! Could you clarify what you'd like to know about C2X? I can answer questions about features, installation, collaboration, and more.",
    },
    {
      pattern: /what('s| is) the (best|difference|benefit)/,
      response:
        "Great question! C2X offers many benefits. Could you specify which aspect you're interested in? I can tell you about AI assistance, collaboration, or any other feature.",
    },
  ];

  for (const pattern of questionPatterns) {
    if (pattern.pattern.test(normalizedInput)) {
      return pattern.response;
    }
  }

  // Default response for unrelated questions
  return "I'm C2X. I can only answer questions related to C2X, its features, documentation, and platform. Please ask me about topics like AI assistance, collaboration, extensions, installation, or any other C2X feature.";
};

export default knowledgeBase;
