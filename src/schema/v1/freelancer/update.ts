import { FastifySchema } from "fastify";

export const updateFreelancerSchema: FastifySchema = {
  description: "API to update freelancer",
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

export const addFreelancerProjectSchema: FastifySchema = {
  description: "API to add project to freelancer",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      projectName: { type: "string", description: "The name of the project" },
      description: {
        type: "string",
        description: "A description of the project",
      },
      verified: {
        type: "boolean",
        description: "A boolean indicating whether the project is verified",
      },
      githubLink: {
        type: "string",
        description: "A link to the project's GitHub repository",
        format: "uri",
      },
      start: {
        type: "string",
        description: "The start date of the project",
        format: "date-time",
      },
      end: {
        type: "string",
        description: "The end date of the project",
        format: "date-time",
      },
      refer: {
        type: "string",
        description: "A reference string for the project",
      },
      techUsed: {
        type: "array",
        description:
          "An array of strings listing the technologies used in the project",
        items: { type: "string" },
      },
      role: {
        type: "string",
        description: "The role of the freelancer in the project",
      },
      projectType: { type: "string", description: "The type of the project" },
      oracleAssigned: {
        type: "string",
        description: "The ObjectId of the oracle assigned to the project",
        nullable: true,
      },
      verificationStatus: {
        type: "string",
        description: "The current verification status of the project",
        enum: ["added", "verified", "rejected", "reapplied"],
      },
      verificationUpdateTime: {
        type: "string",
        description:
          "The date and time when the verification status was last updated",
        format: "date-time",
      },
      comments: {
        type: "string",
        description: "Any comments related to the project",
      },
    },
    required: [
      "projectName",
      "description",
      "verified",
      "githubLink",
      "start",
      "end",
      "refer",
      "techUsed",
      "role",
      "projectType",
      "oracleAssigned",
      "verificationStatus",
      "verificationUpdateTime",
      "comments",
    ],
    additionalProperties: false,
  },
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
