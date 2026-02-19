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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║   🚀  Kovon API Server                      ║
║                                              ║
║   Server:    http://localhost:${PORT}           ║
║   Swagger:   http://localhost:${PORT}/api-docs  ║
║   Health:    http://localhost:${PORT}/health     ║
║                                              ║
║   Environment: ${process.env.NODE_ENV || "development"}               ║
╚══════════════════════════════════════════════╝
  `);
});
