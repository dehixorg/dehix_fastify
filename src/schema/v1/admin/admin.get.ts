import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getAllAdminSchema: FastifySchema = {
  description: "API to get all admins",
  tags: ["Admin"],
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            userName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            status: { type: "string", enum: ["Pending", "Accept", "Reject"] },
            type: { type: "string", enum: ["Admin", "Super_Admin"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getAdminByIdSchema: FastifySchema = {
  description: "API to get admin data",
  tags: ["Admin"],
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            userName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            status: { type: "string", enum: ["Pending", "Accept", "Reject"] },
            type: { type: "string", enum: ["Admin", "Super_Admin"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
