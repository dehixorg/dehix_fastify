import { EntityType } from '../../../common/constants';

interface QueryString {
  entity_type: EntityType;
}

interface Params {
  venueEntityId: string;
}

interface AmenitiesList {
  amenity_id: string | null;
  is_selected: boolean;
  amenity_name: string;
  venue_amenity_id: string | null;
}

interface PutAmenitiesBody {
  category_type: string;
  amenity_list: AmenitiesList;
}

export interface PutAmenitiesType {
  Querystring: QueryString;
  Params: Params;
  Body: PutAmenitiesBody;
}
