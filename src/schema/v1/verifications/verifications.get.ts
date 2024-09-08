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

export const getAllVerificationDataSchema: FastifySchema = {
  description: "API to get all verification request",
  tags: ["Verification"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              verifier_id: {
                type: "string",
              },
              verifier_username: {
                type: "string",
              },
              requester_id: {
                type: "string",
              },
              document_id: {
                type: "string",
              },
              doc_type: {
                type: "string",
              },
              verification_status: {
                type: "string",
              },
            },
            required: [
              "_id",
              "verifier_id",
              "verifier_username",
              "requester_id",
              "document_id",
              "doc_type",
              "verification_status",
            ],
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
