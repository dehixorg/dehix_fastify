import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getInterviewSchema: FastifySchema = {
  description: "API to get interview details",
  tags: ["Interview"],
  // querystring: {
  //   type: "object",
  //   properties: {
  //     interviewer: { type: "string" },
  //     interviewee: { type: "string" },
  //     skill: { type: "string" },
  //     interviewDate: { type: "string", format: "date-time" },
  //     rating: { type: "number" },
  //     comments: { type: "string" },
  //     page:{type:"string"},
  //     limit:{type:"string"}
  //   },
  // },
  params: {
    type: "object",
    properties: {
      interviewee_id: { type: "string" },
    },
    required: ["interviewee_id"],
  },
  response: {
    // TODO Fix 200 response schema
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

export const getAllInterviewSchema: FastifySchema = {
  description: "API to get all interview",
  tags: ["Interview"],
  querystring: {
    type: "object",
    properties: {
      interviewer: { type: "string" },
      interviewee: { type: "string" },
      skill: { type: "string" },
      interviewDate: { type: "string", format: "date-time" },
      rating: { type: "number" },
      comments: { type: "string" },
      page: { type: "string" },
      limit: { type: "string" },
    },
  },
  response: {
    // TODO Fix 200 response schema
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
