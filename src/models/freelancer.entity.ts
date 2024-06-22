import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface for the Freelancer document
export interface IFreelancer extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
  refer?: string;
  verified?: any;
  isVerified: boolean;
  linkedin?: string;
  personalWebsite?: string;
  isFreelancer: boolean;
  connects: number;
}

// Define the Freelancer schema
const FreelancerSchema: Schema<IFreelancer> = new Schema({
  _id: {
    type: String,
    default: uuidv4, // Use uuidv4 for generating unique IDs
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: false
  },
  refer: {
    type: String,
    required: false
  },
  verified: {
    type: Schema.Types.Mixed,
    required: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  linkedin: { // Corrected from linkdin to linkedin
    type: String,
    required: false
  },
  personalWebsite: {
    type: String,
    required: false
  },
  isFreelancer: {
    type: Boolean,
    default: true,
    required: true
  },
  connects: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // Add createdAt and updatedAt fields
  versionKey: false // Disable __v versioning field
});

// Create and export the Freelancer model
export const FreelancerModel: Model<IFreelancer> = mongoose.model<IFreelancer>('Freelancer', FreelancerSchema);

export default {
  FreelancerModel
};
