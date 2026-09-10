export type RoleCategory = 
  | 'Software Developer'
  | 'AI Enthusiast'
  | 'Full-Stack Developer'
  | 'Data & Analytics Explorer';

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  capabilities: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  accentColor: 'cyan' | 'blue' | 'violet' | 'emerald';
  type: 'civicwatch' | 'smarthealth' | 'veritas' | 'parisiman';
  statusNote?: string;
  hackathonContext?: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  highlightBadge?: string;
  description: string[];
  skills: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export interface MilestoneData {
  id: string;
  title: string;
  organization: string;
  year: string;
  rankHighlight?: string;
  description: string;
  badgeType: 'gold' | 'cyan' | 'violet' | 'blue';
  verified: boolean;
}

export interface CertificationData {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface EducationData {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  status: string;
  location: string;
  coursework: string[];
  semesters: { sem: string; spi: string }[];
}
