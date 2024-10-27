import { FastifySchema } from "fastify";

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
    // 200: {
    //   description: "Success",
    //   type: "object",
    //   properties: {
    //     data: {
    //       type: "object",
    //       items: {
    //         type: "object",
    //         properties: {
    //           _id: { type: "string" },
    //           interviewer: { type: "string" },
    //           interviewee: { type: "string" },
    //           skill: { type: "string" },
    //           interviewDate: { type: "string", format: "date-time" },
    //           rating: { type: "number" },
    //           comments: { type: "string" },
    //           createdAt: { type: "string", format: "date-time" },
    //           updatedAt: { type: "string", format: "date-time" },
    //         },
    //       },
    //     },
    //   },
    // },
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
    // 200: {
    //   description: "Success",
    //   type: "object",
    //   properties: {
    //     data: {
    //       type: "object",
    //       items: {
    //         type: "object",
    //         properties: {
    //           _id: { type: "string" },
    //           interviewer: { type: "string" },
    //           interviewee: { type: "string" },
    //           skill: { type: "string" },
    //           interviewDate: { type: "string", format: "date-time" },
    //           rating: { type: "number" },
    //           comments: { type: "string" },
    //           createdAt: { type: "string", format: "date-time" },
    //           updatedAt: { type: "string", format: "date-time" },
    //         },
    //       },
    //     },
    //   },
    // },
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
