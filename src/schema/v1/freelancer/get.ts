/**
 * File: get.ts
 * Author: Sanket Shivam
 * Date: 22-05-2024
 * Description:schema for API to get vendor profile data
 */

import { FastifySchema } from 'fastify';
import { EntityType } from '../../../common/constants';

export const getFreelancerSchema: FastifySchema = {
  description: 'API to get vendor profile data',
  tags: ['Freelancer'],
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            email: { type: 'string' },
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
    403: {
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
