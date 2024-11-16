import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

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

    ...commonErrorResponses,
  },
};
