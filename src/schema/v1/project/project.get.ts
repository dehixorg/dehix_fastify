import { FastifySchema } from "fastify";

export const getProjectSchema: FastifySchema = {
  description: "API to get Project profile data",
  tags: ["Project"],
  querystring: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "Comma-separated list of locations",
      },
      jobType: {
        type: "string",
        description: "Comma-separated list of job types",
      },
      domain: {
        type: "string",
        description: "Comma-separated list of domains",
      },
      skills: {
        type: "string",
        description: "Comma-separated list of skills",
      },
      page: {
        type: "string",
      },
      limit: {
        type: "string",
      },
      projectDomain: {
        type: "string",
        description: "Comma-separated list of projectDomain",
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

export const getAllProjectsSchema: FastifySchema = {
  description: "API to get all projects",
  tags: ["Project"],
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

export const getProjectsAndBidsSchema: FastifySchema = {
  description: "API to get Project and Bids data",
  tags: ["Project"],
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
