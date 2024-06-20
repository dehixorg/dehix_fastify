/**
 * File: getProgress.ts
 * Author: SANKET.SHIVAM
 * Date: 31-05-2024
 * Description:schema for API to get progress steps status of subscrption
 */
import { FastifySchema } from 'fastify';
import { ProfileCompletionSteps, ProgressStateTypes } from '../../../constants/subscription.constants';

export const profileStepsSchema: FastifySchema = {
  description: 'API to get progress steps status of a subscription',
  tags: ['Subscription'],
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
        steps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', enum: Object.keys(ProfileCompletionSteps) },
              status: { type: 'string', enum: Object.keys(ProgressStateTypes) },
              accommodation_id: { type: ['string', 'null'] },
              listing_count: { type: 'integer', minimum: 0 },
              venue_parent_details: {
                type: ['null', 'object'],
                properties: {
                  id: { type: 'string' },
                  listing_count: { type: 'integer', minimum: 0 },
                },
              },
              draft_id: { type: ['string', 'null'] },
              latest_venue_id: { type: ['string', 'null'] },
              latest_restaurant_id: { type: ['string', 'null'] },
              limit: { type: 'integer', minimum: 0 },
              is_required: { type: 'boolean' },
            },
            required: ['name', 'status', 'is_required'],
          },
        },
        is_basic_profile_completed: { type: 'boolean' },
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
