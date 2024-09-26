import { FastifySchema } from "fastify";

export const updateSkillSchema: FastifySchema = {
  description: "API for update skill",
  tags: ["Skills"],
  body: {
    type: "object",
    properties: {
      label: { type: "string" },
      description: { type: "string" },
      status: { type: "string" },
    },
    required: [],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            label: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
          },
        },
      },
    },
    401: {
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
