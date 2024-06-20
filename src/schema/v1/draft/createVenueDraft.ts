/**
 * File: create.ts
 * Author: Sanket Shivam
 * Date: 10-06-2024
 * Description: schema for API to get/create venue draft for provided subscription
 **/

import { FastifySchema } from 'fastify';

export const createVenueDraftSchema: FastifySchema = {
  description: 'API to create a venue draft',
  tags: ['Draft'],
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
      vendor_id: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      is_child: { type: 'boolean' },
      parent_id: { type: 'string' },
    },
    required: ['is_child'],
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            draft_id: { type: 'string', format: 'uuid' },
          },
        },
      },
    },
    404: {
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
    401: {
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