/**
 * File: checkoutSession.create.ts
 * Author: Gaurav sharma
 * Date: 10-05-2024
 * Description: Schema for API for Checkout
 * tags: ['checkoutSession'],
 */
import { FastifySchema } from 'fastify';
import { EntityPlan } from '../../../constants/checkoutSession.constants';

export const checkoutSessionSchema: FastifySchema = {
  description: 'checkout API',

  tags: ['checkout'],
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' },
    },
    // required: ['authorization'],
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      city: { type: 'string' },
      country: { type: 'string' },
      line1: { type: 'string' },
      line2: { type: 'string', default: null },
      entity_type: { type: 'string' },
      po_box: { type: 'string' },
      area: { type: 'string' },
      tax_id_value: { type: 'string' },
      tax_rate_id: { type: 'string' },
      is_accomodation_available: { type: ['boolean', 'null'] },
      has_same_location: { type: ['boolean', 'null'] },
      is_kids_venue: { type: ['boolean', 'null'] },
      has_group: { type: ['boolean', 'null'] },
      group_name: { type: ['string', 'null'] },
      trial_period_days: { type: ['number', 'null'] },
      venue_type: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      entity_plan: { type: 'string', enum: Object.values(EntityPlan) },
      is_establishment_complex_building: { type: ['boolean', 'null'] },
      complex_name: { type: ['string', 'null'] },
      line_items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            price: { type: 'string' },
            quantity: { type: 'number', minimum: 1 },
          },
          required: ['price', 'quantity'],
        },
      },
    },
    required: [
      'entity_type',
      'entity_plan',
      'line_items',
      'tax_rate_id',
      'name',
      'city',
      'country',
      'line1',
      'po_box',
      'area',
    ],
    if: {
      properties: {
        entity_plan: { const: 'HOTEL_PLAN' },
      },
    },
    then: {
      required: ['is_accomodation_available'],
      properties: {
        is_accomodation_available: { type: 'boolean' },
        is_establishment_complex_building: { const: null },
        has_same_location: { const: null },
        is_kids_venue: { const: null },
        has_group: { type: 'boolean' },
      },
    },
    else: {
      if: {
        properties: {
          entity_plan: { const: 'KIDS_SPACE_MULTI_BRANCH_PLAN' },
        },
      },
      then: {
        required: ['is_kids_venue', 'is_establishment_complex_building'],
        properties: {
          has_same_location: { const: false },
          is_kids_venue: { const: true },
          is_accomodation_available: { const: null },
          is_establishment_complex_building: { type: 'boolean' },
          complex_name: { type: 'string' },
          has_group: { type: 'boolean' },
          unique_branch_count: { type: 'number', nullable: true },
          venue_type: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            items: {
              type: 'string',
            },
          },
        },
      },
      else: {
        if: {
          properties: {
            entity_plan: { const: 'MULTI_VENUE_SAME_LOCATION_PLAN' },
          },
        },
        then: {
          required: ['has_same_location', 'is_establishment_complex_building', 'venue_type'],
          properties: {
            has_same_location: { const: true },
            has_group: { type: 'boolean' },
            group_name: { type: 'string' },
            is_establishment_complex_building: { type: 'boolean' },
            complex_name: { type: 'string' },
            is_accomodation_available: { const: null },
          },
        },
        else: {
          if: {
            properties: {
              entity_plan: { const: 'MULTI_VENUE_MULTI_BRANCH_PLAN' },
            },
          },
          then: {
            required: ['has_same_location', 'is_establishment_complex_building', 'venue_type'],
            properties: {
              has_same_location: { const: false },
              is_establishment_complex_building: { type: 'boolean' },
              complex_name: { type: 'string' },
              is_accomodation_available: { const: null },
              is_kids_venue: { const: null },
              has_group: { type: 'boolean' },
              group_name: { type: 'string' },
              unique_branch_count: { type: 'number', nullable: true },
            },
          },
          else: {
            if: {
              properties: {
                entity_plan: { const: 'KIDS_SPACE_SAME_LOCATION_PLAN' },
              },
            },
            then: {
              required: ['has_same_location', 'is_establishment_complex_building'],
              properties: {
                has_same_location: { type: ['boolean', 'null'] }, // null only when individual venue and kids area is selected
                is_establishment_complex_building: { type: 'boolean' },
                complex_name: { type: 'string' },
                is_accomodation_available: { const: null },
                is_kids_venue: { const: true },
                has_group: { type: 'boolean' },
                group_name: { type: 'string' },
                venue_type: {
                  type: 'array',
                  minItems: 1,
                  maxItems: 1,
                  items: {
                    type: 'string',
                  },
                },
              },
            },
            else: {
              if: {
                properties: {
                  entity_plan: { const: 'INDIVIDUAL_VENUE_PLAN' },
                },
              },
              then: {
                properties: {
                  is_accomodation_available: { const: null },
                  has_same_location: { const: null },
                  is_kids_venue: { const: null },
                  has_group: { const: null },
                  group_name: { const: null },
                  is_establishment_complex_building: { const: null },
                  line_items: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: {
                      type: 'object',
                      properties: {
                        price: { type: 'string' },
                        quantity: { type: 'number', minimum: 1 },
                      },
                      required: ['price', 'quantity'],
                    },
                  },
                  venue_type: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  response: {
    201: {
      description: 'Created',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
        },
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
