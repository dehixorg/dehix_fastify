interface Params {
  vendor_id: string;
}

interface Query {
  is_child: boolean;
  parent_id: string;
}

export interface CreateVenueDraftType {
  Params: Params;
  Querystring: Query;
}