import { FastifySchema } from "fastify";

export const createFaqSchema: FastifySchema = {
  description: "API for creating Faq",
  tags: ["Faq"],
  body: {
    type: "object",
    properties: {
      _id: { type: "string" },
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
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
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
