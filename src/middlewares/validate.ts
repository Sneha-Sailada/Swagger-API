// -------------------------------------------------
// Zod Validation Middleware
// -------------------------------------------------
// Generic middleware factory that validates req.body
// against any Zod schema passed to it. If validation
// fails, it returns a 400 with the exact field errors.
//
// Usage in routes:
//   router.post("/", validate(createCandidateSchema), controller.create);
//
// Why this pattern?
// - DRY: One middleware handles all validation
// - Type-safe: After validation, req.body is typed
// - Readable: Route file shows exactly what schema
//   each endpoint expects
// -------------------------------------------------

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { sendError } from "../utils/response";

/**
 * Creates an Express middleware that validates req.body
 * against the provided Zod schema.
 *
 * On success: attaches parsed (and coerced) data to req.body
 * On failure: returns 400 with detailed field errors
 */
export const validate = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            // `parse()` throws ZodError on failure
            // It also strips unknown fields (safe defaults)
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Format errors into a readable string
                // e.g. "experience: Expected number, received string; languageScore: Number must be >= 0"
                const errorMessage = error.errors
                    .map((e) => `${e.path.join(".")}: ${e.message}`)
                    .join("; ");

                sendError(_res, errorMessage, 400);
                return;
            }
            next(error);
        }
    };
};
