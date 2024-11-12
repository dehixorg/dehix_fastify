import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updateBusinessSchema: FastifySchema = {
  description: "API to update business",
  tags: ["Business"],
  body: {
    type: "object",
    required: [],
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
      companySize: {
        type: "string",
      },
      password: {
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
      verified: {},
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
      ProjectList: {
        type: "array",
        items: {
          type: "string",
        },
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
            email: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
