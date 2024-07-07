import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Oracle document
export interface IOracle extends Document {
  freeLancerId: string;
  experienceYears: number;
  status: "Not Applicable" | "Applicable" | "Stopped";
}

// Define the Oracle schema
const OracleSchema: Schema<IOracle> = new Schema(
  {
    freeLancerId: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 5,
    },
    status: {
      type: String,
      enum: ["Not Applicable", "Applicable", "Stopped"],
      default: "Not Applicable",
    },
  },
  {
    timestamps: true,
  },
);

export const OracleModel: Model<IOracle> = mongoose.model<IOracle>(
  "Oracle",
  OracleSchema,
);

export default {
  OracleModel,
};
