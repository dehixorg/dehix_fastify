import { FastifySchema } from "fastify";

export const updateConsultantSchema: FastifySchema = {
  description: "API to update consultant data for a freelancer",
  tags: ["Consultant"],
  params: {
    type: "object",
    properties: {
      consultant_id: { type: "string", format: "uuid" },
      freelancer_id: { type: "string" }
    },
    required: ["consultant_id", "freelancer_id"]
  },
  body: {
    type: "object",
    properties: {
      status: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      experience: { type: "string" },
      links: {
        type: "array",
        items: { type: "string" }
      }
    }
  },
  response: {
     200:{
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" }
      }
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" }
      }
    },
    403: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" }
      }
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" }
      }
    }
  }
};
