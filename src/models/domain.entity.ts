import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IDomain extends Document {
  _id: string;
  label: string;
  description?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
}

const DomainSchema: Schema<IDomain> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Active", "In Active", "Archived"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DomainModel: Model<IDomain> = mongoose.model<IDomain>(
  "Domain",
  DomainSchema,
);

export default {
  DomainModel,
};
