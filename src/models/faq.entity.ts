import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

export interface IFaq extends Document {
    _id?: string;
    question?: string;
    answer?: string;
    type?: "business" | "freelancer" | "both";
    status?: "active" | "inactive";
    importantUrl?: Map< string, {
        urlName?: string;
        url?: string;
    }>;
}

const FaqSchema: Schema = new Schema(
    {
      _id: {
        type: String,
        default: uuidv4,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["business", "freelancer", "both"],
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        required: false,
      },
      importantUrl: {
        type: Map,
        of: new Schema({
          urlName: { type: String, required: false },
          url: { type: String, required: false },
        }),
        required: false,
      },
    },
    {
      timestamps: true,
    },
);

export const FaqModel: Model<IFaq> = mongoose.model<IFaq>(
    "Faq",
    FaqSchema,
);