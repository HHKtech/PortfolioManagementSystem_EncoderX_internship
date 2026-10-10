import { z } from "zod";

// Username validation
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(100, "Username must be at most 100 characters")
  .regex(
    /^[a-z0-9-]+$/,
    "Username can only contain lowercase letters, numbers, and hyphens"
  );

// Login schema
export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, "Password is required"),
});

// Profile schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200, "Name must be at most 200 characters"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  summary: z
    .string()
    .max(2000, "Summary must be at most 2000 characters")
    .optional(),
  degree: z
    .string()
    .max(200, "Degree must be at most 200 characters")
    .optional(),
  institution: z
    .string()
    .max(200, "Institution must be at most 200 characters")
    .optional(),
  educationStatus: z
    .string()
    .max(100, "Education status must be at most 100 characters")
    .optional(),
  educationPeriod: z
    .string()
    .max(100, "Education period must be at most 100 characters")
    .optional(),
  currentSemester: z
    .string()
    .max(100, "Current semester must be at most 100 characters")
    .optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
});

// Project schema
export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
  detailedDescription: z
    .string()
    .max(3000, "Detailed description must be at most 3000 characters")
    .optional(),
  category: z
    .string()
    .max(100, "Category must be at most 100 characters")
    .optional(),
  technologies: z.array(z.string().max(100)).optional().default([]),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveDemoUrl: z
    .string()
    .url("Invalid live demo URL")
    .optional()
    .or(z.literal("")),
  displayOrder: z.number().int().optional().default(0),
});

// Skill schema
export const skillSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must be at most 100 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be at most 100 characters"),
});

// Leadership schema
export const leadershipSchema = z.object({
  role: z
    .string()
    .min(1, "Role is required")
    .max(200, "Role must be at most 200 characters"),
  organization: z
    .string()
    .min(1, "Organization is required")
    .max(200, "Organization must be at most 200 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters")
    .optional(),
  period: z
    .string()
    .max(100, "Period must be at most 100 characters")
    .optional(),
  isCurrent: z.boolean().optional().default(false),
});

// Interest schema
export const interestSchema = z.object({
  name: z
    .string()
    .min(1, "Interest name is required")
    .max(200, "Interest name must be at most 200 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type LeadershipInput = z.infer<typeof leadershipSchema>;
export type InterestInput = z.infer<typeof interestSchema>;
