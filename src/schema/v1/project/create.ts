import { FastifySchema } from "fastify";

export const createProjectSchema: FastifySchema = {
  description: "API to create project data",
  tags: ["Project"],
  body: {
    type: "object",
    required: [
      "projectName",
      "description",
      "companyId",
      "email",
      "companyName",
      "skillsRequired",
      "role",
      "projectType",
    ],
    properties: {
      _id: {
        type: "string",
        format: "uuid",
      },
      projectName: {
        type: "string",
      },
      description: {
        type: "string",
      },
      companyId: {
        type: "string",
      },
      email: {
        type: "string",
      },
      verified: {
        type: "string",
      },
      isVerified: {
        type: "string",
      },
      companyName: {
        type: "string",
      },
      start: {
        type: "string",
        format: "date-time",
      },
      end: {
        type: "string",
        format: "date-time",
      },
      skillsRequired: {
        type: "array",
        items: {
          type: "string",
        },
      },
      experience: {
        type: "string",
      },
      role: {
        type: "string",
      },
      projectType: {
        type: "string",
      },
      totalNeedOfFreelancer: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: {
              type: "string",
            },
            needOfFreelancer: {
              type: "integer",
            },
            appliedCandidates: {
              type: "array",
              items: {
                type: "string",
              },
            },
            rejected: {
              type: "array",
              items: {
                type: "string",
              },
            },
            accepted: {
              type: "array",
              items: {
                type: "string",
              },
            },
            status: {
              type: "string",
            },
          },
        },
      },
      status: {
        type: "string",
        enum: ["Active", "Pending", "Completed", "Rejected"],
        default: "Pending",
      },
      team: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            companyId: { type: "string" },
            email: { type: "string" },
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
