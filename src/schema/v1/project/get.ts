import { FastifySchema } from "fastify";

export const getProjectSchema: FastifySchema = {
  description: "API to get Project profile data",
  tags: ["Project"],
  querystring: {
    type: "object",
    properties: {
      location: {
        type: "array",
        items: {
          type: "string",
        },
      },
      jobType: {
        type: "array",
        items: {
          type: "string",
        },
      },
      domain: {
        type: "array",
        items: {
          type: "string",
        },
      },
      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },

  },
  response: {
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
};
