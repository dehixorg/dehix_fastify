import { FastifySchema } from "fastify";

export const createMeetSchema: FastifySchema = {
  tags: ["Calendar"],
  body: {
    type: "object",
    properties: {
      attendees: {
        type: "array",
        items: { type: "string", format: "email" }, // Validating attendee emails
      },
    },
    required: ["attendees"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        meetLink: { type: "string", format: "uri" }, // Response includes the meet link
      },
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" },
      },
    },
  },
};

export const createAuthUrlSchema: FastifySchema = {
  tags: ["Calendar"],
  querystring: {
    type: "object",
    properties: {
      redirectUri: { type: "string", format: "uri" },
    },
    required: ["redirectUri"], // Make the query param required
  },
  response: {
    200: {
      type: "object",
      properties: {
        url: { type: "string", format: "uri" },
      },
    },
  },
};
