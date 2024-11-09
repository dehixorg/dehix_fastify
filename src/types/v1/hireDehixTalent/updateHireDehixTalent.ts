export interface HireDehixTalentPathParams {
  business_id: string;
  hireDehixTalent_id: string;
}

export interface PutHireDehixTalentBody {
  _id: string;
  business_id: string;
  domainId: string;
  domainName: string;
  skillId: string;
  skillName: string;
  description: string;
  experience: string;
  freelancerRequired: string;
  status: "added" | "approved" | "closed" | "completed";
  visible: boolean;
  freelancerApplied: any[];
  freelancerSelected: any[];
}

export interface PutStatusHireDehixTalent {
  status: "added" | "approved" | "closed" | "completed";
  visible: boolean;
}
