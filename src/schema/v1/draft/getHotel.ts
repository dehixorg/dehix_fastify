/**
 * File: getHotel.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 1-06-2024
 * Description:schema for API for get hotel Draft
 */

import { FastifySchema } from 'fastify';
import { overviewSchema, sectionSchema, amenitiesSchema } from './errorSchema';

export const getHotelDraftSchema: FastifySchema = {
  description: 'API for get draft',
  tags: ['Draft'],
  params: {
    type: 'object',
    properties: {
      vendorId: { type: 'string' },
      draft_id: { type: 'string' },
    },
  },

  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            vendor_id: { type: 'string' },
            subscription_id: { type: 'string' },
            form_type: { type: 'string' },
            business_entity_id: { type: 'string' },
            venue_id: { type: 'string' },
            entity_type: { type: 'string' },
            entity_plan: { type: 'string' },
            last_section: { type: 'string' },
            last_subsection: { type: 'string' },
            status: { type: 'string' },
            form_data: {
              type: 'object',
              additionalProperties: true,
            },
            created_by: { type: 'string' },
            updated_by: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
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
