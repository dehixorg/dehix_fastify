/**
 * File: get.ts
 * Author: Gaurav Shrama
 * Date: 2-05-2024
 * Description:schema for API for get offer
 * tag : Offer
 */

import { FastifySchema } from 'fastify';

export const allOffersSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    // required: ['authorization'],
  },
  params: {
    type: 'object',
    properties: {
      venue_id: {
        type: 'string',
      },
    },
    required: ['venue_id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              title: {
                type: 'string',
              },
              offer_start_date: { type: 'string' },
              offer_end_date: { type: 'string' },
              description: {
                type: 'string',
              },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
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
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
  },
};
