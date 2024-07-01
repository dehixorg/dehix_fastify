import mongoose from "mongoose";
export interface PutBusinessPathParams {
  business_id: string;
}

export interface PutBusinessBody {
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
  ProjectList: mongoose.Types.ObjectId[];
  Appliedcandidates: mongoose.Types.ObjectId[];
  hirefreelancer: {
    freelancer: mongoose.Types.ObjectId;
    status: string;
  }[];
}
