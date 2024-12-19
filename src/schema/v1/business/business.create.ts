import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createBusinessSchema: FastifySchema = {
  description: "API to create business data",
  summary: "API to create business data",
  tags: ["Register"],
  body: {
    type: "object",
    required: [
      "firstName",
      "lastName",
      "companyName",
      "companySize",
      "email",
      "phone",
      "position",
      "refer",
      "verified",
      "isVerified",
      "linkedin",
      "personalWebsite",
      "isBusiness",
      "connects",
    ],
    properties: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      companyName: {
        type: "string",
      },
      profilePic: {
        type: "string",
      },
      password: {
        type: "string",
      },
      companySize: {
        type: "string",
      },
      email: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      position: {
        type: "string",
      },
      refer: {
        type: "string",
      },
      verified: {
        type: "string",
      },
      isVerified: {
        type: "boolean",
        default: false,
      },
      linkedin: {
        type: "string",
      },
      personalWebsite: {
        type: "string",
      },
      isBusiness: {
        type: "boolean",
        default: true,
      },
      connects: {
        type: "integer",
        default: 0,
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
            _id: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
