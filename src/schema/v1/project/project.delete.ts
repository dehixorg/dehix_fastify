import { FastifySchema } from "fastify";

export const deleteProjectSchema: FastifySchema = {
  description: "API to delete a project by ID",
  tags: ["Project"],
  params: {
    type: "object",
    properties: {
      projectId: { type: "string" },
    },
    required: ["project_id"],
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
      description: "Not Found",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      description: "Forbidden",
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
