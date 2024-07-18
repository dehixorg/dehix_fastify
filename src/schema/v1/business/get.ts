import { FastifySchema } from "fastify";

export const getBusinessSchema: FastifySchema = {
  description: "API to get BUSINESS profile data",
  tags: ["Business"],
  response: {
    200: {
      type: "object",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          companyName: { type: "string" },
          companySize: { type: "string" },
          password: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          position: { type: "string" },
          refer: { type: "string" },
          verified: { type: "string" },
          isVerified: { type: "boolean" },
          linkedin: { type: "string" },
          personalWebsite: { type: "string" },
          isBusiness: { type: "boolean" },
          connects: { type: "number" },
          otp: { type: "string" },
          otpverified: { type: "string" },
          ProjectList: {
            type: "array",
            items: { type: "string" },
          },
          Appliedcandidates: {
            type: "array",
            items: { type: "string" },
          },
          hirefreelancer: {
            type: "array",
            items: {
              type: "object",
              properties: {
                freelancer: { type: "string" },
                status: { type: "string" },
              },
            },
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
