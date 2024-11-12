import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createDomainSchema: FastifySchema = {
  description: "API for creating Domain",
  tags: ["Domain"],
  body: {
    type: "object",
    properties: {
      label: { type: "string" },
      description: { type: "string" },
      createdBy: { type: "string" },
      status: { type: "string" },
    },
    required: ["label"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            label: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
