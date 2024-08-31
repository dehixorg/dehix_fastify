import { FastifySchema } from "fastify";

export const deleteProjectDomainSchema: FastifySchema = {
  description: "API to delete project-domain data",
  tags: ["Project_Domain"],
  params: {
    type: "object",
    properties: {
      projectDomain_id: {
        type: "string",
        description: "The ID of the project-domain",
      },
    },
    required: ["projectDomain_id"],
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
