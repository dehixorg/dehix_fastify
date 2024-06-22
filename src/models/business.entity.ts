import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface for the Business document
export interface IBusiness extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companySize: string;
  password: string;
  email: string;
  phone: string;
  position?: string;
  refer?: string;
  verified?: any;
  isVerified: boolean;
  linkedin?: string;
  personalWebsite?: string;
  isBusiness: boolean;
  connects: number;
  otp?: string;
  otpverified?: string;
  ProjectList: Schema.Types.ObjectId[];
  Appliedcandidates: Schema.Types.ObjectId[];
  hirefreelancer: {
    freelancer: Schema.Types.ObjectId;
    status: string;
  }[];
}

// Define the Business schema
const BusinessSchema: Schema<IBusiness> = new Schema({
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
  password: {
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
  otp: {
    type: String,
    required: false,
  },
  otpverified: {
    type: String,
    required: false,
  },
  ProjectList: [{
    type: Schema.Types.ObjectId,
    ref: 'ProjectListByCompany',
  }],
  Appliedcandidates: [{
    type: Schema.Types.ObjectId,
    ref: 'Applicationforwork',
  }],
  hirefreelancer: [{
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: 'freelancer_data',
    },
    status: {
      type: String,
      default: 'Pending',
    },
  }],
}, {
  timestamps: true, // Add createdAt and updatedAt fields
});

// Create and export the Business model
export const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>('Business', BusinessSchema);

export default BusinessModel;
