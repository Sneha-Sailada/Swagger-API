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
 *     summary: List applications for a job (Sorted)
 *     tags: [Applications]
 *     parameters:
 *       - in: query
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sorted list of applications
 */
router.get("/", applicationController.getByJob);

/**
 * @swagger
 * /applications/{id}/shortlist:
 *   patch:
 *     summary: Shortlist a candidate
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Candidate shortlisted
 *       400:
 *         description: Candidate rejected (low eligibility)
 */
router.patch("/:id/shortlist", applicationController.shortlist);

export default router;
