import { FastifySchema } from "fastify";

export const deleteConsultantSchema: FastifySchema = {
  description: "API to delete consultant data",
  tags: ["Consultant"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
    },
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
