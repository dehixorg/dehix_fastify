/**
 * File: login.ts
 * Author: Akhil
 * Date: 30-04-2024
 * Description:schema for API for Freelancer Team Login
 */

import { FastifySchema } from 'fastify';
import { EntityPlan } from '../../../constants/checkoutSession.constants';

export const freelancerLoginSchema: FastifySchema = {
  description: 'API for Freelancer Team Login',
  tags: ['Freelancer'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1 },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            firebase_custom_token: { type: 'string' },
            user_id: { type: 'string' },
            user_name: { type: 'string' },
            email: { type: 'string' },
            subscription: { type: 'string', enum: Object.values(EntityPlan), nullable: true },
          },
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
