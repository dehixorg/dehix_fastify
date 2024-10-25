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
          type: "array",
          items: {
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
    },
    401: {
      description: "Unauthorized",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
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
    403: {
      description: "Forbidden",
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
        code: { type: "string" },
      },
    },
  },
};
