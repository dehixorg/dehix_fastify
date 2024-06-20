/**
 * File: put.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 2-05-2024
 * Description:schema for API for put Amenities
 */

import { FastifySchema } from 'fastify';
import { EntityType } from '../../../common/constants';

export const putAmenitiesSchema: FastifySchema = {
  description: 'API for put Amenities',
  tags: ['amenity'],
  params: {
    type: 'object',
    properties: {
      venueEntityId: { type: 'string' },
    },
    required: ['venueEntityId'],
  },
  querystring: {
    type: 'object',
    properties: {
      entity_type: { type: 'string', enum: [...Object.values(EntityType)] },
    },
  },
  body: {
    type: 'object',
    properties: {
      category_type: { type: 'string' },
      amenity_list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            amenity_id: { type: ['string', 'null'] },
            is_selected: { type: 'boolean' },
            amenity_name: { type: 'string' },
            venue_amenity_id: { type: ['string', 'null'] },
          },
          required: ['amenity_id', 'is_selected', 'amenity_name', 'venue_amenity_id'],
        },
      },
    },
    required: ['category_type', 'amenity_list'],
  },

  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category_type: { type: 'string' },
              amenity_list: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    amenity_id: { type: 'string' },
                    is_selected: { type: 'boolean' },
                    amenity_name: { type: 'string' },
                    venue_amenity_id: { type: ['string', 'null'] },
                  },
                },
              },
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
  },
};
