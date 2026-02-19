import { calculateEligibilityScore, determineEligibility } from "../../src/utils/eligibility";

describe("Eligibility Utility Functions", () => {
    describe("calculateEligibilityScore", () => {
        test("Case 1: Eligible candidate score calculation", () => {
            // Candidate: experience=3, languageScore=70, docs=true
            // Formula: (3*2) + (70/10) + 10 = 6 + 7 + 10 = 23
            const score = calculateEligibilityScore(3, 70, true);
            expect(score).toBe(23);
        });

        test("Case 2: Low score candidate calculation", () => {
            // Candidate: experience=1, languageScore=55, docs=false
            // Formula: (1*2) + (55/10) + 0 = 2 + 5.5 + 0 = 7.5
            const score = calculateEligibilityScore(1, 55, false);
            expect(score).toBe(7.5);
        });
    });

    describe("determineEligibility", () => {
        test("Case 1: Eligible candidate should return true", () => {
            const candidate = {
                experience: 3,
                languageScore: 70,
                documentsVerified: true
            };
            const job = {
                minExperience: 2,
                minLanguageScore: 60
            };
            expect(determineEligibility(candidate, job)).toBe(true);
        });

        test("Case 2: Low languageScore should return false", () => {
            const candidate = {
                experience: 3,
                languageScore: 55, // Less than job.minLanguageScore
                documentsVerified: true
            };
            const job = {
                minExperience: 2,
                minLanguageScore: 60
            };
            expect(determineEligibility(candidate, job)).toBe(false);
        });

        test("Case 2.b: Documents not verified should return false", () => {
            const candidate = {
                experience: 3,
                languageScore: 70,
                documentsVerified: false // Required to be true
            };
            const job = {
                minExperience: 2,
                minLanguageScore: 60
            };
            expect(determineEligibility(candidate, job)).toBe(false);
        });

        test("Case 2.c: Low experience should return false", () => {
            const candidate = {
                experience: 1, // Less than job.minExperience
                languageScore: 70,
                documentsVerified: true
            };
            const job = {
                minExperience: 2,
                minLanguageScore: 60
            };
            expect(determineEligibility(candidate, job)).toBe(false);
        });
    });
});
