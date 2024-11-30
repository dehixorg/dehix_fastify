import { hireDehixTalentStatusEnum } from "../../../models/hireDehixTalent.entity";

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
  status: hireDehixTalentStatusEnum;
  visible: boolean;
  freelancerApplied: any[];
  freelancerSelected: any[];
}

export interface PutStatusHireDehixTalent {
  status: hireDehixTalentStatusEnum;
  visible: boolean;
}
