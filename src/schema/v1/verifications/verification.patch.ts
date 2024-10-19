import { FastifySchema } from "fastify";

export const updateVerificationStatusSchema: FastifySchema = {
  description: "API to update verification status by document id",
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
  params: {
    type: "object",
    properties: {
      document_id: {
        type: "string",
        description: "ID of the document",
      },
    },
    required: [],
  },
  body: {
    type: "object",
    properties: {
      verification_status: {
        type: "string",
        enum: ["Pending", "Approved", "Denied"],
        description: "The new verification status",
      },
      comments: {
        type: "string",
        description: "The new verification comment",
      },
    },
    required: [],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        updatedVerification: {
          type: "object",
          properties: {
            verifier_id: { type: "string" },
            verification_status: { type: "string" },
          },
        },
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
