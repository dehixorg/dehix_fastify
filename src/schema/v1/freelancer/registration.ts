/**
 * File: registration.ts
 * Author: Sanket Shivam
 * Date: 29-04-2024
 * Description: Schema for API for user registration
 */

import { FastifySchema } from 'fastify';

export const registrationSchema: FastifySchema = {
  tags: ['Freelancer'],
  body: {
    type: 'object',
    properties: {
      full_name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1 },
    },
    required: ['full_name', 'email', 'password'],
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
      },
    },
  },
};
