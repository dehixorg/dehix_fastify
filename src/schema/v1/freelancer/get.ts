/**
 * File: get.ts
 * Author: Sanket Shivam
 * Date: 22-05-2024
 * Description:schema for API to get vendor profile data
 */

import { FastifySchema } from 'fastify';
import { EntityPlan } from '../../../constants/checkoutSession.constants';
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
            id: { type: 'string', format: 'uuid' },
            full_name: { type: 'string' },
            email: { type: 'string' },
            is_email_verified: { type: 'boolean' },
            owner_id: { type: ['string', 'null'] },
            created_at: { type: 'string', format: 'date-time' },
            subscription_plan: { type: ['string', 'null'], enum: Object.values(EntityPlan) },
            entity_type: { type: ['string', 'null'] },
            subscription_id: { type: ['string', 'null'], enum: Object.values(EntityType) },
            is_basic_profile_complete: { type: 'boolean' },
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
