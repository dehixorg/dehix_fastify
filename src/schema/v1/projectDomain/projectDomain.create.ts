import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createProjectDomainSchema: FastifySchema = {
  description: "API for creating Project-Domain",
  tags: ["Project_Domain"],
  body: {
    type: "object",
    properties: {
      label: { type: "string" },
      description: { type: "string" },
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
