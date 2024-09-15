import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { string } from "zod";

// Define an interface for the Project document
export interface IProject extends Document {
  _id: string;
  projectName: string;
  description: string;
  companyId: string;
  email: string;
  url?: { value: string }[];
  verified?: any;
  isVerified?: string;
  companyName: string;
  start?: Date;
  end?: Date | null;
  skillsRequired: string[];
  experience?: string;
  role?: string;
  projectType?: string;
  profiles?: {
    domain?: string;
    freelancersRequired?: string;
    skills?: string[];
    experience?: number;
    minConnect?: number;
    rate?: number;
    description?: string;
    domain_id: string;
    selectedFreelancer?: string[];
  }[];
  totalBid?: string[];
  status?: "Active" | "Pending" | "Completed" | "Rejected";
  team?: string[];
  createdAt?: Date;
  updatedAt?: Date;
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
    url: [
      {
        value: { type: String },
      },
    ],
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
      default: null,
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
      required: false,
    },
    projectType: {
      type: String,
      required: false,
    },

    profiles: [
      {
        _id: { type: String },
        domain: { type: String },
        freelancersRequired: { type: String },
        skills: { type: [String] },
        experience: { type: Number },
        minConnect: { type: Number },
        rate: { type: Number },
        description: { type: String },
        domain_id: {
          type: String,
        },
        selectedFreelancer: {
          type: [String],
        },
        totalBid: {
          type: [String],
        },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Pending", "Completed", "Rejected"],
      default: "Pending",
    },
    team: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
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
