import { FastifySchema } from "fastify";

export const getProjectSchema: FastifySchema = {
  description: "API to get Project profile data",
  tags: ["Project"],
  response: {
    200: {
      type: "object",
      data: {
        type: "object",
        properties: {
          _id: { type: "string" },
          projectName: { type: "string" },
          description: { type: "string" },
          email: { type: "string" },
          verified: { type: "object" },
          isVerified: { type: "string" },
          companyName: { type: "string" },
          start: { type: "string", format: "date-time" },
          end: { type: "string", format: "date-time" },
          skillsRequired: {
            type: "array",
            items: { type: "string" },
          },
          experience: { type: "string" },
          role: { type: "string" },
          projectType: { type: "string" },
          totalNeedOfFreelancer: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category: { type: "string" },
                needOfFreelancer: { type: "number" },
                appliedCandidates: {
                  type: "array",
                  items: { type: "string" },
                },
                rejected: {
                  type: "array",
                  items: { type: "string" },
                },
                accepted: {
                  type: "array",
                  items: { type: "string" },
                },
                status: { type: "string" },
              },
            },
          },
          status: { type: "string" },
          team: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
    404: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        code: {
          type: "string",
        },
      },
    },
    403: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
