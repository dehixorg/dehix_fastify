/**
 * File: get.ts
 * Author: Akhil
 * Date: 22-05-2024
 * Description:schema for API to get FREELANCER profile data
 */

import { FastifySchema } from "fastify";

export const getFreelancerSchema: FastifySchema = {
  description: "API to get FREELANCER profile data",
  tags: ["Freelancer"],
  response: {
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
