import { FastifySchema } from "fastify";

export const createConsultantSchema: FastifySchema = {
  description: "API to create consultant data in freelancer",
  tags: ["Consultant"],
  body: {
    type: "object",
    required: [],
    properties: {
      status: {
        type: "string",
      },
      description: {
        type: "string",
      },
      price: {
        type: "number",
      },
      experience: {
        type: "string",
      },
      links: {
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
            _id: { type: "string", format: "uuid" },
            status: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            experience: { type: "string" },
            links: {
              type: "array",
              items: { type: "string" },
            },
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
