import { FastifySchema } from "fastify";
import { updateBidSchema } from "./update";

export const getBidSchema: FastifySchema = {
  description: "API to get Bid data",
  tags: ["Bid"],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: updateBidSchema.body,
      },
    },
    404: {
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
