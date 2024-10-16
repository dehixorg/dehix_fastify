import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
// const { String } = Schema.Types;

export interface IBusiness extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companySize: string;
  email: string;
  phone: string;
  status: "Active"| "Inactive"| "Notverified";
  position?: string;
  refer?: string;
  verified?: any;
  isVerified: boolean;
  linkedin?: string;
  personalWebsite?: string;
  isBusiness: boolean;
  connects: number;
  ProjectList: string[];
}

const BusinessSchema: Schema<IBusiness> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Notverified"],
      default: "Notverified",
    },
    position: {
      type: String,
      required: false,
    },
    refer: {
      type: String,
      required: false,
    },
    verified: {
      type: Schema.Types.Mixed,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    personalWebsite: {
      type: String,
      required: false,
    },
    isBusiness: {
      type: Boolean,
      default: true,
      required: true,
    },
    connects: {
      type: Number,
      default: 0,
    },
    ProjectList: [
      {
        type: String,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>(
  "Business",
  BusinessSchema,
);

export default BusinessModel;
