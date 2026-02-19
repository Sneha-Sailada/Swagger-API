import { z } from "zod";

/**
 * Validation schema for creating a new job role.
 * Implements PRD requirements:
 * - minExperience ≥ 0
 * - minLanguageScore 0–100
 */
export const createJobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    country: z.string().min(1, "Country is required"),
    minExperience: z.number().int().min(0, "Minimum experience must be a non-negative integer"),
    minLanguageScore: z.number().int().min(0, "Minimum language score must be at least 0").max(100, "Minimum language score cannot exceed 100"),
});

/**
 * Type inference for the job creation payload.
 */
export type CreateJobInput = z.infer<typeof createJobSchema>;
