import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the Project document
export interface IProject extends Document {
  _id: string;
  projectName: string;
  description: string;
  companyId: string;
  email: string;
  verified?: any;
  isVerified?: string;
  companyName: string;
  start?: Date;
  end?: Date;
  skillsRequired: string[];
  experience?: string;
  role: string;
  projectType: string;
  totalNeedOfFreelancer?: {
    category?: string;
    needOfFreelancer?: number;
    appliedCandidates?: string[];
    rejected?: string[];
    accepted?: string[];
    status?: string;
  }[];
  status?: "Active" | "Pending" | "Completed" | "Rejected";
  team?: string[];
}

// Define the Project schema
const ProjectSchema: Schema<IProject> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    verified: {
      type: Schema.Types.Mixed,
      required: false,
    },
    isVerified: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: false,
    },
    end: {
      type: Date,
      required: false,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    totalNeedOfFreelancer: {
      type: [
        {
          category: { type: String, required: false },
          needOfFreelancer: { type: Number, required: false },
          appliedCandidates: { type: [String], required: false },
          rejected: { type: [String], required: false },
          accepted: { type: [String], required: false },
          status: { type: String, required: false },
        },
      ],
      required: false,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Completed", "Rejected"],
      default: "Pending",
    },
    team: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    paranoid: true,
    underscored: true,
  },
);

// Create and export the Project model
export const ProjectModel: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectSchema,
);

export default {
  ProjectModel,
};
