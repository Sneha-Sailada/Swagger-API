import prisma from "../config/prisma";
import { CreateJobInput } from "../validators/job.validator";

/**
 * Repository for Job entity.
 * Encapsulates all Prisma database operations for Jobs.
 */
export class JobRepository {
    /**
     * Creates a new job role in the database.
     */
    async create(data: CreateJobInput) {
        return prisma.job.create({
            data,
        });
    }

    /**async getCandidate(id: string) {
  return prisma.candidate.findUnique({
    where: { id: Number(id) }
  });
     * Finds a job by ID.
     */
    async findById(id: string) {
        return prisma.job.findUnique({
            where: { id: Number(id) }
        });
    }

    /**
     * Finds all job roles.
     */
    async findAll() {
        return prisma.job.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
}

export const jobRepository = new JobRepository();
