/**
 * File: verify.ts
 * Author: SANKET.SHIVAM
 * Date: 29-04-2024
 * Description:schema for API for OTP verification
 */

import { FastifySchema } from 'fastify';
import { EntityPlan } from '../../../constants/checkoutSession.constants';

export const registrationVerificationSchema: FastifySchema = {
  description: 'API for registration verification',
  tags: ['Freelancer'],
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    required: ['authorization'],
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
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
