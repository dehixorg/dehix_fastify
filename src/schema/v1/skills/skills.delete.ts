import { FastifySchema } from "fastify";

export const deleteSkillSchema: FastifySchema = {
  description: "API to delete skill data",
  tags: ["Skills"],
  params: {
    type: "object",
    properties: {
      skill_id: {
        type: "string",
        description: "The ID of the skill",
      },
    },
    required: ["skill_id"],
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
