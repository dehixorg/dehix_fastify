export interface getProjectPathParams {
  business_id: string;
  project_id: string;
}
export interface PostBusinessProjectBody {
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
