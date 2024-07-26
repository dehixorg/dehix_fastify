import { FastifySchema } from "fastify";

export const deleteHireDehixTalentSchema: FastifySchema = {
    description: "API to delete hire dehix talent data",
    tags: ["Hire"],
    params: {
      type: "object",
      properties: {
        hireDehixTalent_id: {
          type: "string",
          description: "The ID of the hire dehix talent",
        },
      },
      required: ["hireDehixTalent_id"],
    },
    response: {
      200: {
        description: "Success",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
          code: { type: "string" },
        },
      },
      403: {
        type: "object",
        properties: {
          code: { type: "string" },
          message: { type: "string" },
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