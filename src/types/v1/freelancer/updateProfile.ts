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
    oracleAssigned?: string;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
  }[];
  skills?: {
    name: string;
    level: string;
    experience: string;
    interviewStatus?: "pending" | "accepted" | "rejected" | "reapplied";
    interviewInfo?: string;
    interviewerRating?: number;
  }[];
  education?: {
    degree?: string;
    universityName?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
    grade?: string;
    oracleAssigned?: string;
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
      oracleAssigned?: string;
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
  pendingProject?: string[];
  rejectedProject?: string[];
  acceptedProject?: string[];
  oracleProject?: string[];
  userDataForVerification?: string[];
  interviewsAligned?: string[];
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

export interface PutFreelancerExperinceBody{
  company?: string;
    jobTitle?: string;
    workDescription?: string;
    workFrom?: Date;
    workTo?: Date;
    referencePersonName?: string;
    referencePersonContact?: string;
    githubRepoLink?: string;
    oracleAssigned?: string;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
}
export interface PutExperincePathParams{
  freelancer_id:string,
  experience_id:string
}