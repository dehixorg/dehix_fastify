import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IHire extends Document {
  _id: string;
  businessId: string;
  domainId: string;
  domainName: string;
  skillId: string;
  skillName: string;
  description: string;
  experience: string;
  freelancerRequired: number;
  status: string;
  visible: string;
  freelancerApplied: string[];
  freelancerSelected: string[];
}

// Define the Hire schema
const hireSchema: Schema<IHire> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Use uuidv4 for generating unique IDs
      required: true,
    },
    businessId: {
      type: String,
      ref: "Business",
      required: true,
    },
    domainId: {
      type: String,
      ref: "Domain",
      required: false,
    },
    domainName: {
      type: String,
      ref: "Domain",
      required: false,
    },
    skillId: {
      type: String,
      ref: "Skill",
      required: false,
    },
    skillName: {
      type: String,
      ref: "Skill",
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    freelancerRequired: {
      type: Number,
      default: 1,
      required: true,
    },
    status: {
      type: String,
      enum: ["added", "approved", "closed", "completed"],
      default: "added",
    },
    visible: {
      type: String,
      enum: ["on", "off"],
      default: "on",
    },
    freelancerApplied: [
      {
        type: String,
        ref: "Freelancer",
        required: false,
      },
    ],
    freelancerSelected: [
      {
        type: String,
        ref: "Freelancer",
        required: false,
      },
    ],
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Disable __v versioning field
  },
);

// Create and export the Hire model
export const HireModel: Model<IHire> = mongoose.model<IHire>(
  "Hire",
  hireSchema,
);

export default {
  HireModel,
};
