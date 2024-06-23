export interface FreelancerRegistrationBody {
  full_name: string;
  email: string;
  password: string;
  user_name?: string;
  dob?: string;
  phone?: string;
  position?: string;
  refer?: {
    email?: string;
    name?: string;
    linkedin?: string;
  };
  verified_by?: {
    ref: "freelancer_data";
  };
  is_verified?: boolean;
  linkedin?: string;
  website?: string;
  connects?: number;
  is_oracle?: boolean;
  professional_info?: {
    Company?: string;
    Job_Title?: string;
    Work_Description?: string;
    Work_From?: Date;
    Work_To?: Date;
    Reference_Person_Name?: string;
    Reference_Person_Contact?: string;
    GitHub_Repo_Link?: string;
    Oracle_Assigned?: any; 
    Verification_Status?: "added" | "verified" | "rejected" | "reapplied";
    Verification_Update_Time?: Date;
    Comments?: string;
  };
  projects?: {
    project_name: string;
    description: string;
    verified?: any; 
    github_link: string;
    start?: Date;
    end?: Date;
    refer: string;
    tech_used: string[];
    role: string;
    project_type?: string;
    oracle_assigned?: any;
    verification_status?: "added" | "verified" | "rejected" | "reapplied";
    verification_update_time?: Date;
    comments?: string;
  }[];
  skills?: {
    skill_id: string; // Assuming uuid here
    skill_label: string;
  }[];
}
