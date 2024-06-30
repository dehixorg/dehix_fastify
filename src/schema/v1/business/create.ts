import { FastifySchema } from "fastify";

export const createBusinessSchema: FastifySchema = {
  description: "API to create business data",
  tags: ["Business"],
  body: {
    type: "object",
    required: [
      "firstName",
      "lastName",
      "companyName",
      "companySize",
      "password",
      "email",
      "phone",
      "isBusiness",
    ],
    properties: {
      _id: {
        type: "string",
        format: "uuid",
      },
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
      otp: {
        type: "string",
      },
      otpverified: {
        type: "string",
      },
      ProjectList: {
        type: "array",
        items: {
          type: "string",

        },
      },
      Appliedcandidates: {
        type: "array",
        items: {
          type: "string",

        },
      },
      hirefreelancer: {
        type: "array",
        items: {
          type: "object",
          properties: {
            freelancer: {
              type: "string",
    
            },
            status: {
              type: "string",
              default: "Pending",
            },
          },
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
