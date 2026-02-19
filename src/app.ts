// -------------------------------------------------
// Express Application Setup
// -------------------------------------------------
// This file configures the Express app with all
// middleware, routes, Swagger, and error handling.
//
// Separated from server.ts so that:
// - Tests can import `app` without starting a server
// - server.ts only handles port binding
// -------------------------------------------------

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec } from "./config/swagger";

const app = express();
app.get("/", (_req, res) => {
  res.json({
    message: "Kovon Job Marketplace API is running 🚀",
    docs: "/api-docs",
    health: "/health"
  });
});


// ----- Global Middleware -----

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for all origins (restrict in production)
app.use(cors());

// ----- API Documentation -----
// Swagger UI available at GET /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ----- Health Check -----
// Simple endpoint to verify the server is running
app.get("/health", (_req, res) => {
    res.json({ success: true, data: { status: "ok", timestamp: new Date().toISOString() } });
});

// ----- API Routes -----
// All routes are prefixed with nothing (flat: /candidates, /jobs, /applications)
app.use("/", routes);

// ----- Global Error Handler -----
// Must be LAST — catches all errors from above
app.use(errorHandler);

export default app;
