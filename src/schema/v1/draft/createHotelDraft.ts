/**
 * File: create.ts
 * Author: Sanket Shivam
 * Date: 01-06-2024
 * Description:schema for API to get/create draft for provided subscription
 **/

import { FastifySchema } from 'fastify';

export const createDraftSchema: FastifySchema = {
  description: 'API to create an empty hotel draft',
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
