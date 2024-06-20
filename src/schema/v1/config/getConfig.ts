/**
 * File: getConfig.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 31-05-2024
 * Description:schema for API for get Static Config
 */

import { FastifySchema } from 'fastify';

// Define the schema for individual items
const itemSchema = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    label: { type: 'string' },
    description: { type: 'string' },
  },
};

// Define the schema for HOTEL_TYPE, HOTEL_VIEW, HOTEL_STYLE, EVENT_TYPE, and AMENITIES

const hotelStyleItemSchema = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    label: { type: 'string' },
    data: { type: 'array', items: itemSchema },
  },
};

export const hotelStyleSchema = {
  type: 'array',
  items: hotelStyleItemSchema,
};

const amenitiesItemSchema = {
  type: 'object',
  properties: {
    key: 'string',
    data: {
      type: 'object',
      properties: {
        icon: { type: 'string' },
        amenity_id: { type: ['string', 'null'] },
        is_selected: { type: 'boolean' },
        amenity_name: { type: 'string' },
        venue_amenity_id: { type: ['string', 'null'] },
      },
    },
  },
};

const amenitiesCategorySchema = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    data: { type: 'array', items: amenitiesItemSchema },
  },
};

export const amenitiesSchema = {
  type: 'array',
  items: amenitiesCategorySchema,
};

export const getConfigSchema: FastifySchema = {
  description: 'API for get Static Config',
  tags: ['Config'],
  querystring: {
    type: 'object',
    properties: {
      form_type: { type: 'string', enum: ['HOTEL', 'VENUE'] },
      section: { type: 'string', default: null },
      sub_section: { type: 'string', default: null },
      key: { type: 'string', default: null },
    },
    required: ['form_type'],
    oneOf: [{ required: ['key'] }, { required: ['section'] }],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
        },
      },
    },
    401: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    403: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
