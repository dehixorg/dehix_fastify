/**
 * File: get.ts
 * Author: Akhil
 * Date: 22-05-2024
 * Description:schema for API to get FREELANCER profile data
 */

import { FastifySchema } from "fastify";

export const getFreelancerSchema: FastifySchema = {
  description: "API to get FREELANCER profile data",
  tags: ["Freelancer"],
  querystring: {
    type: "object",
    properties: {
      experience: {
        type: "string",
        description: "Comma-separated list of experience",
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
     limit: {
        type: "string",
      },
      page: {
        type: "string",
      },
    },
    required: [],
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

export const getFreelancerProjectSchema: FastifySchema = {
  description: "API to get FREELANCER project data",
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

export const getFreelancerOwnProjectSchema: FastifySchema = {
  description: "API to get freelancer own projects data",
  tags: ["Freelancer"],
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

export const getFreelancerSkillsSchema: FastifySchema = {
  description: "API to get freelancer skills data",
  tags: ["Freelancer"],
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

export const getFreelancerDomainSchema: FastifySchema = {
  description: "API to get freelancer domain data",
  tags: ["Freelancer"],
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

export const getAllDehixTalentSchema: FastifySchema = {
  description: "API to get freelancer domain data",
  tags: ["Freelancer"],
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "initial fetch data",
      },
      skip: {
        type: "number",
        description: "after fetching initial data",
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

export const getFreelancerDehixTalentSchema: FastifySchema = {
  description: "API to get freelancer dehix talent data",
  tags: ["Freelancer"],
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
