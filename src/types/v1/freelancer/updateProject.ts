import { Types } from "mongoose";
export interface PutFreelancerProjectBody {
  projectName: string;
  description: string;
  verified: boolean;
  githubLink: string;
  start: Date;
  end: Date;
  refer: string;
  techUsed: string[];
  role: string;
  projectType: string;
  oracleAssigned: Types.ObjectId;
  verificationStatus: "added" | "verified" | "rejected" | "reapplied";
  verificationUpdateTime: Date;
  comments: string;
}
