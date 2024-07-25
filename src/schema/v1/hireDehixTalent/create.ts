import { FastifySchema } from "fastify";

export const createhireDehixTalentSchema: FastifySchema = {
  description: "API to create project data",
  tags: ["Hire"],
  body: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        format: "uuid",
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
        type: "string",
        enum: ["on", "off"],
        default: "on"
      },
      freelancerApplied: {
        type: "array",
        items: {
            type: "string",
        }
      },
      freelancerSelected: {
        type: "array",
        items: {
            type: "string",
        }
      },
      start: {
        type: "string",
        format: "date-time",
      },
      end: {
        type: "string",
      },
    },
    required: [
      "businessId",
      "description",
      "experience",
      "freelancerRequired",
      "status",
      "visible",
    ],
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
            BusinessId: { type: "string" },
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
