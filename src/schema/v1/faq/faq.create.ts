import { FastifySchema } from "fastify";
import { describe } from "node:test";

export const createFaqSchema: FastifySchema = {
  description: "API to create a Faq",
  tags: ["Faq"],
  body: {
    type: "object",
    properties: {
      question: { type: "string" },
      answer: { type: "string" },
      type: {
        type: "string",
        enum: ["business", "freelancer", "both"],
      },
      status: {
        type: "string",
        enum: ["active", "inactive"],
      },
      importantUrl: {
        type: "array",
        items: {
          type: "object",
          properties: {
            urlName: { type: "string" },
            url: { type: "string" },
          },
        },
      },
    },
    required: ["question", "answer", "type", "status", "importantUrl"],
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
            type: { type: "string" },
            status: { type: "string" },
            importantUrl: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  urlName: { type: "string" },
                  url: { type: "string" },
                },
              },
            },
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
        message: {
          type: "string",
        },
        code: {
          type: "string",
        }
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
  },
};
