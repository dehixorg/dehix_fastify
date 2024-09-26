import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ISkill extends Document {
  _id: string;
  label: string;
  description: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;

}

// Define the Skill schema
const SkillSchema: Schema<ISkill> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Use uuidv4 for generating unique IDs
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
      enum: ["active", "inactive", "archived"],
      default: "Active",

    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Disable __v versioning field
  },
);

// Create and export the Skill model
export const SkillModel: Model<ISkill> = mongoose.model<ISkill>(
  "Skill",
  SkillSchema,
);

export default {
  SkillModel,
};
