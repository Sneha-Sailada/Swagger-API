// -------------------------------------------------
// Global Error Handler Middleware
// -------------------------------------------------
// This is the LAST middleware in the Express chain.
// Any error thrown/passed via next(error) ends up here.
//
// It distinguishes between:
//   - AppError (our custom errors with statusCode)
//   - Unknown errors (bugs — logged, returned as 500)
//
// Why centralized?
// - No try/catch needed in every controller
// - Consistent error response format
// - Single place to add logging/monitoring later
// -------------------------------------------------

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { sendError } from "../utils/response";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    // Known operational errors (e.g., "Candidate not found")
    if (err instanceof AppError) {
        sendError(res, err.message, err.statusCode);
        return;
    }

    // Unknown errors — likely bugs
    console.error("🔥 Unexpected Error:", err);
    sendError(res, "Internal server error", 500);
};
