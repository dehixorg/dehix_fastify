import { FastifySchema } from "fastify";

export const updateVerificationStatusSchema: FastifySchema = {
  description: "API to update verification status",
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

export const updateVerificationCommentSchema: FastifySchema = {
  description: "API to update verification status",
  tags: ["Verification"],
  params: {
    type: "object",
    properties: {
      verification_id: {
        type: "string",
        description: "Verification ID",
      },
    },
  },
  body: {
    type: "object",
    properties: {
      comment: {
        type: "string",
        description: "The new verification comment",
      },
      verifiedAt: {
        type: "string",
        format: "date-time",
      },
      verification_status: {
        type: "string",
        enum: [ "pending", "approved", "denied" ],
      }
    },
    required: [],
  },
  response: {
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
