import type { ProfileCompletion } from "@/context/AuthContext";

export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

export type LanguageLevel = "BASIC" | "CONVERSATIONAL" | "FLUENT" | "NATIVE";

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  field?: string | null;
  startYear: number;
  endYear?: number | null;
  grade?: string | null;
}

export interface LanguageItem {
  id?: string;
  name: string;
  level: LanguageLevel;
}

export interface TechnologyItem {
  id: string;
  slug: string;
  name: string;
}

export interface FullProfile {
  id: string;
  userId: string;
  fullName: string | null;
  age: number | null;
  gender: Gender | null;
  country: string | null;
  skills: string[];
  expertiseTechnologyId: string | null;
  expertiseTechnology?: TechnologyItem | null;
  educations: EducationItem[];
  languages: LanguageItem[];
  githubAccount?: {
    id: string;
    githubId: string;
    login: string;
    lastSyncedAt?: string | null;
    syncStatus?: string;
    connectedAt?: string;
  } | null;
  profileCompletion: ProfileCompletion;
  onboardingStep?: number;
  onboardingCompleted?: boolean;
}
