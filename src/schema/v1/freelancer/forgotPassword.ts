/**
 * File: forgetPassword.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 30-04-2024
 * Description:schema for API for forget Password
 */

import { FastifySchema } from 'fastify';

export const forgetPasswordSchema: FastifySchema = {
  description: 'Forgot-Password API',
  tags: ['Freelancer'],

  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
    },
    required: ['email'],
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
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
