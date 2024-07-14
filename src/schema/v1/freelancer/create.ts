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
      password: { type: "string" },
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
      "password",
      "email",
      "phone",
      "dob",
      "skills",
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

