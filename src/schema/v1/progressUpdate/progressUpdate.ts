/**
 * File: progressUpdate.ts
 * Author: Gaurav Sharma
 * Date: 29-05-2024
 * Description: Schema for API for progress update
 * tags: ['progress update'],
 */
import { FastifySchema } from 'fastify';

export const progressUpdateSchema: FastifySchema = {
  description: 'progress update API',
  tags: ['progress update'],
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    required: ['authorization'],
  },
  params: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      vendor_id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      steps: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', const: 'TEAM' },
            status: { type: 'string', enum: ['COMPLETED'] },
            is_required: { type: 'boolean' },
          },
        },
      },
      is_basic_profile_completed: {
        type: 'boolean',
      },
    },
  },
  response: {
    201: {
      description: 'Success',
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
