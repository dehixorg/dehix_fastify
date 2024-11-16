import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

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
    ...commonErrorResponses,
  },
};
