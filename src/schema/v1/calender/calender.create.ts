import { FastifySchema } from "fastify";

// Schema for creating a Google Calendar meeting
export const createMeetSchema: FastifySchema = {
  tags: ["Calendar"],
  querystring: {
    type: "object",
    properties: {
      code: { type: "string" }, // Code parameter for authentication
    },
    required: ["code"], // Make the code query parameter required
  },
  body: {
    type: "object",
    properties: {
      attendees: {
        type: "array",
        items: { type: "string", format: "email" }, // Validating attendee emails
      },
    },
    required: ["attendees"], // Ensure attendees are provided
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        meetLink: { type: "string", format: "uri" }, // Response includes the meeting link
      },
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "string" }, // Error code
      },
    },
  },
};

// Schema for creating an authentication URL
export const createAuthUrlSchema: FastifySchema = {
  tags: ["Calendar"],
  querystring: {
    type: "object",
    properties: {
      redirectUri: { type: "string", format: "uri" }, // URI to redirect after authorization
    },
    required: ["redirectUri"], // Make the redirectUri query parameter required
  },
  response: {
    200: {
      type: "object",
      properties: {
        url: { type: "string", format: "uri" }, // Response includes the authentication URL
      },
    },
  },
};
