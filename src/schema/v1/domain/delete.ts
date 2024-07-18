import { FastifySchema } from "fastify";

export const deleteDomainSchema: FastifySchema = {
  description: "API to delete a domain",
  tags: ["Domain"],
  params: {
    type: "object",
    properties: {
      domain_id: {
        type: "string",
      },
    },
    required: ["domain_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
    404: {
      description: "Not Found",
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
      description: "Server Error",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
