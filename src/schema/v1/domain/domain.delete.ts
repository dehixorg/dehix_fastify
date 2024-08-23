import { FastifySchema } from "fastify";

export const deleteDomainSchema: FastifySchema = {
  description: "API to delete domain data",
  tags: ["Domain"],
  params: {
    type: "object",
    properties: {
      domain_id: {
        type: "string",
        description: "The ID of the domain",
      },
    },
    required: ["domain_id"],
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
