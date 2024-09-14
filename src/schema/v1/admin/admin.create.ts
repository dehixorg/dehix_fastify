import { FastifySchema } from "fastify";

export const createAdminSchema: FastifySchema = {
  description: "API for creating an Admin",
  tags: ["Admin"],
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      userName: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      status: { type: "string", enum: ["Pending", "Accept", "Reject"] },
      type: { type: "string", enum: ["Admin", "Super_Admin"] },
    },
    required: ["firstName", "lastName", "userName", "email"],
  },
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
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    403: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
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
