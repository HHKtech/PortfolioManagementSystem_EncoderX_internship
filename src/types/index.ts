// ─── API Response Types ───────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

// ─── Portfolio Types ──────────────────────────────────────────────────────────
export interface PublicProfile {
  name: string;
  title: string;
  summary: string | null;
  degree: string | null;
  institution: string | null;
  educationStatus: string | null;
  educationPeriod: string | null;
  currentSemester: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface PublicProject {
  id: number;
  title: string;
  description: string;
  detailedDescription: string | null;
  category: string | null;
  technologies: string[];
  imageUrl: string | null;
  githubUrl: string | null;
  liveDemoUrl: string | null;
  displayOrder: number;
}

export interface PublicSkill {
  id: number;
  name: string;
  category: string;
}

export interface PublicLeadership {
  id: number;
  role: string;
  organization: string;
  description: string | null;
  period: string | null;
  isCurrent: boolean;
}

export interface PublicInterest {
  id: number;
  name: string;
}

export interface PortfolioData {
  username: string;
  profile: PublicProfile;
  projects: PublicProject[];
  skills: PublicSkill[];
  leadershipExperiences: PublicLeadership[];
  interests: PublicInterest[];
}

// ─── Skill Categories ─────────────────────────────────────────────────────────
export const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "AI",
  "Tools",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const PROJECT_CATEGORIES = [
  "AI / Full Stack",
  "Civic Technology / Full Stack",
  "AI",
  "Desktop Application",
  "Web Development",
  "Mobile Development",
  "Other",
] as const;
