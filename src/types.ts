/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Theme {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;       // Tailwind utility text/bg color (e.g., "emerald-500")
  accentBg: string;     // Secondary light background (e.g., "bg-emerald-50 dark:bg-emerald-950/30")
  accentText: string;   // Pure accent text class (e.g., "text-emerald-600 dark:text-emerald-400")
  accentBorder: string; // Accent border color (e.g., "border-emerald-500")
  isDark: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "Web Dev" | "Mobile Core" | "AI & Data Science" | "UI/UX Design" | "Lainnya";
  liveUrl?: string;
  githubUrl?: string;
  status: "Selesai" | "Dalam Pengembangan" | "Rencana";
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  gpa?: string;
  startYear: string;
  endYear: string;
  notes?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1 to 5 stars or percentage (e.g., 20, 40, 60, 80, 100)
  category: "Coding & Tech" | "Desain & Kreatif" | "Bahasa & Komunikasi" | "Metodologi & Tools";
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  timestamp: string;
}

export interface ProfileData {
  name: string;
  role: string;
  university: string;
  major: string;
  semester: number;
  gpa: string;
  sks: number;
  email: string;
  linkedin: string;
  github: string;
  avatarSeed: string;
  photoUrl?: string;
  bio: string;
  projects: Project[];
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  themeId: string;
}
