import { FastifySchema } from "fastify";

export const getBusinessSchema: FastifySchema = {
  description: "API to get BUSINESS profile data",
  tags: ["Business"],
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

export const getBusinessProjectSchema: FastifySchema = {
  description: "API to get BUSINESS project data",
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

export const getBusinessDetailsSchema: FastifySchema = {
  description: "API to get BUSINESS profile data",
  tags: ["Business"],
  response: {
    200:{
      type: "object",    
      properties: {
        _id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        companyName: { type: "string" },
        email: { type: "string", format: "email" },
        linkedin: { type: "string", format: "uri", nullable: true },
        personalWebsite: { type: "string", format: "uri", nullable: true },
        connects: { type: "number" },
        ProjectList: {
          type: "array",
          items: { type: "string" }
        }
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

export const getBusinessDetailsPublicSchema: FastifySchema = {
  description: "API to get BUSINESS profile data",
  tags: ["Public"],
  response: {
    200:{
      type: "object",    
      properties: {
        _id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        companyName: { type: "string" },
        email: { type: "string", format: "email" },
        linkedin: { type: "string", format: "uri", nullable: true },
        personalWebsite: { type: "string", format: "uri", nullable: true },
        connects: { type: "number" },
        ProjectList: {
          type: "array",
          items: { type: "string" }
        }
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
