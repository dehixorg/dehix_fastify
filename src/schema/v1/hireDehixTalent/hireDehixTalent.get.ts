import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getHireDehixTalentSchema: FastifySchema = {
  description: "API to get hire dehix talent data",
  tags: ["Hire"],
  response: {
    // TODO: Add 200 response schema
    ...commonErrorResponses
  },
};
