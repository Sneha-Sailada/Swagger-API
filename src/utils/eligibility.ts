// -------------------------------------------------
// Eligibility Utility Functions
// -------------------------------------------------
// PURE FUNCTIONS — no database, no Express, no
// side effects. This makes them trivially unit-
// testable.
//
// These implement the PRD's business rules:
//
//   eligibilityScore =
//     (experience × 2) +
//     (languageScore / 10) +
//     (documentsVerified ? 10 : 0)
//
//   ELIGIBLE if:
//     experience ≥ job.minExperience AND
//     languageScore ≥ job.minLanguageScore AND
//     documentsVerified = true
// -------------------------------------------------

/**
 * Calculate the eligibility score for a candidate.
 *
 * Formula (from PRD):
 *   score = (experience × 2) + (languageScore / 10) + (documentsVerified ? 10 : 0)
 *
 * @param experience - Years of experience (≥ 0)
 * @param languageScore - Language test score (0–100)
 * @param documentsVerified - Whether documents are verified
 * @returns The computed eligibility score
 */
export const calculateEligibilityScore = (
    experience: number,
    languageScore: number,
    documentsVerified: boolean
): number => {
    return (experience * 2) + (languageScore / 10) + (documentsVerified ? 10 : 0);
};

/**
 * Determine if a candidate is eligible for a job.
 *
 * A candidate is ELIGIBLE if ALL three conditions are met:
 *   1. experience ≥ job.minExperience
 *   2. languageScore ≥ job.minLanguageScore
 *   3. documentsVerified = true
 *
 * @param candidate - Candidate's profile data
 * @param job - Job's minimum requirements
 * @returns true if eligible, false if rejected
 */
export const determineEligibility = (
    candidate: {
        experience: number;
        languageScore: number;
        documentsVerified: boolean;
    },
    job: {
        minExperience: number;
        minLanguageScore: number;
    }
): boolean => {
    return (
        candidate.experience >= job.minExperience &&
        candidate.languageScore >= job.minLanguageScore &&
        candidate.documentsVerified === true
    );
};
