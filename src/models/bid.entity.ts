import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the Bid document
export interface IBid extends Document {
  bidder_id: string;
  current_price: number;
  project_id: string;
}

// Define the Bid schema
const BidSchema: Schema<IBid> = new Schema({
    bidder_id:{
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        primaryKey: true
      },
      current_price:{
        type: Number,
        required: true
      },
      project_id:{
        type: String,
        required: true
      }
    })



// Create and export the Bid model
export const BidModel: Model<IBid> = mongoose.model<IBid>('Bid', BidSchema);

export default {
  BidModel
};
