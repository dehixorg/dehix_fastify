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
  oracleAssigned: string;
  verificationStatus: "added" | "verified" | "rejected" | "reapplied";
  verificationUpdateTime: Date;
  comments: string;
}
