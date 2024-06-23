import {
  PricingType,
  Duration,
  Day,
} from "../../../constants/venuePricing.constants";
interface Params {
  venue_id: string;
}

interface AccomodationSeasonabilityItem {
  high_demand: any[];
  mid_demand: any[];
  low_demand: any[];
}

interface PutVenuePricingBody {
  id?: string;
  price: number;
  accommodation_seasonality: AccomodationSeasonabilityItem[];
  pricing_type: PricingType;
  duration?: Duration;
  start_time?: string;
  end_time?: string;
  days?: Day[];
  is_selected_to_display?: boolean;
}

export interface PutVenuePricingType {
  Params: Params;
  Body: PutVenuePricingBody[];
}
