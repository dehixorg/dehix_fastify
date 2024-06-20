/**
 * File: get.ts
 * Author: Abhiraj Varshney
 * Date: 05-06-2024
 * Description: Schema for API to fetch pricing of a venue
 * Tag: VenuePricing
 */
import { FastifySchema } from 'fastify';
import { PricingType, Duration, Day } from '../../../constants/venuePricing.constants';

export const getVenuePricingSchema: FastifySchema = {
  description: 'Fetch Venue Pricing',
  tags: ['venue'],
  params: {
    type: 'object',
    properties: {
      venue_id: { type: 'string' },
    },
    required: ['venue_id'],
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              venue_id: { type: 'string' },
              price: { type: 'number' },
              accommodation_seasonality: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    high_demand: { type: 'array', items: { type: 'string' } },
                    mid_demand: { type: 'array', items: { type: 'string' } },
                    low_demand: { type: 'array', items: { type: 'string' } },
                  },
                },
                nullable: true,
              },
              pricing_type: {
                type: 'string',
                enum: Object.values(PricingType),
              },
              duration: {
                type: 'string',
                nullable: true,
                enum: Object.values(Duration),
              },
              start_time: { type: 'string', format: 'time', nullable: true },
              end_time: { type: 'string', format: 'time', nullable: true },
              days: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: Object.values(Day),
                },
                nullable: true,
              },
              is_selected_to_display: { type: 'boolean', nullable: true },
            },
          },
        },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
    403: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    404: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
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
