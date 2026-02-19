import prisma from "../config/prisma";
import { CreateCandidateInput } from "../validators/candidate.validator";

/**
 * Repository for Candidate entity.
 * Encapsulates all Prisma database operations.
 */
export class CandidateRepository {
    /**
     * Creates a new candidate in the database.
     */
    async create(data: CreateCandidateInput) {
        return prisma.candidate.create({
            data,
        });
    }

    /**
     * Finds a candidate by ID.
     */
    async findById(id: string) {
        return prisma.candidate.findUnique({
            where: { id: Number(id) },
        });
    }

    /**
     * Finds all candidates.
     */
    async findAll() {
        return prisma.candidate.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
}

export const candidateRepository = new CandidateRepository();
