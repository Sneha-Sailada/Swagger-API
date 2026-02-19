import { Request, Response, NextFunction } from "express";
import { candidateService } from "../services/candidate.service";
import { sendSuccess } from "../utils/response";

/**
 * Controller for Candidate module.
 * Parses HTTP requests and calls the service layer.
 */
export class CandidateController {
    /**
     * POST /candidates
     * Creates a new candidate.
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const candidate = await candidateService.createCandidate(req.body);
            sendSuccess(res, candidate, 201);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /candidates/:id
     * Retrieves a candidate by ID.
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const candidate = await candidateService.getCandidateById(id as string);
            sendSuccess(res, candidate);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /candidates
     * Retrieves all candidates.
     */
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const candidates = await candidateService.getAllCandidates();
            sendSuccess(res, candidates);
        } catch (error) {
            next(error);
        }
    }
}

export const candidateController = new CandidateController();
