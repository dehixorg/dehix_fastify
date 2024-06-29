import mongoose from "mongoose";

export interface PutBidPathParams {
  bid_id: string;
}

export interface PutBidBody {
    current_price: number;
    domain_id: string;
}