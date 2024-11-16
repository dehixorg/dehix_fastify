import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

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
        },
      },
    },
    ...commonErrorResponses,
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
        },
      },
    },
    ...commonErrorResponses,
  },
};
