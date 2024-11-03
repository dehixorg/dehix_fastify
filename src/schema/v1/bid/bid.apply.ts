import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const bidApplySchema: FastifySchema = {
  description: "API for creating a bid",
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
    ...commonErrorResponses
  },
};
