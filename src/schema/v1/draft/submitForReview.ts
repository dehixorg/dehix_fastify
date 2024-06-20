/**
 * File: submitForReview.ts
 * Author: Sanket Shivam
 * Date: 05-06-2024
 * Description:schema for API to submit draft for review
 **/

import { FastifySchema } from 'fastify';

export const submitDraftForReviewSchema: FastifySchema = {
  description: 'API to submit draft for review',
  tags: ['Draft'],
  params: {
    type: 'object',
    properties: {
      draft_id: { type: 'string' },
    },
  },
  response: {
    204: {},
    400: {
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
