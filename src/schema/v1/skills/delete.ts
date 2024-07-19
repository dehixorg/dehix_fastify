import { FastifySchema } from "fastify";

export const deleteSkillSchema: FastifySchema = {
  description: "API to delete a domain",
  tags: ["Skills"],
  params: {
    type: "object",
    properties: {
      skill_id: {
        type: "string",
      },
    },
    required: ["skill_id"],
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
