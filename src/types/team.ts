export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  leadership: boolean;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
