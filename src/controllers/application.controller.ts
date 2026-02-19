import { Request, Response, NextFunction } from "express";
import { applicationService } from "../services/application.service";
import { sendSuccess } from "../utils/response";

/**
 * Controller for Application module.
 * Parses query params and bodies for application-specific endpoints.
 */
export class ApplicationController {
    /**
     * POST /applications
     * Creates a new application.
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { candidateId, jobId } = req.body;
            const application = await applicationService.applyForJob(candidateId, jobId);
            sendSuccess(res, application, 201);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /applications?jobId=uuid&page=1&limit=10
     * Lists applications for a job role.
     */
    async getByJob(req: Request, res: Response, next: NextFunction) {
        try {
            const { jobId, page, limit } = req.query;

            const { applications, pagination } = await applicationService.getApplicationsByJob(
                jobId as string,
                page ? parseInt(page as string) : 1,
                limit ? parseInt(limit as string) : 10
            );

            sendSuccess(res, applications, 200, pagination);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PATCH /applications/:id/shortlist
     * Update application status to SHORTLISTED.
     */
    async shortlist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const application = await applicationService.shortlistApplication(id as string);
            sendSuccess(res, application);
        } catch (error) {
            next(error);
        }
    }
}

export const applicationController = new ApplicationController();
