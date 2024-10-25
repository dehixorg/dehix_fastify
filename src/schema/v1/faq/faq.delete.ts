import { FastifySchema } from "fastify";

export const deleteFaqSchema: FastifySchema = {
  description: "API to delete a Faq",
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
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      description: "Forbidden",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
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
