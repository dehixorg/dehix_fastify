import { EntityType, AmenityCategory } from "../../../common/constants";

interface QueryString {
  entity_type: EntityType;
  category_type: AmenityCategory;
}

interface Params {
  venueEntityId: string;
}
export interface GetAmenitiesType {
  Querystring: QueryString;
  Params: Params;
}
