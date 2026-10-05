import type { BlogPost } from "@/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "introducing-c2x-2026",
    title:
      "Introducing C2X 2026: The Connected Workspace Platform",
    excerpt:
      "Discover the next generation of development environments with real-time collaboration, AI-powered assistance, and seamless team workflows.",
    content:
      "We're thrilled to announce C2X 2026, a complete reimagining of what a development environment can be. Built from the ground up for modern teams, C2X combines the power of a traditional IDE with real-time collaboration, intelligent AI assistance, and a dark-first interface.\n\nThe journey to C2X 2026 began with a simple goal: bring coding, AI assistance, terminal workflows, debugging, and collaboration into one unified workspace.\n\nKey highlights include:\n• Real-time collaboration with presence awareness\n• Context-aware AI code completion and suggestions\n• Built-in version control integration\n• Seamless team workflows and code reviews\n• Cross-platform support for Windows, macOS, and Linux",
    heroImage:
      "https://placehold.co/1200x600/1a1a2e/ffffff?text=C2X+IDE",
    imageCaption: "C2X in action",
    publishedAt: "2026-01-15",
    authorId: "author1",
    authorName: "C2X Engineering",
    category: "announcements",
    tags: ["release", "features", "collaboration", "ai"],
    readingTime: 6,
    featured: true,
    headings: [
      { id: "the-vision", text: "The Vision", depth: 2 },
      { id: "key-features", text: "Key Features", depth: 2 },
      {
        id: "real-time-collaboration",
        text: "Real-Time Collaboration",
        depth: 3,
      },
      { id: "ai-assistance", text: "AI Assistance", depth: 3 },
      { id: "getting-started", text: "Getting Started", depth: 2 },
    ],
    contentBlocks: [
      {
        type: "paragraph",
        content:
          "We're thrilled to announce C2X 2026, a complete reimagining of what a development environment can be. Built from the ground up for modern teams, C2X combines the power of a traditional IDE with real-time collaboration, intelligent AI assistance, and a dark-first interface.",
      },
      { type: "heading", id: "the-vision", content: "The Vision", depth: 2 },
      {
        type: "paragraph",
        content:
          "The journey to C2X 2026 began with a simple goal: bring coding, AI assistance, terminal workflows, debugging, and collaboration into one unified workspace.",
      },
      {
        type: "heading",
        id: "key-features",
        content: "Key Features",
        depth: 2,
      },
      { type: "paragraph", content: "Key highlights include:" },
      {
        type: "code",
        code: "import { C2XSession } from '@c2x/sdk';\n\nconst session = new C2XSession();\nsession.enableLiveCoding();\nsession.enablePresence();",
        language: "typescript",
        caption: "C2X API Example",
      },
      {
        type: "heading",
        id: "real-time-collaboration",
        content: "Real-Time Collaboration",
        depth: 3,
      },
      {
        type: "paragraph",
        content:
          "Multiple developers can work on the same file simultaneously with full cursor tracking, presence indicators, and live changes.",
      },
      {
        type: "heading",
        id: "ai-assistance",
        content: "AI Assistance",
        depth: 3,
      },
      {
        type: "paragraph",
        content:
          "Our built-in AI assistant understands your code context, suggests completions, and can explain or generate code snippets.",
      },
      {
        type: "callout",
        content:
          "The AI assistant indexes active workspace files to follow your project's coding style automatically.",
        calloutType: "tip",
        title: "Pro Tip",
      },
      {
        type: "heading",
        id: "getting-started",
        content: "Getting Started",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "Getting started with C2X is easy. Download the installer for your platform, launch the IDE, and open your workspace directory.",
      },
    ],
  },
  {
    id: "2",
    slug: "mastering-real-time-collaboration",
    title: "Mastering Real-Time Collaboration in C2X",
    excerpt:
      "Learn how to leverage C2X's collaboration features to work effectively with your team across time zones.",
    content:
      "Real-time collaboration is at the heart of C2X. This guide will walk you through all the collaboration features and show you how to make the most of them in your daily workflow.",
    heroImage:
      "https://placehold.co/1200x600/1a1a2e/ffffff?text=Real-Time+Collaboration",
    imageCaption: "C2X collaboration in action",
    publishedAt: "2026-01-20",
    authorId: "author2",
    authorName: "C2X Systems",
    category: "tutorials",
    tags: ["collaboration", "teams", "workflow", "real-time"],
    readingTime: 8,
    featured: false,
    headings: [
      { id: "introduction", text: "Introduction", depth: 2 },
      {
        id: "getting-started-with-collaboration",
        text: "Getting Started with Collaboration",
        depth: 2,
      },
      { id: "live-coding-sessions", text: "Live Coding Sessions", depth: 3 },
      {
        id: "presence-and-awareness",
        text: "Presence and Awareness",
        depth: 3,
      },
      { id: "best-practices", text: "Best Practices", depth: 2 },
    ],
    contentBlocks: [
      {
        type: "paragraph",
        content:
          "Real-time collaboration is at the heart of C2X. This guide will walk you through all the collaboration features and show you how to make the most of them in your daily workflow.",
      },
      {
        type: "heading",
        id: "introduction",
        content: "Introduction",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "In today's distributed world, effective collaboration is crucial. C2X was built from the ground up to support seamless team workflows.",
      },
      {
        type: "heading",
        id: "getting-started-with-collaboration",
        content: "Getting Started with Collaboration",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "To start collaborating, simply open a project and invite your team members. Everyone can join instantly and start coding together.",
      },
      {
        type: "code",
        code: "// Start a collaboration session\nconst session = await room.start({\n  project: 'my-project'\n});",
        language: "typescript",
        caption: "Starting a collaboration session",
      },
      {
        type: "heading",
        id: "live-coding-sessions",
        content: "Live Coding Sessions",
        depth: 3,
      },
      {
        type: "paragraph",
        content:
          "Live coding sessions allow multiple developers to work on the same file simultaneously. Everyone sees changes in real-time, making pair programming and code reviews far more effective.",
      },
      {
        type: "heading",
        id: "presence-and-awareness",
        content: "Presence and Awareness",
        depth: 3,
      },
      {
        type: "paragraph",
        content:
          "See who's online, what file they're working on, and where their cursor is positioned.",
      },
      {
        type: "callout",
        content:
          "Click on an avatar to follow a teammate's viewport in real time.",
        calloutType: "info",
        title: "Did you know?",
      },
      {
        type: "heading",
        id: "best-practices",
        content: "Best Practices",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "For the best collaboration experience, establish clear role permissions and communicate during pair sessions.",
      },
    ],
  },
  {
    id: "3",
    slug: "ai-assistant-workspace",
    title: "Supercharge Your Workflow with C2X's AI Assistant",
    excerpt:
      "Discover how C2X's built-in AI can help you write better code faster, from intelligent completions to automatic code generation.",
    content:
      "The AI assistant in C2X is designed to understand your code context and provide intelligent suggestions that feel natural and helpful.",
    heroImage: "https://placehold.co/1200x600/1a1a2e/ffffff?text=AI+Assistant",
    imageCaption: "AI Assistant in action",
    publishedAt: "2026-01-25",
    authorId: "author3",
    authorName: "C2X AI Team",
    category: "guides",
    tags: ["ai", "assistant", "productivity", "automation"],
    readingTime: 5,
    featured: false,
    headings: [
      { id: "understanding-the-ai", text: "Understanding the AI", depth: 2 },
      {
        id: "intelligent-code-completion",
        text: "Intelligent Code Completion",
        depth: 3,
      },
      {
        id: "automatic-code-generation",
        text: "Automatic Code Generation",
        depth: 3,
      },
      { id: "customization", text: "Customization", depth: 2 },
    ],
    contentBlocks: [
      {
        type: "paragraph",
        content:
          "The AI assistant in C2X is designed to understand your code context and provide intelligent suggestions that feel natural and helpful.",
      },
      {
        type: "heading",
        id: "understanding-the-ai",
        content: "Understanding the AI",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "C2X AI indexes active workspace files to deliver contextual suggestions. Developers should always review and validate generated code.",
      },
      {
        type: "heading",
        id: "intelligent-code-completion",
        content: "Intelligent Code Completion",
        depth: 3,
      },
      {
        type: "code",
        code: "// Type this in your editor:\nfunction calculateAverage(numbers: number[]) {\n  // AI will suggest the implementation\n  // Press Tab to accept the suggestion\n  return numbers.reduce((a, b) => a + b, 0) / numbers.length;\n}",
        language: "typescript",
        caption: "AI completion in action",
      },
      {
        type: "paragraph",
        content:
          "The AI completes your code based on the current context, significantly reducing boilerplate code.",
      },
      {
        type: "heading",
        id: "automatic-code-generation",
        content: "Automatic Code Generation",
        depth: 3,
      },
      {
        type: "paragraph",
        content:
          "Describe what you want in plain language, and the AI generates working code for review.",
      },
      {
        type: "callout",
        content:
          "The AI can generate test scaffolds, docstrings, and suggest refactors for complex code.",
        calloutType: "success",
        title: "Pro Tip",
      },
      {
        type: "heading",
        id: "customization",
        content: "Customization",
        depth: 2,
      },
      {
        type: "paragraph",
        content:
          "Fine-tune AI behavior in settings or connect local Ollama models for offline privacy.",
      },
    ],
  },
];
