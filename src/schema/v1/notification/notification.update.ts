import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";
import {
  notificationStatusEnum,
  notificationTypeEnum,
} from "../../../models/notification.entity";

export const updateNotificationSchema: FastifySchema = {
  description: "API for updating a Notification by ID",
  tags: ["Notification"],
  params: {
    type: "object",
    properties: {
      notification_id: { type: "string" },
    },
    required: ["notification_id"],
  },
  body: {
    type: "object",
    properties: {
      heading: { type: "string" },
      description: { type: "string" },
      type: {
        type: "string",
        enum: Object.values(notificationTypeEnum),
      },
      status: {
        type: "string",
        enum: Object.values(notificationStatusEnum),
      },
      background_img: { type: "string" },
      importantUrl: {
        type: "array",
        items: {
          type: "object",
          properties: {
            urlName: { type: "string" },
            url: { type: "string" },
          },
        },
      },
    },
    required: [],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            heading: { type: "string" },
            description: { type: "string" },
            type: { type: "string" },
            status: { type: "string" },
            background_img: { type: "string" },
            importantUrl: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  urlName: { type: "string" },
                  url: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
