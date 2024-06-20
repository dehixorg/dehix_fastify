export interface CheckoutSessionBody {
  tax_rate_id: string;
  tax_id_value: string;
  entity_type: string;
  name: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  po_box: string;
  area: string;
  venue_type: string[];
  is_accomodation_available?: boolean | null;
  has_same_location?: boolean | null;
  is_kids_venue?: boolean | null;
  has_group?: boolean | null;
  group_name?: string | null;
  trial_period_days?: number | null;
  entity_plan: string;
  is_establishment_complex_building: boolean;
  tax_id_code: string;
  line_items: any[];
  complex_name: string;
  unique_branch_count: number | null;
}
