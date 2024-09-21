import { FastifySchema } from "fastify";

export const getSkillByIdSchema: FastifySchema = {
  description: "API to get skill data",
  tags: ["Skills"],
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            label: { type: "string" },
            description: { type: "string" },
           createdBy: { "type": "string" },
        createdAt: {
          "type": "string",
          "format": "date-time"
        }
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
