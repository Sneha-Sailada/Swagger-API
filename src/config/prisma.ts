// -------------------------------------------------
// Prisma Client Singleton
// -------------------------------------------------
// Why a singleton?
// Creating multiple PrismaClient instances opens
// multiple DB connection pools — wastes resources
// and can hit PostgreSQL's connection limit.
// One instance, shared across the entire app.
// -------------------------------------------------

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
});

export default prisma;
