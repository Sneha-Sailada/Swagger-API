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
                            Candidate: {
            type: "object",
            required: ["name", "skill", "experience", "languageScore", "documentsVerified"],
            properties: {
                name: { type: "string", example: "Your name here" },
                skill: { type: "string", example: "Your skill (e.g., Electrician / Welder / Plumber)" },
                experience: { type: "integer", example: 0 },
                languageScore: { type: "integer", example: 0 },
                documentsVerified: { type: "boolean", example: false }
            }
        },

        Job: {
            type: "object",
            required: ["title", "country", "minExperience", "minLanguageScore"],
            properties: {
                title: { type: "string", example: "Job title (e.g., Construction Worker)" },
                country: { type: "string", example: "Country name" },
                minExperience: { type: "integer", example: 0 },
                minLanguageScore: { type: "integer", example: 0 }
            }
        },

        Application: {
            type: "object",
            required: ["candidateId", "jobId"],
            properties: {
                candidateId: { type: "integer", example: 1 },
                jobId: { type: "integer", example: 1 }
            }
        },

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
                name: {
                    type: "string",
                    example: "Your name here"
                },
                skill: {
                    type: "string",
                    example: "Electrician / Welder / Plumber"
                },
                experience: {
                    type: "integer",
                    example: 0
                },
                languageScore: {
                    type: "integer",
                    example: 0
                },
                documentsVerified: {
                    type: "boolean",
                    example: false
                }
            }
        },
        JobInput: {
  type: "object",
  required: ["title", "country", "minExperience", "minLanguageScore"],
  properties: {
    title: {
      type: "string",
      example: "Enter job role (e.g., Electrician / Welder / Plumber)"
    },
    country: {
      type: "string",
      example: "Enter country name (e.g., Germany / UAE / Japan)"
    },
    minExperience: {
      type: "integer",
      example: 0
    },
    minLanguageScore: {
      type: "integer",
      example: 0
    }
  }
},

ApplicationInput: {
  type: "object",
  required: ["candidateId", "jobId"],
  properties: {
    candidateId: {
      type: "integer",
      example: 1
    },
    jobId: {
      type: "integer",
      example: 1
    }
  }
},


            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
