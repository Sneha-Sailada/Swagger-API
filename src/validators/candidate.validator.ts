import { z } from "zod";

/**
 * Validation schema for creating a new candidate.
 * Implements PRD requirements:
 * - experience ≥ 0
 * - languageScore between 0–100
 */
export const createCandidateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    skill: z.string().min(1, "Skill is required"),
    experience: z.number().int().min(0, "Experience must be a non-negative integer"),
    languageScore: z.number().int().min(0, "Language score must be at least 0").max(100, "Language score cannot exceed 100"),
    documentsVerified: z.boolean().default(false),
});

/**
 * Type inference for the candidate creation payload.
 */
export type CreateCandidateInput = z.infer<typeof createCandidateSchema>;
