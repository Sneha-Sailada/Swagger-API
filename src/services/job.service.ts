import { jobRepository } from "../repositories/job.repository";
import { CreateJobInput } from "../validators/job.validator";
import { AppError } from "../utils/appError";

/**
 * Service for Job module.
 * Holds business logic for job-related operations.
 */
export class JobService {
    /**
     * Creates a new job role.
     */
    async createJob(data: CreateJobInput) {
        return jobRepository.create(data);
    }

    /**
     * Retrieves a job by ID.
     * Throws 404 if not found.
     */
    async getJobById(id: string) {
        const job = await jobRepository.findById(id);
        if (!job) {
            throw new AppError("Job not found", 404);
        }
        return job;
    }

    /**
     * Retrieves all job roles.
     */
    async getAllJobs() {
        return jobRepository.findAll();
    }
}

export const jobService = new JobService();
