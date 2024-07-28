import { FastifySchema } from "fastify";

export const getAllFaqSchema: FastifySchema = {
  description: "API to get all Faqs",
  tags: ["Faq"],
  response: {
    200: {
      description: "Success",
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
  },
};
