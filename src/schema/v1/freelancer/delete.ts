import { FastifySchema } from "fastify";

export const deleteFreelancerProjectSchema: FastifySchema = {
  description: "API to delete project freelancer",
  tags: ["Freelancer"],
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

export const deleteFreelancerSkillSchema: FastifySchema = {
  description: "API to delete a skill of a freelancer",
  tags: ["Freelancer"],
  params: {
    type: "object",
    properties: {
      freelancer_id: {
        type: "string",
        description: "The ID of the freelancer",
      },
      skill_id: {
        type: "string",
        description: "The ID of the skill to be deleted",
      },
    },
    required: ["freelancer_id", "skill_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: { type: "object" },
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
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: {
          type: "string",
        },
      },
    },
  },
};
