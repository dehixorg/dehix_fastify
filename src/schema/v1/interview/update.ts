import { FastifySchema } from "fastify";

export const updateInterviewSchema: FastifySchema = {
  description: "API to update interview data",
  tags: ["Interview"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Interview ID",
      },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      interviewer: {
        type: "string",
      },
      interviewee: {
        type: "string",
      },
      skill: {
        type: "string",
      },
      interviewDate: {
        type: "string",
        format: "date-time",
      },
      rating: {
        type: "number",
      },
      comments: {
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
            _id: { type: "string" },
            interviewer: { type: "string" },
            interviewee: { type: "string" },
            skill: { type: "string" },
            interviewDate: { type: "string", format: "date-time" },
            rating: { type: "number" },
            comments: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      description: "Forbidden",
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
