import { EntityType } from '../../../common/constants';
import { Section, DBkeys } from '../../../constants/config.constants';

export interface GetConfigQueryString {
  form_type: EntityType.HOTEL | EntityType.VENUE;
  section: Section;
  sub_section: string;
  key: DBkeys;
}

export interface GetConfigType {
  Querystring: GetConfigQueryString;
}
