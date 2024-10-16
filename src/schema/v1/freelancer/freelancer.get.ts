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

export const getFreelancerDetails: FastifySchema = {
  description: "API to get FREELANCER profile details",
  tags: ["Freelancer"],
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        userName: { type: "string" },
        description: { type: "string" },
        professionalInfo: {
          type: "object",
          properties: {
            _id: { type: "string" },
            company: { type: "string" },
            jobTitle: { type: "string" },
            workDescription: { type: "string" },
            workFrom: { type: "string", format: "date-time" },
            workTo: { type: "string", format: "date-time" },
            githubRepoLink: { type: "string" },
          },
        },
        skills: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              level: { type: "string" },
              experience: { type: "string" },
            },
          },
        },
        domain: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              level: { type: "string" },
              experience: { type: "string" },
            },
          },
        },
        education: {
          type: "object",
          properties: {
            _id: { type: "string" },
            degree: { type: "string" },
            universityName: { type: "string" },
            fieldOfStudy: { type: "string" },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
            grade: { type: "string" },
          },
        },
        role: { type: "string" },
        projects: {
          type: "object",
          additionalProperties: {
            type: "object",
            properties: {
              _id: { type: "string" },
              projectName: { type: "string" },
              description: { type: "string" },
              verified: { type: "boolean" },
              githubLink: { type: "string" },
              start: { type: "string", format: "date-time" },
              end: { type: "string", format: "date-time" },
              techUsed: {
                type: "array",
                items: { type: "string" },
              },
              role: { type: "string" },
              projectType: { type: "string" },
            },
          },
        },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
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
  tags: ["Freelancer"],
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


export const getFreelancerEducationSchema: FastifySchema = {
  description: "API to get freelancer education data",
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
export const getFreelancerConsultantSchema: FastifySchema = {
  description: "API to get freelancer consultant data",
  tags: ["Freelancer"],
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "array",
          properties: {
            consultant: {
              type: "object",
              additionalProperties: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  status: { type: "string" },
                  description: { type: "string" },
                  price: { type: "string" },
                  experience: { type: "string" },
                  links: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
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
