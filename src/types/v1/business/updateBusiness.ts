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
  ProjectList: string[];
}

export interface PutBusinessStatusBody {
  status: string;
}