import { ApplicationService, ApplicationWithCandidate } from "../../src/services/application.service";
import { applicationRepository } from "../../src/repositories/application.repository";
import { jobService } from "../../src/services/job.service";
import { ApplicationStatus } from "@prisma/client";

// Mock repositories and services
jest.mock("../../src/repositories/application.repository");
jest.mock("../../src/services/job.service");

describe("ApplicationService Sorting", () => {
    let applicationService: ApplicationService;

    beforeEach(() => {
        applicationService = new ApplicationService();
        jest.clearAllMocks();
    });

    test("Case 3: Applications should be sorted correctly (Eligible > Score > Experience)", async () => {
        const mockJobId = "job-uuid";

        // Mock applications according to PRD Case 3:
        // Candidate A: Score=30, Status=ELIGIBLE (Experience will be mocked below)
        // Candidate B: Score=40, Status=ELIGIBLE
        // Candidate C: Score=50, Status=REJECTED
        const mockApplications: Partial<ApplicationWithCandidate>[] = [
            {
                id: "app-a",
                status: ApplicationStatus.ELIGIBLE,
                eligibilityScore: 30,
                candidate: { experience: 3 } as any,
            },
            {
                id: "app-b",
                status: ApplicationStatus.ELIGIBLE,
                eligibilityScore: 40,
                candidate: { experience: 5 } as any,
            },
            {
                id: "app-c",
                status: ApplicationStatus.REJECTED,
                eligibilityScore: 50,
                candidate: { experience: 10 } as any,
            },
            {
                id: "app-sh",
                status: ApplicationStatus.SHORTLISTED,
                eligibilityScore: 35,
                candidate: { experience: 2 } as any,
            }
        ];

        (jobService.getJobById as jest.Mock).mockResolvedValue({ id: mockJobId });
        (applicationRepository.findByJobId as jest.Mock).mockResolvedValue(mockApplications);

        const result = await applicationService.getApplicationsByJob(mockJobId, 1, 10);

        // Expected order: 
        // 1. app-b (ELIGIBLE, Score 40)
        // 2. app-sh (SHORTLISTED treated like ELIGIBLE, Score 35)
        // 3. app-a (ELIGIBLE, Score 30)
        // 4. app-c (REJECTED, Score 50)

        expect(result.applications[0].id).toBe("app-b");
        expect(result.applications[1].id).toBe("app-sh");
        expect(result.applications[2].id).toBe("app-a");
        expect(result.applications[3].id).toBe("app-c");
    });

    test("Sorting logic tie-breaker: Experience should be used if scores are same", async () => {
        const mockJobId = "job-uuid";
        const mockApplications: Partial<ApplicationWithCandidate>[] = [
            {
                id: "app-1",
                status: ApplicationStatus.ELIGIBLE,
                eligibilityScore: 30,
                candidate: { experience: 2 } as any,
            },
            {
                id: "app-2",
                status: ApplicationStatus.ELIGIBLE,
                eligibilityScore: 30,
                candidate: { experience: 5 } as any,
            }
        ];

        (jobService.getJobById as jest.Mock).mockResolvedValue({ id: mockJobId });
        (applicationRepository.findByJobId as jest.Mock).mockResolvedValue(mockApplications);

        const result = await applicationService.getApplicationsByJob(mockJobId, 1, 10);

        // Same score, app-2 has more experience
        expect(result.applications[0].id).toBe("app-2");
        expect(result.applications[1].id).toBe("app-1");
    });
});
