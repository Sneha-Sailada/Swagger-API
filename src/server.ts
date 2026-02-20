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
async function startServer() {
  let retries = 5;
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log("✅ Database connection established");
      break;
    } catch (err) {
      retries -= 1;
      console.error(`❌ Database connection failed. Retries left: ${retries}`);
      if (retries === 0) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`
╔══════════════════════════════════════════════╗
║   🚀  Kovon API Server                      ║
║                                              ║
║   Port:      ${PORT}                            ║
║   Host:      0.0.0.0                         ║
║   Swagger:   /api-docs                       ║
║   Health:    /health                         ║
║                                              ║
║   Environment: ${process.env.NODE_ENV || "development"}               ║
╚══════════════════════════════════════════════╝
      `);
  });
}

startServer();

