import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getVerificationDataSchema: FastifySchema = {
  description: "API to get verification data by verifier id",
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
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              companyName: { type: "string" },
              companySize: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              position: { type: "string" },
              refer: { type: "string" },
              verified: { type: "string" },
              isVerified: { type: "boolean" },
              linkedin: { type: "string" },
              personalWebsite: { type: "string" },
              isBusiness: { type: "boolean" },
              connects: { type: "integer" },
              ProjectList: {
                type: "array",
                items: { type: "string" },
              },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
              __v: { type: "integer" },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getAllVerificationDataSchema: FastifySchema = {
  description: "API to get all verification data",
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
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              verifier_id: { type: "string" },
              verifier_username: { type: "string" },
              requester_id: { type: "string" },
              document_id: { type: "string", nullable: true }, // document_id can be null in some records
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
