export interface OfferCreateBody {
  title: string;
  offer_end_date: Date;
  offer_start_date: Date;
  description: string;
  venue_id: string;
}

export interface OfferCreateParams {
  venue_id: string;
}
