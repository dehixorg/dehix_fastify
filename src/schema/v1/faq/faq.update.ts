import { FastifySchema } from "fastify";

export const updateFaqSchema: FastifySchema = {
  description: "API to update a Faq",
  tags: ["Faq"],
  body: {
    type: "object",
    properties: {
      question: { type: "string" },
      answer: { type: "string" },
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
            _id: { type: "string" },
            question: { type: "string" },
            answer: { type: "string" },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
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
      description: "Forbidden",
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
    404: {
      description: "Faq not found",
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
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
