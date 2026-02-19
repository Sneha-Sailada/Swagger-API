// -------------------------------------------------
// Centralized API Response Helpers
// -------------------------------------------------
// Every endpoint returns the same shape:
//   { success: boolean, data?: any, error?: string }
//
// Why?
// - Clients can always check `response.success`
//   before accessing `data` or `error`
// - No guessing whether the API returns { message }
//   or { error } or { msg } — it's always consistent
// - Pagination metadata is included in `meta` when
//   applicable
// -------------------------------------------------

import { Response } from "express";

/**
 * Pagination metadata returned with list endpoints.
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

/**
 * Standard API response shape.
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    meta?: PaginationMeta;
}

/**
 * Send a success response.
 *
 * @param res - Express response object
 * @param data - Payload to return
 * @param statusCode - HTTP status (default 200)
 * @param meta - Optional pagination metadata
 */
export const sendSuccess = <T>(
    res: Response,
    data: T,
    statusCode: number = 200,
    meta?: PaginationMeta
): void => {
    const response: ApiResponse<T> = { success: true, data };
    if (meta) {
        response.meta = meta;
    }
    res.status(statusCode).json(response);
};

/**
 * Send an error response.
 *
 * @param res - Express response object
 * @param error - Human-readable error message
 * @param statusCode - HTTP status (default 500)
 */
export const sendError = (
    res: Response,
    error: string,
    statusCode: number = 500
): void => {
    const response: ApiResponse = { success: false, error };
    res.status(statusCode).json(response);
};
