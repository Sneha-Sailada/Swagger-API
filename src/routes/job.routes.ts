import { Router } from "express";
import { jobController } from "../controllers/job.controller";
import { validate } from "../middlewares/validate";
import { createJobSchema } from "../validators/job.validator";

const router = Router();

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job role
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post(
    "/",
    validate(createJobSchema),
    jobController.create
);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all job roles
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/", jobController.getAll);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 */
router.get("/:id", jobController.getById);

export default router;
