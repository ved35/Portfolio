export interface Social {
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  email?: string; // Added in case it's used directly in social links
}

export interface About {
  headline: string;
  description: string;
  image: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
  gpa?: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  featured: boolean;
}

export interface Contact {
  formEmail: string;
  message: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  resumeLink: string;
  social: Social;
  about: About;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  contact: Contact;
}
