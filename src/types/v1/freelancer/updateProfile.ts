import mongoose from "mongoose";

export interface PutFreelancerPathParams {
  freelancer_id: string;
}

export interface PutFreelancerBody {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  dob?: Date;
  professionalInfo?: {
    company?: string;
    jobTitle?: string;
    workDescription?: string;
    workFrom?: Date;
    workTo?: Date;
    referencePersonName?: string;
    referencePersonContact?: string;
    githubRepoLink?: string;
    oracleAssigned?: mongoose.Types.ObjectId;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
  }[];
  skills?: {
    name: string;
    level: string;
    experience: string;
    interviewStatus?: "pending" | "accepted" | "rejected" | "reapplied";
    interviewInfo?: mongoose.Types.ObjectId;
    interviewerRating?: number;
  }[];
  education?: {
    degree?: string;
    universityName?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
    grade?: string;
    oracleAssigned?: mongoose.Types.ObjectId;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
  }[];
  role?: string;
  projects?: {
    [key: string]: {
      _id: string;
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
      oracleAssigned: mongoose.Types.ObjectId;
      verificationStatus: "added" | "verified" | "rejected" | "reapplied";
      verificationUpdateTime: Date;
      comments: string;
    };
  };
  refer?: {
    name?: string;
    contact?: string;
  };
  githubLink?: string;
  linkedin?: string;
  personalWebsite?: string;
  perHourPrice?: number;
  connects?: number;
  resume?: Buffer;
  workExperience?: number;
  isFreelancer?: boolean;
  oracleStatus?:
    | "notApplied"
    | "applied"
    | "approved"
    | "failed"
    | "stopped"
    | "reapplied";
  consultant?: {
    status:
      | "notApplied"
      | "applied"
      | "approved"
      | "failed"
      | "stopped"
      | "reapplied";
  };
  pendingProject?: mongoose.Types.ObjectId[];
  rejectedProject?: mongoose.Types.ObjectId[];
  acceptedProject?: mongoose.Types.ObjectId[];
  oracleProject?: mongoose.Types.ObjectId[];
  userDataForVerification?: mongoose.Types.ObjectId[];
  interviewsAligned?: mongoose.Types.ObjectId[];
}

export interface PutFreelancerSkillsBody {
  skills: string[];
}
export interface PutFreelancerOracleStatusBody {
  oracleStatus: string;
}

export interface PutFreelancerInterviewsAlignedBody {
  interviewsAligned: string[];
}