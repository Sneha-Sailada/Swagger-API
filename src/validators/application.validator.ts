import { z } from "zod";

/**
 * Validation schema for applying to a job.
 */
export const createApplicationSchema = z.object({
        candidateId: z.number().int().positive(),
        jobId: z.number().int().positive(),
});

/**
 * Type inference for application creation payload.
 */
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
