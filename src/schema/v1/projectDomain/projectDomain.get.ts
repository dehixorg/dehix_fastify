import { FastifySchema } from "fastify";

export const getAllProjectDomainSchema: FastifySchema = {
  description: "API to get all projectDomain",
  tags: ["Project_Domain"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              label: {
                type: "string",
              },
            },
            required: ["_id", "label"],
          },
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
  },
};