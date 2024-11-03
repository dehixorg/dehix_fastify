import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

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
    ...commonErrorResponses
  },
};
