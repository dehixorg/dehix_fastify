interface Params {
  vendor_id: string;
  draft_id: string;
}

interface PutDraftBody {
  business_entity_id: string;
  venue_id: string;
  entity_type: string;
  entity_plan: string;
  last_section: string;
  last_subsection: string;
  data: any;
}

export interface PutDraftType {
  Params: Params;
  Body: PutDraftBody;
}
