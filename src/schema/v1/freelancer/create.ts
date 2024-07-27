import { FastifySchema } from "fastify";

export const createFreelancerSchema: FastifySchema = {
  description: "API to create freelancer data",
  tags: ["Register"],
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      userName: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      dob: { type: "string", format: "date-time" },
      professionalInfo: {
        type: "object",
        properties: {
          id: { type: "string" },
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
      domain: {
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
        type: "object",
        properties: {
          id: { type: "string" },
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
      dehixTalent: {
        type: "object",
        properties: {
          id: { type: "string" },
          skillId: { type: "string" },
          skillName: { type: "string" },
          domainId: { type: "string" },
          domainName: { type: "string" },
          status: {
            type: "string",
            enum: ["added", "verified", "rejected"],
          },
          activeStatus: {
            type: "string",
            enum: ["Active", "Inactive"],
          },
        },
        required: [],
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
    required: [
      "firstName",
      "lastName",
      "userName",
      "email",
      "phone",
      "dob",
      "skills",
      "domain",
      "role",
      "refer",
      "githubLink",
      "linkedin",
      "personalWebsite",
      "perHourPrice",
      "connects",
      "resume",
      "workExperience",
      "isFreelancer",
      "oracleStatus",
      "consultant",
      "pendingProject",
      "rejectedProject",
      "acceptedProject",
      "oracleProject",
      "userDataForVerification",
      "interviewsAligned",
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
            email: { type: "string" },
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
export const createProfessionalInfoSchema: FastifySchema = {
  description: "API to create professional information",
  tags: ["Freelancer"],
  body: {
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
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string", format: "uuid" },
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

export const createEducationSchema: FastifySchema = {
  description: "API to create education",
  tags: ["Freelancer"],
  body: {
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
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string", format: "uuid" },
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

export const createProjectSchema: FastifySchema = {
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

export const createDehixTalentSchema: FastifySchema = {
  description: "API to create Dehix talent",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      skillId: { type: "string" },
      skillName: { type: "string" },
      domainId: { type: "string" },
      domainName: { type: "string", },
      status: {
        type: "string",
        enum: ["added", "verified", "rejected"],
        default: "added"
      },
      activeStatus: {
        type: "string",
        enum: ["Active", "Inactive"],
        default: "Active"
      },
    },
    required: [
      "status",
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
            _id: { type: "string", format: "uuid" },
            skillId: { type: "string" },
            skillName: { type: "string" },
            domainId: { type: "string" },
            domainName: { type: "string" },
            status: {
              type: "string",
              enum: ["added", "verified", "rejected"],
            },
            activeStatus: {
              type: "string",
              enum: ["Active", "Inactive"],
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