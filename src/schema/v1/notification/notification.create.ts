/**
 * File: notification.create.ts
 * Author: Uttam Gohil
 * Date: 31-08-2024
 * Description:schema for creating Notification
 */

import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createNotificationSchema: FastifySchema = {
  description: "API for creating Notification",
  tags: ["Notification"],
  body: {
    type: "object",
    properties: {
      heading: { type: "string" },
      description: { type: "string" },
      type: {
        type: "string",
        enum: ["business", "freelancer", "both"],
      },
      status: {
        type: "string",
        enum: ["active", "inactive"],
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
    required: [
      "heading",
      "description",
      "type",
      "status",
      "background_img",
      "importantUrl",
    ],
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
