import { FastifySchema } from "fastify";

export const getBusinessSchema: FastifySchema = {
  description: "API to get business data by business id",
  tags: ["Business"],
  response: {
    404: {
      description: "Not Found",
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
      description: "Forbidden",
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
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getAllBusinessSchema: FastifySchema = {
  description: "API to get all business data",
  tags: ["Business"],
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "array",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            companyName: { type: "string" },
            companySize: { type: "string" },
            password: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            position: { type: "string" },
            refer: { type: "string", nullable: true },
            verified: { type: "string", nullable: true },
            isVerified: { type: "boolean" },
            linkedin: { type: "string" },
            personalWebsite: { type: "string" },
            isBusiness: { type: "boolean" },
            connects: { type: "integer" },
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
                  status: {
                    type: "string",
                    enum: ["Pending", "Approved", "Rejected"],
                  },
                  _id: { type: "string" },
                },
              },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            __v: { type: "integer" },
            status: {
              type: "string",
              enum: ["Notverified", "Verified", "Pending"],
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
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
      description: "Forbidden",
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
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getBusinessProjectSchema: FastifySchema = {
  description: "API to get business project data",
  tags: ["Project"],
  querystring: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["Active", "Pending", "Completed", "Rejected"],
        description: "Filter projects by status",
      },
    },
  },
  response: {
    404: {
      description: "Not Found",
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
      description: "Forbidden",
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
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
