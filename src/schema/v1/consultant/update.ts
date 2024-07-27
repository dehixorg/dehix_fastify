import { FastifySchema } from "fastify";

export const updateConsultantSchema: FastifySchema = {
  description: "API to update consultant data freelance",
  tags: ["Consultant"],
  params: {
    type: "object",
    properties: {
      consultant_id: { type: "string", format: "uuid" },
    },
    required: ["consultant_id"],
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
        items: { type: "string" },
      },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string", format: "uuid" },
            status: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            experience: { type: "string" },
            links: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
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
