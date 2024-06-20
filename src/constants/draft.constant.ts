export const HOTEL_DRAFTS_ENDPOINT = '/hotel-drafts';
export const VENUE_DRAFTS_ENDPOINT = '/venue-drafts';
export const DRAFT_ID_ENDPOINT = '/:draft_id';
export const DRAFTS_ENDPOINT = '/drafts';

export enum DraftStatusTypes {
  INIT = 'INIT',
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
}

export enum FormType {
  HOTEL = 'HOTEL',
  VENUE = 'VENUE',
  RESTAURANT = 'RESTAURANT',
}
