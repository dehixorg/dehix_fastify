import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the Verification document
export interface IVerification extends Document {
  _id: string;
  verifier_id: string;
  requester_id: string;
  document_id: string;
  verification_status: "Pending" | "Approved" | "Denied";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Verification schema
const VerificationSchema: Schema<IVerification> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    verifier_id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    requester_id: {
      type: String,
      required: true,
    },
    document_id: {
      type: String,
      required: true,
    },
    verification_status: {
      type: String,
      enum: ["Pending", "Approved", "Denied"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Disable __v versioning field
  },
);

// Create and export the Verification model
export const VerificationModel: Model<IVerification> =
  mongoose.model<IVerification>("Verification", VerificationSchema);

export default {
  VerificationModel,
};
