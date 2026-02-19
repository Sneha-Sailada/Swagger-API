// -------------------------------------------------
// Swagger / OpenAPI Configuration
// -------------------------------------------------
// Generates API documentation from JSDoc comments
// in route files. Served at /api-docs.
// -------------------------------------------------

import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Kovon Job Marketplace API",
            version: "1.0.0",
            description:
                "REST API for candidate application and shortlisting in the Kovon job marketplace. " +
                "Connects Indian blue & grey collar workers to global employers.",
            contact: {
                name: "Kovon API Support",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                // Reusable response wrapper
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        data: { type: "object" },
                        error: { type: "string" },
                        meta: {
                            type: "object",
                            properties: {
                                page: { type: "integer" },
                                limit: { type: "integer" },
                                total: { type: "integer" },
                                totalPages: { type: "integer" },
                            },
                        },
                    },
                },
                Candidate: {
                    type: "object",
                    required: ["name", "skill", "experience", "languageScore", "documentsVerified"],
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "John Doe" },
                        skill: { type: "string", example: "Electrician" },
                        experience: { type: "integer", example: 5 },
                        languageScore: { type: "integer", example: 85 },
                        documentsVerified: { type: "boolean", example: true },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                Job: {
                    type: "object",
                    required: ["title", "country", "minExperience", "minLanguageScore"],
                    properties: {
                        id: { type: "integer", example: 1 },
                        title: { type: "string", example: "Construction Worker" },
                        country: { type: "string", example: "Germany" },
                        minExperience: { type: "integer", example: 2 },
                        minLanguageScore: { type: "integer", example: 60 },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                JobInput: {
                    type: "object",
                    required: ["title", "country", "minExperience", "minLanguageScore"],
                    properties: {
                        title: { type: "string", example: "Electrician" },
                        country: { type: "string", example: "UAE" },
                        minExperience: { type: "integer", example: 0 },
                        minLanguageScore: { type: "integer", example: 0 }
                    }
                },
                ApplicationStatus: {
                    type: "string",
                    enum: ["ELIGIBLE", "REJECTED", "SHORTLISTED"],
                    example: "SHORTLISTED"
                },
                Application: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        candidateId: { type: "integer", example: 1 },
                        jobId: { type: "integer", example: 1 },
                        eligibilityScore: { type: "number", format: "float", example: 25.5 },
                        status: { $ref: "#/components/schemas/ApplicationStatus" },
                        createdAt: { type: "string", format: "date-time" },
                        candidate: { $ref: "#/components/schemas/Candidate" }
                    }
                },
                ApplicationInput: {
                    type: "object",
                    required: ["candidateId", "jobId"],
                    properties: {
                        candidateId: { type: "integer", example: 1 },
                        jobId: { type: "integer", example: 1 }
                    }
                }
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
