/**
 * File: createLead.ts
 * Author: Gaurav sharma
 * Date: 29-04-2024
 * Description: Schema for API for lead genration
 * tags: ['leads'],
 */
import { FastifySchema } from 'fastify';

export const createLeadSchema: FastifySchema = {
  description: 'Lead Create API',
  tags: ['Lead'],
  body: {
    type: 'object',
    properties: {
      full_name: { type: 'string' },
      email: { type: 'string' },
      contact_number: { type: 'string' },
      venue_name: { type: 'string' },
    },
    required: ['full_name', 'email', 'contact_number', 'venue_name'],
  },
  response: {
    201: {
      description: 'Created',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
    409: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
  },
};
