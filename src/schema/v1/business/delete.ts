import { FastifySchema } from "fastify";

export const deleteHireFreelancerSchema: FastifySchema = {
  description: "API to delete project freelancer",
  tags: ["Business"],
  body: {
    type: "object",
    properties: {
      freelancer: {
        type: "string",
        format: "freelancer_id"
      }
    },
    "required": ["freelancer"]
  },  
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
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
};