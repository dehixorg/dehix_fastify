/**
 * File: put.ts
 * Author: Abhiraj Varshney
 * Date: 05-06-2024
 * Description: Schema for API for creating and updating pricing
 * Tag: VenuePricing
 */
import { FastifySchema } from 'fastify';
import { PricingType, Duration, Day } from '../../../constants/venuePricing.constants';

export const putVenuePricingSchema: FastifySchema = {
  description: 'Create and Update Venue Pricing',
  tags: ['venue'],
  params: {
    type: 'object',
    properties: {
      venue_id: { type: 'string' },
    },
    required: ['venue_id'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        price: { type: 'number' },
        accommodation_seasonality: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              high_demand: { type: 'array' },
              mid_demand: { type: 'array' },
              low_demand: { type: 'array' },
            },
          },
        },
        pricing_type: { type: 'string', enum: [...Object.values(PricingType)] },
        duration: { type: 'string', enum: [...Object.values(Duration)] },
        start_time: { type: 'string' },
        end_time: { type: 'string' },
        days: {
          type: 'array',
          items: { type: 'string', enum: [...Object.values(Day)] },
        },
        is_selected_to_display: { type: 'boolean' },
      },
      required: ['pricing_type', 'price'],
    },
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        message: { type: 'string' },
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
