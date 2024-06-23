import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Oracle document
export interface IOracle extends Document {
  freeLancerId: mongoose.Types.ObjectId;
  experienceYears: number;
  status: "Not Applicable" | "Applicable" | "Stopped";
}

// Define the Oracle schema
const OracleSchema: Schema<IOracle> = new Schema(
  {
    freeLancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancer_data",
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
