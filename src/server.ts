// -------------------------------------------------
// Server Entry Point
// -------------------------------------------------
// This file ONLY starts the HTTP server.
// All app configuration is in app.ts.
//
// Why separate?
// - Tests import `app` from app.ts and use supertest
//   to make requests — no real server needed.
// - This file is the only place that calls .listen()
// -------------------------------------------------

import dotenv from "dotenv";

// Load environment variables FIRST, before any other imports
// that might depend on them (e.g., DATABASE_URL in Prisma)
dotenv.config();

import app from "./app";
import prisma from "./config/prisma";

const PORT = process.env.PORT || 3000;

/**
 * Retries database connection before starting the server.
 * This prevents crash loops if the DB is booting up.
 */
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

let isDbConnected = false;
let dbError: string | null = null;

/**
 * Runs migrations and connects to DB in the background.
 * This ensures the server can start and respond to health checks immediately.
 */
async function initializeInfrastructure() {
  console.log("⏳ Starting background infrastructure initialization...");

  // 1. Run Migrations
  try {
    console.log("🏃 Running Prisma migrations...");
    const { stdout, stderr } = await execAsync("npx prisma migrate deploy");
    console.log("Prisma Migrate:", stdout);
    if (stderr) console.warn("Prisma Migrate Warning:", stderr);
  } catch (err: any) {
    console.error("❌ Migration failed:", err.message);
    dbError = `Migration failed: ${err.message}`;
  }

  // 2. Connect to Database
  let retries = 5;
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log("✅ Database connection established");
      isDbConnected = true;
      dbError = null;
      return;
    } catch (err: any) {
      retries -= 1;
      dbError = `Connection failed: ${err.message}`;
      console.error(`❌ DB connection failed. Retries left: ${retries}`);
      if (retries > 0) await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.error("⚠️ Max retries reached. Server will stay alive but DB features will fail.");
}

async function startServer() {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`
╔══════════════════════════════════════════════╗
║   🚀  Kovon API Server                      ║
╚══════════════════════════════════════════════╝
Port:      ${PORT}
Host:      0.0.0.0
Swagger:   /api-docs
Health:    /health
Environment: ${process.env.NODE_ENV || "production"}
      `);
  });


  // Handle health checks with DB status
  app.get("/health", (_req, res) => {
    res.status(isDbConnected ? 200 : 503).json({
      status: isDbConnected ? "ok" : "degraded",
      database: isDbConnected ? "connected" : "disconnected",
      error: dbError,
      timestamp: new Date().toISOString()
    });
  });

  // Provide clear status on root
  app.get("/", (_req, res) => {
    res.json({
      message: "Kovon Job Marketplace API is running 🚀",
      database: isDbConnected ? "connected" : "disconnected",
      error: dbError,
      docs: "/api-docs",
      health: "/health"
    });
  });

  // Start infra in background
  initializeInfrastructure().catch(err => {
    console.error("💥 Background infra error:", err);
  });
}

startServer().catch((err) => {
  console.error("💥 Fatal error during server start:", err);
  process.exit(1);
});


