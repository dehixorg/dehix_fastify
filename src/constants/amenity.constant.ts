export const AMENITIES_ENDPOINT = '/v1/amenities';

export const AMENITIES_BY_ENTITY_ENDPOINT = '/:venueEntityId';

export const AmenityCategoryMappings = {
    HOTEL: ['ROOM', 'BUSINESS', 'RECREATIONAL'],
    VENUE: ['EQUIPMENTS', 'FACILITIES'],
  };
  
  export enum AmenityCategory {
    RECREATIONAL = 'RECREATIONAL',
    BUSINESS = 'BUSINESS',
    ROOM = 'ROOM',
    EQUIPMENTS = 'EQUIPMENTS',
    FACILITIES = 'FACILITIES',
    NONE = 'NONE',
    ALL = 'ALL',
  }
  