/**
 * File: login.ts
 * Author: Akhil
 * Date: 30-04-2024
 * Description:schema for API for bidding
 */

import { FastifySchema } from "fastify";

export const updateBidSchema: FastifySchema = {
  description: "API for update bidding",
  tags: ["Bid"],
  body: {
    type: "object",
    properties: {
      current_price: { type: "number" },
      domain_id: { type: "string" },
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
            bidder_id: { type: "string" },
            project_id: { type: "string" },
            bid_status: { type: "string" },
            current_price: { type: "string" },
            domain_id: { type: "string" },
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

export const updateBidStatusSchema: FastifySchema = {
  description: "API for update bidding",
  tags: ["Bid"],
  body: {
    type: "object",
    properties: {
      bid_status: {
        type: "string",
        enum: ["Pending", "Accepted", "Rejected"],
      },
    },
    required: [],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: {
          type: "string",
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
