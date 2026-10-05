export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  initials: string;
  title: string;
  bio: string;
  twitter: string | null;
  github: string | null;
  linkedin: string | null;
  website: string | null;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string | null;
  imageCaption: string | null;
  publishedAt: string;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  headings?: Heading[];
  contentBlocks?: ContentBlock[];
}

export interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "code"
    | "image"
    | "quote"
    | "callout"
    | "list";
  content?: string;
  id?: string;
  depth?: number;
  code?: string;
  language?: string;
  caption?: string | null;
  src?: string;
  author?: string;
  calloutType?: "info" | "warning" | "error" | "success" | "tip";
  title?: string;
  items?: string[];
}

export interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface TocEntry {
  id: string;
  label: string;
  depth?: 2 | 3;
}
