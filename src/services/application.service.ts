import { applicationRepository } from "../repositories/application.repository";
import { candidateService } from "./candidate.service";
import { jobService } from "./job.service";
import { calculateEligibilityScore, determineEligibility } from "../utils/eligibility";
import { ApplicationStatus, Application, Candidate } from "@prisma/client";
import { AppError } from "../utils/appError";

/**
 * Type representing an Application with its associated Candidate.
 */
export type ApplicationWithCandidate = Application & {
    candidate: Candidate;
};

/**
 * Service for Application module.
 * Implements core job marketplace business logic.
 */
export class ApplicationService {
    /**
     * Applies a candidate for a job.
     * Computes eligibility score and sets status (ELIGIBLE/REJECTED) based on PRD rules.
     */
    async applyForJob(candidateId: string, jobId: string) {
        // 1. Fetch candidate and job
        const candidate = await candidateService.getCandidateById(candidateId);
        const job = await jobService.getJobById(jobId);

        // 2. Compute eligibility score (Business Rule 4.1)
        const eligibilityScore = calculateEligibilityScore(
            candidate.experience,
            candidate.languageScore,
            candidate.documentsVerified
        );

        // 3. Determine eligibility status (Business Rule 4.2)
        const isEligible = determineEligibility(candidate, job);
        const status = isEligible ? ApplicationStatus.ELIGIBLE : ApplicationStatus.REJECTED;

        // 4. Create and return application
        return applicationRepository.create({
            candidateId,
            jobId,
            eligibilityScore,
            status,
        });
    }

    /**
     * Lists applications for a job with custom sorting, pagination, and status filtering.
     * 
     * Sorting Order (Business Rule 5.1):
     *   1. ELIGIBLE first
     *   2. Highest eligibilityScore (desc)
     *   3. Higher experience (desc)
     */
    async getApplicationsByJob(
        jobId: string,
        page: number = 1,
        limit: number = 10,
        status?: ApplicationStatus
    ) {
        // 1. Validate job existence
        await jobService.getJobById(jobId);

        // 2. Fetch all applications for this job
        let applications = await applicationRepository.findByJobId(jobId);

        // 2.a Filter by status if provided
        if (status) {
            applications = applications.filter(app => app.status === status);
        }

        // 3. Apply custom sorting logic (PRD Case 3 requirements)
        const sortedApplications = [...applications].sort((a: ApplicationWithCandidate, b: ApplicationWithCandidate) => {
            // Rule 1: ELIGIBLE first
            // Order: SHORTLISTED ≈ ELIGIBLE > REJECTED
            const getPriority = (status: ApplicationStatus) =>
                (status === ApplicationStatus.SHORTLISTED || status === ApplicationStatus.ELIGIBLE) ? 1 : 0;

            const priorityA = getPriority(a.status);
            const priorityB = getPriority(b.status);

            if (priorityA !== priorityB) {
                return priorityB - priorityA; // Descending (1 comes before 0)
            }

            // Rule 2: Highest eligibilityScore
            if (a.eligibilityScore !== b.eligibilityScore) {
                return b.eligibilityScore - a.eligibilityScore; // Descending
            }

            // Rule 3: Higher experience (from Candidate join)
            return b.candidate.experience - a.candidate.experience; // Descending
        });

        // 4. Apply pagination
        const total = sortedApplications.length;
        const startIndex = (page - 1) * limit;
        const paginatedApps = sortedApplications.slice(startIndex, startIndex + limit);

        return {
            applications: paginatedApps,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Shortlists an application (Business Rule 6).
     * Only allowed if current status is ELIGIBLE.
     */
    async shortlistApplication(id: string) {
        const application = await applicationRepository.findById(id);
        if (!application) {
            throw new AppError("Application not found", 404);
        }

        if (application.status === ApplicationStatus.REJECTED) {
            throw new AppError("Cannot shortlist a REJECTED candidate", 400);
        }

        if (application.status === ApplicationStatus.SHORTLISTED) {
            return application; // Already shortlisted
        }

        return applicationRepository.updateStatus(id, ApplicationStatus.SHORTLISTED);
    }
}

export const applicationService = new ApplicationService();
