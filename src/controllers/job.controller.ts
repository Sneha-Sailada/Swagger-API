import { Request, Response, NextFunction } from "express";
import { jobService } from "../services/job.service";
import { sendSuccess } from "../utils/response";

/**
 * Controller for Job module.
 * Bridges HTTP requests to JobService.
 */
export class JobController {
    /**
     * POST /jobs
     * Creates a new job role.
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const job = await jobService.createJob(req.body);
            sendSuccess(res, job, 201);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /jobs/:id
     * Retrieves a specific job by ID.
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const job = await jobService.getJobById(id as string);
            sendSuccess(res, job);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /jobs
     * Retrieves all job roles.
     */
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const jobs = await jobService.getAllJobs();
            sendSuccess(res, jobs);
        } catch (error) {
            next(error);
        }
    }
}

export const jobController = new JobController();
