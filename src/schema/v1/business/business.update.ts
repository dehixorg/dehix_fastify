import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";
import { BusinessStatusEnum } from "../../../models/business.entity";

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
      profilePic: {
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

export const updateBusinessStatusSchema = {
  description: "API to update business status",
  tags: ["Business"],
  body: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: Object.values(BusinessStatusEnum), // Allowed values for status
        description: "The status of the business",
      },
    },
    required: ["status"], // status is required
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
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
