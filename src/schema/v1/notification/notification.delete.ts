import { FastifySchema } from "fastify";

export const deleteNotificationSchema: FastifySchema = {
  description: "API for deleting a Notification by ID",
  tags: ["Notification"],
  params: {
    type: "object",
    properties: {
      notification_id: {
        type: "string",
        description: "The ID of the notification",
       },
    },
    required: ["notification_id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    401: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        code: {
          type: "string",
        },
      },
    },
    403: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
    404: {
      type: "object",
      properties: {
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
