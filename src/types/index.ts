import type { LucideIcon } from "lucide-react";

// Existing types
export * from "./blog";
export * from "./jobs";
export * from "./team";
export * from "./timeline";
export * from "./statistic";
export * from "./brand";

// Re-export commonly used types
export type { Job } from "./jobs";
export type { TeamMember } from "./team";
export type { TimelineItem } from "./timeline";
export type { Statistic } from "./statistic";
export type { BrandAsset } from "./brand";
export interface NavLinkItem {
  label: string;
  path: string;
}

export interface NavLinkItem {
  label: string;
  path: string;
  external?: boolean;
}

export interface FeatureCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  color: string;
}

export interface PerformanceStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
}

export interface ScreenshotSlide {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface EditorTab {
  id: string;
  fileName: string;
  language: string;
  active?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLinkItem[];
}

// ===== Phase 2A =====

export type PreviewKind = "code" | "terminal" | "nodes" | "badge" | "diff";

export interface FeaturePreview {
  kind: PreviewKind;
  lines: string[];
}

export interface DetailedFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  preview: FeaturePreview;
}

export interface AICapability {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AIExample {
  id: string;
  label: string;
  icon: LucideIcon;
  prompt: string;
  response: string;
  diff?: { removed: string; added: string };
}

export interface CollabFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  color: string;
  file: string;
  line: number;
}

export interface CollabMessage {
  id: string;
  author: string;
  initials: string;
  color: string;
  text: string;
  time: string;
}

export type ExtensionCategory =
  | "Languages"
  | "Themes"
  | "Debugging"
  | "Productivity"
  | "AI Tools";

export interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  downloads: string;
  rating: number;
  category: ExtensionCategory;
  verified?: boolean;
}

export type ThemeGroup = "Dark" | "Light" | "High Contrast";

export interface EditorTheme {
  id: string;
  name: string;
  author: string;
  group: ThemeGroup;
  colors: {
    background: string;
    panel: string;
    accent: string;
    keyword: string;
    string: string;
    comment: string;
    text: string;
  };
  downloads: string;
}

// ===== Phase 2B — Download =====

export type PlatformId = "windows" | "macos" | "linux";

export interface PlatformDownload {
  id: string;
  label: string;
  format: string;
  size: string;
  href: string;
}

export interface Platform {
  id: PlatformId;
  icon: LucideIcon;
  name: string;
  tagline: string;
  downloads: PlatformDownload[];
  recommended?: string;
}

export interface SystemRequirementSpec {
  label: string;
  minimum: string;
  recommended: string;
}

export interface SystemRequirement {
  id: PlatformId;
  icon: LucideIcon;
  platformName: string;
  specs: SystemRequirementSpec[];
}

export interface InstallStep {
  id: string;
  step: number;
  title: string;
  description: string;
  command?: string;
}

export type ReleaseChannelId = "stable" | "insiders" | "nightly";

export interface ReleaseChannel {
  id: ReleaseChannelId;
  icon: LucideIcon;
  name: string;
  description: string;
  version: string;
  cadence: string;
  stability: "Production" | "Beta" | "Experimental";
}

export interface ChecksumEntry {
  id: string;
  platform: string;
  fileName: string;
  sha256: string;
}

export interface VersionEntry {
  id: string;
  version: string;
  date: string;
  channel: ReleaseChannelId;
  highlights: string[];
  isLatest?: boolean;
}
