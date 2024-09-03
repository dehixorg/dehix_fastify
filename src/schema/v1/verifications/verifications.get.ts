import { FastifySchema } from "fastify";

export const getVerificationDataSchema: FastifySchema = {
  description: "API to get verification data",
  tags: ["Verification"],
  querystring: {
    type: "object",
    properties: {
      doc_type: {
        type: "string",
        enum: ["skill", "domain", "education", "project", "experience"],
        description: "Filter verification request by doc_type",
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
