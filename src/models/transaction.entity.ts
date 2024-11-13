import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITransaction extends Document {
    _id?: string;
    from?: string;
    to?: string;
    amount?: number;
    type?: "payment" | "referral" | "rewards" | "system generated";
    reference?: string;
    from_type?: "system" | "freelancer" | "business" | "admin";
    reference_id?: string;
  }

const TransactionSchema: Schema = new Schema(
    {
      _id: {
        type: String,
        default: uuidv4,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        enum: ["payment", "referral", "rewards", "system generated"],
        required: true,
      },
      reference: {
        type: String,
        required: false,
      },
      from_type: {
        type: String,
        enum: ["system", "freelancer", "business", "admin"],
        required: true,
      },
      reference_id: {
        type: String,
        required: false,
      }
    },
    {
      timestamps: true,
    },
  );
  
  export const TransactionModel: Model<ITransaction> = mongoose.model<ITransaction>("Transaction", TransactionSchema);
  