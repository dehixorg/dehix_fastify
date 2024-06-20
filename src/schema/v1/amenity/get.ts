/**
 * File: get.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 1-05-2024
 * Description:schema for API for get Amenities
 */

import { FastifySchema } from 'fastify';
import { EntityType, AmenityCategory } from '../../../common/constants';

export const getAmenitiesSchema: FastifySchema = {
  description: 'API for get Amenities',
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
      category_type: { type: 'string', enum: [...Object.values(AmenityCategory)] },
    },
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
                    amenity_id: { type: ['string', 'null'] },
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
