export enum ProgressStateTypes {
  COMPLETED = 'COMPLETED',
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum ProfileCompletionSteps {
  HOTEL_PROFILE = 'HOTEL_PROFILE',
  RESTAURANT_PROFILE = 'RESTAURANT_PROFILE',
  VENUE_PROFILE = 'VENUE_PROFILE',
  TEAM = 'TEAM',
}

export const SUBSCRIPTIONS_ENDPOINT = '/v1/subscriptions';
export const SUBSCRIPTION_ID_ENDPOINT = '/:subscription_id';
export const GET_PROGRESS_ENDPOINT = '/get-progress';
export const UPDATE_PROGRESS = '/progress-update';

