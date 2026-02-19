import { Router } from "express";
import { applicationController } from "../controllers/application.controller";
import { validate } from "../middlewares/validate";
import { createApplicationSchema } from "../validators/application.validator";

const router = Router();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationInput'
 *     responses:
 *       201:
 *         description: Application created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post(
    "/",
    validate(createApplicationSchema),
    applicationController.create
);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: List and Search Applications
 *     description: |
 *       Lists applications for a specific job role. 
 *       Includes **Smart Sorting** logic (Business Rule 5.1):
 *       1. **ELIGIBLE/SHORTLISTED** candidates first.
 *       2. Then sorted by **Highest Eligibility Score** (descending).
 *       3. Then sorted by **Higher Experience** (descending).
 *       
 *       You can also filter specifically for **SHORTLISTED** candidates using the `status` parameter.
 *     tags: [Applications]
 *     parameters:
 *       - in: query
 *         name: jobId
 *         required: true
 *         description: The ID of the job to list applications for.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         description: Filter by application status (e.g., SHORTLISTED to see only shortlisted candidates).
 *         schema:
 *           $ref: '#/components/schemas/ApplicationStatus'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Sorted and filtered list of applications.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 * 
 * /applications/{id}/shortlist:
 *   patch:
 *     summary: Shortlist an Eligible Candidate
 *     description: |
 *       Updates an application status to **SHORTLISTED**.
 *       **Enforcement Rule**: Only candidates with status `ELIGIBLE` can be shortlisted.
 *       If a candidate is `REJECTED`, this operation will fail.
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the application to shortlist.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidate successfully shortlisted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: |
 *           Operation failed. Possible reasons:
 *           - Candidate is already REJECTED.
 *           - Application not found.
 */
router.patch("/:id/shortlist", applicationController.shortlist);

export default router;
