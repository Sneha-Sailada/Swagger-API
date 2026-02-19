import { candidateRepository } from "../repositories/candidate.repository";
import { CreateCandidateInput } from "../validators/candidate.validator";
import { AppError } from "../utils/appError";

/**
 * Service for Candidate module.
 * Holds business logic for candidate-related operations.
 */
export class CandidateService {
    /**
     * Creates a new candidate.
     */
    async createCandidate(data: CreateCandidateInput) {
        return candidateRepository.create(data);
    }

    /**
     * Retrieves a candidate by ID.
     * Throws 404 if not found.
     */
    async getCandidateById(id: string) {
        const candidate = await candidateRepository.findById(id);
        if (!candidate) {
            throw new AppError("Candidate not found", 404);
        }
        return candidate;
    }

    /**
     * Retrieves all candidates.
     */
    async getAllCandidates() {
        return candidateRepository.findAll();
    }
}

export const candidateService = new CandidateService();
