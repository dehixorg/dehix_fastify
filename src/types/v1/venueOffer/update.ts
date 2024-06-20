export interface OfferUpdateBody {
  title: string;
  type: string;
  from: Date;
  to: Date;
  description: string;
}

export interface OfferUpdateParams {
  offer_id: string;
}
