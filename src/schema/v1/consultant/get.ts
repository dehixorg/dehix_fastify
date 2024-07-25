import { FastifySchema } from "fastify";

export const getConsultantSchema: FastifySchema = {
  description: "API to get consultant data",
  tags: ["Consultant"],
  params: {
    type: "object",
    properties: {
      consultant_id: {
        type: "string",
        format: "uuid",
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
            _id: { type: "string", format: "uuid" },
            status: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            experience: { type: "string" },
            links: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
    204:{
      type:"object",
      properties:{
        message:{
          type:"string"
        }
      }
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


export const getAllConsultantSchema: FastifySchema = {
  description: "API to get consultant data",
  tags: ["Consultant"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          properties: {
            _id: { type: "string", format: "uuid" },
            status: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            experience: { type: "string" },
            links: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
    204:{
      type:"object",
      properties:{
        message:{
          type:"string"
        },
        code: { type: "string" },
      }
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
