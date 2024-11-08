import { FastifySchema } from "fastify";

export const getVerificationDataSchema: FastifySchema = {
  description: "API to get verification data",
  tags: ["Verification"],
  querystring: {
    type: "object",
    properties: {
      doc_type: {
        type: "string",
        enum: [
          "skill",
          "domain",
          "education",
          "project",
          "experience",
          "business",
        ],
        description: "Filter verification request by doc_type",
      },
    },
  },
  params: {
    type: "object",
    properties: {
      verifier_id: {
        type: "string",
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

export const getAllVerificationDataSchema: FastifySchema = {
  description: "API to get all verification request",
  tags: ["Verification"],
  querystring: {
    type: "object",
    properties: {
      doc_type: {
        type: "string",
        enum: [
          "skill",
          "domain",
          "education",
          "project",
          "experience",
          "business",
        ],
        description: "Filter verification request by doc_type",
      },
      type: {
        type: "string",
        enum: [
          "freelancer",
          "admin"
        ]
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
