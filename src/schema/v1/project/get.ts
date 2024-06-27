import { FastifySchema } from "fastify";
import { updateProjectSchema } from "./update";

export const getProjectSchema: FastifySchema = {
  description: "API to get Project profile data",
  tags: ["Project"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: updateProjectSchema.body,
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
