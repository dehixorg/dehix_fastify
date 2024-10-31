import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createSkillSchema: FastifySchema = {
  description: "API for creating Skill",
  tags: ["Skills"],
  body: {
    type: "object",
    properties: {
      label: { type: "string" },
      description: { type: "string" },
      createdBy: {
        type: "string",
      },
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
    ...commonErrorResponses
  },
};
