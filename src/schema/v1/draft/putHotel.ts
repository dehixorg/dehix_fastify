/**
 * File: putHotel.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 1-06-2024
 * Description:schema for API for put hotel Draft
 */

import { FastifySchema } from 'fastify';
import { overviewSchema, sectionSchema, amenitiesSchema } from './errorSchema';

export const putHotelDraftSchema: FastifySchema = {
  description: 'API for put draft',
  tags: ['Draft'],
  params: {
    type: 'object',
    properties: {
      vendor_id: { type: 'string' },
      draft_id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      business_entity_id: { type: 'string' },
      venue_id: { type: 'string' },
      entity_type: { type: 'string' },
      entity_plan: { type: 'string' },
      last_section: { type: 'string' },
      last_subsection: { type: 'string' },
      data: {
        type: 'object',
        additionalProperties: true,
      },
    },
    required: ['data'],
  },

  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string' },
        errors: {
          type: 'object',
          properties: {
            overview: overviewSchema,
            accommodation: sectionSchema,
            pricing: sectionSchema,
            offers_and_package: sectionSchema,
            amenities: amenitiesSchema,
            photos_and_videos: sectionSchema,
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
