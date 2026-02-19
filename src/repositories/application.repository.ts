import prisma from "../config/prisma";
import { ApplicationStatus, Application, Candidate } from "@prisma/client";

/**
 * Repository for Application entity.
 * Handles database operations for candidate job applications.
 */
export class ApplicationRepository {
    /**
     * Creates a new application record.
     */
    async create(data: {
        candidateId: string;
        jobId: string;
        eligibilityScore: number;
        status: ApplicationStatus;
    }) {
        return prisma.application.create({
            data: {
                candidateId: Number(data.candidateId),
                jobId: Number(data.jobId),
                eligibilityScore: data.eligibilityScore,
                status: data.status,
            },
            include: {
                candidate: true,
                job: true,
            },
        });
    }

    /**
     * Finds an application by ID.
     */
    async findById(id: string) {
        return prisma.application.findUnique({
            where: { id: Number(id) },
            include: {
                candidate: true,
                job: true,
            },
        });
    }

    /**
     * Finds all applications for a specific job.
     * Includes Candidate data for sorting by experience.
     */
    async findByJobId(jobId: string): Promise<(Application & { candidate: Candidate })[]> {
        return prisma.application.findMany({
            where: { jobId: Number(jobId) },
            include: {
                candidate: true,
            },
        });
    }

    /**
     * Updates an application's status.
     */
    async updateStatus(id: string, status: ApplicationStatus) {
        return prisma.application.update({
            where: { id: Number(id) },
            data: { status },
        });
    }
}

export const applicationRepository = new ApplicationRepository();
