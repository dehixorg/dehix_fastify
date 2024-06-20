/**
 * File: create.ts
 * Author: Gaurav Sharma
 * Date: 2-05-2024
 * Description: Schema for API for creating offers
 * Tag: VenueOffer
 */

import { FastifySchema } from 'fastify';

export const createOfferSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    // required: ['authorization'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        venue_offer_id: { type: ['string', 'null'] },
        title: { type: 'string' },
        offer_start_date: { type: 'string' },
        offer_end_date: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['title', 'offer_start_date', 'offer_end_date', 'venue_offer_id'],
    },
  },
  response: {
    201: {
      description: 'Created',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
    },
    409: {
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
