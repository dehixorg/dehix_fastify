import { FastifySchema } from "fastify";

export const bidApplySchema: FastifySchema = {
  description: "API for bidding",
  tags: ["Bid"],
  body: {
    type: "object",
    properties: {
      bidder_id: { type: "string" },
      current_price: { type: "number" },
      project_id: { type: "string" },
      domain_id: { type: "string" },
      description: {
        type: "string",
      },
      profile_id: { type: "string" },
    },
    required: ["bidder_id", "current_price", "project_id"],
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
