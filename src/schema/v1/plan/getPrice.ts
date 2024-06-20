/**
 * File: get.ts
 * Author: Unnayan K. Bharadwaj
 * Date: 7-05-2024
 * Description:schema for API for get plan-price
 */

import { FastifySchema } from 'fastify';

export const getPlanPriceSchema: FastifySchema = {
  description: 'API for get plan-prize',
  tags: ['Plan'],
  // headers: {
  //   type: 'object',
  //   properties: {
  //     'x-api-key': { type: 'string' },
  //   },
  //   required: ['x-api-key'],
  // },
  querystring: {
    type: 'object',
    properties: {
      entity_type: { type: 'string', enum: ['HOTEL', 'INDIVIDUAL_VENUE', 'MULTI_VENUE'] },
      is_kids_space: { type: 'boolean', default: false },
      is_same_location: { type: 'boolean', default: false },
    },
    required: ['entity_type'],
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
          type: 'object',
          properties: {
            plan_name: { type: 'string' },
            line_items: {
              type: 'object',
              properties: {
                base_charge: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },
                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
                base_charge_stay_inclusive: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },
                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
                unlimited_venues_base_charge_inclusive: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },

                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
                unique_venue_branches: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },

                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
                restaurant_with_alcohol: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },
                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
                restaurant_without_alcohol: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'string' },
                    billing_scheme: { type: 'string' },
                    currency: { type: 'string' },
                    product: { type: 'string' },
                    tiers: {
                      type: ['array', 'null'],
                      default: null,
                    },
                    type: { type: 'string' },
                    unit_amount: { type: ['integer', 'null'] },
                    unit_amount_decimal: { type: ['string', 'null'] },
                  },
                },
              },
            },
            tax_rate: {
              type: ['object', 'null'],
              properties: {
                id: { type: 'string' },
                country: { type: 'string' },
                description: { type: ['string', 'null'] },
                display_name: { type: 'string' },
                effective_percentage: { type: 'integer' },
                inclusive: { type: 'boolean' },
                percentage: { type: 'integer' },
                tax_type: { type: ['string', 'null'] },
              },
            },
          },
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
