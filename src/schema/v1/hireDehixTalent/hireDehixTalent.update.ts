import { FastifySchema } from "fastify";

export const UpdateHireDehixTalent: FastifySchema = {
  description: "API to manage Hire Dehix Talent",
  tags: ["Hire"],
  body: {
    type: "object",
    properties: {
      businessId: {
        type: "string",
      },
      domainId: {
        type: "string",
      },
      domainName: {
        type: "string",
      },
      skillId: {
        type: "string",
      },
      skillName: {
        type: "string",
      },
      description: {
        type: "string",
      },
      experience: {
        type: "string",
      },
      freelancerRequired: {
        type: "number",
        default: 1,
      },
      status: {
        type: "string",
        enum: ["added", "approved", "closed", "completed"],
        default: "added",
      },
      visible: {
        type: "boolean",
      },
      freelancerApplied: {
        type: "array",
        items: {
          type: "string",
        },
      },
      freelancerSelected: {
        type: "array",
        items: {
          type: "string",
        },
      },
      start: {
        type: "string",
        format: "date-time",
      },
      end: {
        type: "string",
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
            _id: {
              type: "string",
            },
            businessId: {
              type: "string",
            },
            domainId: {
              type: "string",
            },
            domainName: {
              type: "string",
            },
            skillId: {
              type: "string",
            },
            skillName: {
              type: "string",
            },
            description: {
              type: "string",
            },
            experience: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["added", "approved", "closed", "completed"],
              default: "added",
            },
            visible: {
              type: "boolean",
            },
            freelancerRequired: {
              type: "number",
              default: 1,
            },
            freelancerApplied: {
              type: "array",
              items: {
                type: "string",
              },
            },
            freelancerSelected: {
              type: "array",
              items: {
                type: "string",
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

export const updateStatusHireDehixTalentSchema: FastifySchema = {
  description: "API to update hire dehix talent data for a business",

  tags: ["Hire"],
  params: {
    type: "object",
    properties: {
      business_id: { type: "string" },
      hireDehixTalent_id: { type: "string" },
    },
    required: ["business_id", "hireDehixTalent_id"],
  },
  body: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["added", "approved", "closed", "completed"],
      },
      visible: {
        type: "boolean",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            businessId: {
              type: "string",
            },
            domainId: {
              type: "string",
            },
            domainName: {
              type: "string",
            },
            skillId: {
              type: "string",
            },
            skillName: {
              type: "string",
            },
            description: {
              type: "string",
            },
            experience: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["added", "approved", "closed", "completed"],
              default: "added",
            },
            visible: {
              type: "boolean",
            },
            freelancerRequired: {
              type: "number",
              default: 1,
            },
            freelancerApplied: {
              type: "array",
              items: {
                type: "string",
              },
            },
            freelancerSelected: {
              type: "array",
              items: {
                type: "string",
              },
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
