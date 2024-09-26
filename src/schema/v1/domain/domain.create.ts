import { FastifySchema } from "fastify";

export const createDomainSchema: FastifySchema = {
  description: "API for creating Domain",
  tags: ["Domain"],
  body: {
    type: "object",
    properties: {
      label: { type: "string" },
      description: { type: "string" },
      createdBy: { type: "string" },
      status: { type: "string" },
    },
    required: ["label"],
  },
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
