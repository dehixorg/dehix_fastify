import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the Bid document
export interface IBid extends Document {
  _id: string;
  bidder_id: string;
  current_price: number;
  project_id: string;
  domain_id: string; // Make sure to include domain_id in the interface
  bid_status: "Pending" | "Accepted" | "Rejected" ;
}

// Define the Bid schema
const BidSchema: Schema<IBid> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    bidder_id: {
      type: String,
      default: uuidv4, // Use uuidv4 for generating unique IDs
      required: true,
    },
    current_price: {
      type: Number,
      required: true,
      default: 0, // Set a default value if needed
    },
    project_id: {
      type: String,
      required: true,
    },
    domain_id: {
      type: String,
      required: true,
    },
    bid_status: {
      type: String,
      enum: ["Pending" , "Accepted" , "Rejected"],
      default: "Pending",
    }
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Disable __v versioning field
  },
);

// Create and export the Bid model
export const BidModel: Model<IBid> = mongoose.model<IBid>("Bid", BidSchema);

export default {
  BidModel,
};
