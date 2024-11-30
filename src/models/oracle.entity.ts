import mongoose, { Schema, Document, Model } from "mongoose";

// Enum for Oracle Status
export enum oracleStatusEnum {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  APPLICABLE = "APPLICABLE",
  STOPPED = "STOPPED",
}

// Define an interface for the Oracle document
export interface IOracle extends Document {
  freeLancerId: string;
  experienceYears: number;
  status: oracleStatusEnum;
}

// Define the Oracle schema
const OracleSchema: Schema<IOracle> = new Schema(
  {
    freeLancerId: {
      type: String,
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
      enum: Object.values(oracleStatusEnum),
      default: oracleStatusEnum.NOT_APPLICABLE,
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
