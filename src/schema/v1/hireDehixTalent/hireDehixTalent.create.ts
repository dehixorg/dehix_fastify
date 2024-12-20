import { FastifySchema } from "fastify";

export const createhireDehixTalentSchema: FastifySchema = {
  description: "API to create project data",
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
      freelancerInLobby: {
        type: "array",
        items: {
          type: "object",
          properties: {
            freelancerId: {
              type: "string",
            },
            dehixTalentId: {
              type: "string",
            },
          },
        },
      },
      freelancerSelected: {
        type: "array",
        items: {
          type: "object",
          properties: {
            freelancerId: {
              type: "string",
            },
            dehixTalentId: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["businessId", "description", "experience", "status"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            BusinessId: {
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

export const addTalentIntoLobbySchema: FastifySchema = {
  description: "API to add talent into lobby data",
  tags: ["Hire"],
  body: {
    type: "object",
    properties: {
      freelancerId: { type: "string" },
      dehixTalentId: { type: "string" },
    },
    required: ["freelancerId", "dehixTalentId"],
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
