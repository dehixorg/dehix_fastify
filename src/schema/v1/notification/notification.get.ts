import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getNotificationSchema: FastifySchema = {
  description: "API to get a Notification by ID",
  tags: ["Notification"],
  response: {
    // TODO: Add 200 response schema
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
    ...commonErrorResponses
  },
};

export const getAllNotificationsSchema: FastifySchema = {
  description: "API to get all Notifications",
  tags: ["Notification"],
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
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
    },
    ...commonErrorResponses
  }
}