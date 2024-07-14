import { FastifySchema } from "fastify";

export const updateFreelancerSchema: FastifySchema = {
  description: "API to update freelancer",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      userName: { type: "string" },
      password: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      dob: { type: "string", format: "date-time" },
      professionalInfo: {
        type: "array",
        items: {
          type: "object",
          properties: {
            company: { type: "string" },
            jobTitle: { type: "string" },
            workDescription: { type: "string" },
            workFrom: { type: "string", format: "date-time" },
            workTo: { type: "string", format: "date-time" },
            referencePersonName: { type: "string" },
            referencePersonContact: { type: "string" },
            githubRepoLink: { type: "string" },
            oracleAssigned: { type: "string" },
            verificationStatus: {
              type: "string",
              enum: ["added", "verified", "rejected", "reapplied"],
            },
            verificationUpdateTime: { type: "string", format: "date-time" },
            comments: { type: "string" },
          },
          required: [
            "company",
            "jobTitle",
            "workDescription",
            "workFrom",
            "workTo",
            "referencePersonName",
            "referencePersonContact",
            "githubRepoLink",
            "oracleAssigned",
            "verificationStatus",
            "verificationUpdateTime",
            "comments",
          ],
        },
      },
      skills: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            level: { type: "string" },
            experience: { type: "string" },
            interviewStatus: {
              type: "string",
              enum: ["pending", "accepted", "rejected", "reapplied"],
            },
            interviewInfo: { type: "string" },
            interviewerRating: { type: "number" },
          },
          required: [
            "name",
            "level",
            "experience",
            "interviewStatus",
            "interviewInfo",
            "interviewerRating",
          ],
        },
      },
      education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            degree: { type: "string" },
            universityName: { type: "string" },
            fieldOfStudy: { type: "string" },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
            grade: { type: "string" },
            oracleAssigned: { type: "string" },
            verificationStatus: {
              type: "string",
              enum: ["added", "verified", "rejected", "reapplied"],
            },
            verificationUpdateTime: { type: "string", format: "date-time" },
            comments: { type: "string" },
          },
          required: [
            "degree",
            "universityName",
            "fieldOfStudy",
            "startDate",
            "endDate",
            "grade",
            "oracleAssigned",
            "verificationStatus",
            "verificationUpdateTime",
            "comments",
          ],
        },
      },
      role: { type: "string" },
      projects: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            projectName: { type: "string" },
            description: { type: "string" },
            verified: { type: "boolean" },
            githubLink: { type: "string" },
            start: { type: "string", format: "date-time" },
            end: { type: "string", format: "date-time" },
            refer: { type: "string" },
            techUsed: {
              type: "array",
              items: { type: "string" },
            },
            role: { type: "string" },
            projectType: { type: "string" },
            oracleAssigned: { type: "string" },
            verificationStatus: {
              type: "string",
              enum: ["added", "verified", "rejected", "reapplied"],
            },
            verificationUpdateTime: { type: "string", format: "date-time" },
            comments: { type: "string" },
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
        },
      },
      refer: {
        type: "object",
        properties: {
          name: { type: "string" },
          contact: { type: "string" },
        },
        required: ["name", "contact"],
      },
      githubLink: { type: "string" },
      linkedin: { type: "string" },
      personalWebsite: { type: "string" },
      perHourPrice: { type: "number" },
      connects: { type: "number" },
      resume: { type: "string" },
      workExperience: { type: "number" },
      isFreelancer: { type: "boolean" },
      oracleStatus: {
        type: "string",
        enum: [
          "notApplied",
          "applied",
          "approved",
          "failed",
          "stopped",
          "reapplied",
        ],
      },
      consultant: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: [
              "notApplied",
              "applied",
              "approved",
              "failed",
              "stopped",
              "reapplied",
            ],
          },
        },
        required: ["status"],
      },
      pendingProject: {
        type: "array",
        items: { type: "string" },
      },
      rejectedProject: {
        type: "array",
        items: { type: "string" },
      },
      acceptedProject: {
        type: "array",
        items: { type: "string" },
      },
      oracleProject: {
        type: "array",
        items: { type: "string" },
      },
      userDataForVerification: {
        type: "array",
        items: { type: "string" },
      },
      interviewsAligned: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: [],
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

