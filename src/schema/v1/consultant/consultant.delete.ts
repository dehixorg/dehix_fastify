import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const deleteConsultantSchema: FastifySchema = {
  description: "API to delete consultant data freelance",
  tags: ["Consultant"],
  params: {
    type: "object",
    properties: {
      consultant_id: { type: "string", format: "uuid" },
      freelancer_id: { type: "string" },
    },
    required: ["consultant_id", "freelancer_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    ...commonErrorResponses
  },
};
