import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IProjectDomain extends Document {
  _id: string;
  label: string;
  description: string;
}

// Define the project domain schema
const ProjectDomainSchema: Schema<IProjectDomain> = new Schema(
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
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Disable __v versioning field
  },
);

// Create and export the Project_Domain model
export const ProjectDomainModel: Model<IProjectDomain> = mongoose.model<IProjectDomain>(
  "Project_Domain",
  ProjectDomainSchema,
);

export default {
  ProjectDomainModel,
};
