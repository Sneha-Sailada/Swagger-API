// -------------------------------------------------
// Route Aggregator
// -------------------------------------------------
// Mounts all module routers under their base paths.
// New modules are added here as single lines.
//
// Why a separate index?
// - app.ts stays clean — it doesn't need to know
//   about individual route files
// - Easy to see all API routes in one place
// -------------------------------------------------

import { Router } from "express";
import candidateRoutes from "./candidate.routes";
import jobRoutes from "./job.routes";
import applicationRoutes from "./application.routes";

const router = Router();

// Module routes
router.use("/candidates", candidateRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);

export default router;
