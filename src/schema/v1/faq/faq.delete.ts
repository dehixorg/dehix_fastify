import { FastifySchema } from "fastify";

export const deleteFaqSchema: FastifySchema = {
  description: "API to faq data",
  tags: ["Faq"],
  params: {
    type: "object",
    properties: {
      faq_id: {
        type: "string",
        description: "The ID of the faq",
      },
    },
    required: ["faq_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
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
