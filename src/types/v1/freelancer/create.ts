interface ProfessionalInfo {
  company: string;
  jobTitle: string;
  workDescription: string;
  workFrom: string;
  workTo: string;
  referencePersonName: string;
  referencePersonContact: string;
  githubRepoLink: string;
  oracleAssigned: null | any;
  verificationStatus: string;
  verificationUpdateTime: string;
  comments: string;
}

interface Skill {
  name: string;
  level: string;
  experience: string;
  interviewStatus: string;
  interviewInfo: null | any;
  interviewerRating: number;
}

interface Education {
  degree: string;
  universityName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  oracleAssigned: null | any;
  verificationStatus: string;
  verificationUpdateTime: string;
  comments: string;
}

interface Project {
  projectName: string;
  description: string;
  verified: any;
  githubLink: string;
  start: string;
  end: string;
  refer: string;
  techUsed: string[];
  role: string;
  projectType: string;
  oracleAssigned: null | any;
  verificationStatus: string;
  verificationUpdateTime: string;
  comments: string;
}

interface Refer {
  name: string;
  contact: string;
}

interface Consultant {
  status: string;
}

export interface CreateFreelancerBody {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  dob: string;
  professionalInfo: ProfessionalInfo[];
  skills: Skill[];
  education: Education[];
  role: string;
  projects: { [key: string]: Project };
  refer: Refer;
  githubLink: string;
  linkedin: string;
  personalWebsite: string;
  perHourPrice: number;
  connects: number;
  resume: null | any;
  workExperience: number;
  isFreelancer: boolean;
  oracleStatus: string;
  consultant: Consultant;
  pendingProject: any[];
  rejectedProject: any[];
  acceptedProject: any[];
  oracleProject: any[];
  userDataForVerification: any[];
  interviewsAligned: any[];
}

export interface CreateFreelancerExperienceBody{
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