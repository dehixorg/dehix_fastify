import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updateInterviewSchema: FastifySchema = {
  description: "API to update interview",
  tags: ["Interview"],
  params: {
    type: "object",
    properties: {
      interview_id: {
        type: "string",
        description: "interview_id",
      },
    },
    required: ["interview_id"],
  },
  body: {
    type: "object",
    properties: {
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
    ...commonErrorResponses,
  },
};
