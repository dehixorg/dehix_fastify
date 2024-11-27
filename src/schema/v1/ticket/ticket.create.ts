import { FastifySchema } from "fastify";
import { CustomerType, TicketStatus } from "../../../models/ticket.entity"; // Adjust the import as needed

export const createTicketSchema: FastifySchema = {
  description: "API for creating Ticket",
  tags: ["Ticket"],
  body: {
    type: "object",
    properties: {
      customerID: {
        type: "string",
      },
      customerType: {
        type: "string",
        enum: Object.values(CustomerType), // Using CustomerType enum values
      },
      description: {
        type: "string",
      },
      filesAttached: {
        type: "string",
      },
      status: {
        type: "string",
        enum: Object.values(TicketStatus), // Using TicketStatus enum values
      },
      subject: {
        type: "string",
      },
    },
    required: [
      "customerID",
      "customerType",
      "description",
      "status",
      "subject",
    ],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            customerID: { type: "string" },
            customerType: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
            subject: { type: "string" },
            filesAttached: { type: "string" },
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
