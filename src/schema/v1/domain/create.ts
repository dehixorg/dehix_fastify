import { FastifySchema } from "fastify";

export const addDomainSchema: FastifySchema = {
  description: "API to add a new domain",
  tags: ["Domain"],
  body: {
    type: "object",
    properties: {
      label: {
        type: "string",
      },
    },
    required: ["label"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message:{
          type:"string"
        }
      },
    },
    400: {
      description: "Bad Request",
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
