/**
 * File: login.ts
 * Author: Akhil
 * Date: 30-04-2024
 * Description:schema for API for bidding
 */

import { FastifySchema } from "fastify";

export const bidApplySchema: FastifySchema = {
  description: "API for bidding",
  tags: ["Freelancer"],
  body: {
    type: "object",
    properties: {
      bid_amt: { type: "number" },
      freelancer_id: { type: "string", minLength: 1 },
    },
    required: ["bid_amt", "freelancer_id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            response: { type: "string", nullable: true },
          },
        },
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
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