const skillProperties = {
  name: { type: "string", description: "The name of the skill" },
  level: {
    type: "string",
    description: "The level of proficiency in the skill",
  },
  experience: {
    type: "string",
    description: "The years of experience with the skill",
  },
  interviewStatus: {
    type: "string",
    description: "The interview status for the skill",
    enum: ["pending", "accepted", "rejected", "reapplied"],
  },
  interviewInfo: {
    type: "string",
    description: "The ObjectId of the interview information",
    nullable: true,
  },
  interviewerRating: {
    type: "number",
    description: "The rating given by the interviewer",
    nullable: true,
  },
};

export const addFreelancerSkillsSchema: FastifySchema = {
  description: "API to add skills to a freelancer",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      skills: {
        type: "array",
        description: "An array of skills to be added",
        items: {
          type: "object",
          properties: skillProperties,
          required: ["name", "level", "experience"],
        },
        minItems: 1,
      },
    },
    required: ["skills"],
    additionalProperties: false,
  },
  params: {
    type: "object",
    properties: {
      freelancer_id: {
        type: "string",
        description:
          "The ID of the freelancer to whom the skills are being added",
      },
    },
    required: ["freelancer_id"],
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
            freelancer_id: { type: "string" },
            skills: {
              type: "array",
              items: {
                type: "object",
                properties: skillProperties,
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

export const createDomainSchema: FastifySchema = {
  description: "API to create business data",
  tags: ["Business"],
  body: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        format: "uuid",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["name"],
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

export const oracleStatusSchema: FastifySchema = {
  description: "API to update oracle status of freelancer",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      oracleStatus: {
        type: "string",
        enum: [
          "notApplied",
          "applied",
          "approved",
          "failed",
          "stopped",
          "reapplied",
        ],
      },
    },
    required: ["oracleStatus"],
  },
  params: {
    type: "object",
    properties: {
      freelancer_id: {
        type: "string",
        description:
          "The ID of the freelancer to where the oracle status updated",
      },
    },
    required: ["freelancer_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            freelancer_id: { type: "string" },
            oracleStatus: { type: "string" },
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

export const interviewsAlignedSchema: FastifySchema = {
  description: "API to aligned interview for freelancer",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      interviewsAligned: {
        type: "array",
        items: {
          type: "string", // Assuming ObjectId will be passed as a string
          pattern: "^[0-9a-fA-F]{24}$", // ObjectId validation pattern
        },
      },
    },
    required: ["interviewsAligned"],
  },
  params: {
    type: "object",
    properties: {
      freelancer_id: {
        type: "string",
        description: "The ID of the freelancery to whose interview aligned",
      },
    },
    required: ["freelancer_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            freelancer_id: { type: "string" },
            interviewsAligned: {
              type: "array",
              items: { type: "string" },
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
export const experinceInProfessionalInfo: FastifySchema = {
  description: "API to manage professional experience",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      company: { type: "string", nullable: true },
      jobTitle: { type: "string", nullable: true },
      workDescription: { type: "string", nullable: true },
      workFrom: { type: "string", format: "date-time", nullable: true },
      workTo: { type: "string", format: "date-time", nullable: true },
      referencePersonName: { type: "string", nullable: true },
      referencePersonContact: { type: "string", nullable: true },
      githubRepoLink: { type: "string", nullable: true },
      oracleAssigned: { type: "string", nullable: true },
      verificationStatus: {
        type: "string",
        enum: ["added", "verified", "rejected", "reapplied"],
        nullable: true,
      },
      verificationUpdateTime: { type: "string", format: "date-time", nullable: true },
      comments: { type: "string", nullable: true },
    }
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
            professionalInfo:{
            company: { type: "string" },
            jobTitle: { type: "string" },
            workDescription: { type: "string" },
            workFrom: { type: "string", format: "date-time" },
            workTo: { type: "string", format: "date-time" },
            referencePersonName: { type: "string" },
            referencePersonContact: { type: "string" },
            githubRepoLink: { type: "string" },
            oracleAssigned: { type: "string" },
            verificationStatus: {
              type: "string",
              enum: ["added", "verified", "rejected", "reapplied"],
            },
            verificationUpdateTime: { type: "string", format: "date-time" },
            comments: { type: "string" },
          },
        },
      }}
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
