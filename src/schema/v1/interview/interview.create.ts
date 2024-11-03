import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createInterviewSchema: FastifySchema = {
  description: "API to create interview",
  tags: ["Interview"],
  params: {
    type: "object",
    required: ["interviewee"],
    properties: {
      interviewee: {
        type: "string",
      },
    },
  },
  body: {
    type: "object",
    required: ["interviewer", "skill", "interviewDate"],
    properties: {
      interviewer: {
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
        default: 0,
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
    ...commonErrorResponses
  },
};
