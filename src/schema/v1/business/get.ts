import { FastifySchema } from "fastify";
import { updateBusinessSchema } from "./update";

export const getFreelancerSchema: FastifySchema = {
  description: "API to get Business profile data",
  tags: ["Business"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: updateBusinessSchema.body,
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
