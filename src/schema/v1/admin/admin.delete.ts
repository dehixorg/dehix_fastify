import { FastifySchema } from "fastify";

export const deleteAdminSchema: FastifySchema = {
  description: "API to delete admin data",
  tags: ["Admin"],
  params: {
    type: "object",
    properties: {
      admin_id: {
        type: "string",
        description: "The ID of the admin",
      },
    },
    required: ["admin_id"],
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
