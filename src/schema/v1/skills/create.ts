import { FastifySchema } from "fastify";

export const createSkillSchema: FastifySchema = {
  description: "API to create a new domain",
  tags: ["Skills"],
  body: {
    type: "object",
    properties: {
      label: {
        type: "string",
      },
    },
    required: ["label"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            label: {
              type: "string",
            },
          },
          required: ["_id", "label"],
        },
      },
    },
    400: {
      description: "Bad Request",
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
    500: {
      description: "Server Error",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
