import { EntityType } from '../../../common/constants';

export interface GetPlanQueryString {
  entity_type: EntityType;
  is_same_location: boolean;
  is_kids_space: boolean;
}

export interface GetPlanPriceType {
  Querystring: GetPlanQueryString;
}
