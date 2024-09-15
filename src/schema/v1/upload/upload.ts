import { FastifySchema } from "fastify";

export const uploadImageSchema: FastifySchema = {
  description: "API to upload an image file to S3",
  tags: ["File Upload"], // Define the tag in Swagger
  summary: "Upload an image file",
  consumes: ["multipart/form-data"], // Define that this API accepts multipart/form-data
  body: {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "binary", // Swagger uses 'binary' format for file uploads
        description: "The image file to upload",
      },
    },
    required: ["file"], // 'file' is required in the body
  },
  response: {
    200: {
      description: "Successful file upload response",
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            Location: { type: "string" },
            Key: { type: "string" },
            Bucket: { type: "string" },
          },
        },
      },
    },
    400: {
      description: "Bad request when no file is uploaded",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
      },
    },
    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
      },
    },
  },
};
