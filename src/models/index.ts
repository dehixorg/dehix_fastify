import { Model } from "mongoose";
import { FreelancerModel, IFreelancer } from "./freelancer.entity";
import { BusinessModel, IBusiness } from "./business.entity";
import { ProjectModel, IProject } from "./project.entity";
import { BidModel, IBid } from "./bid.entity";
import { InterviewModel, IInterview } from "./interview.entity";
import { SkillModel, ISkill } from "./skill.entity";
import { HireModel, IHire } from "./hireDehixTalent.entity";
import { FaqModel, IFaq } from "./faq.entity";
import { VerificationModel, IVerification } from "./verifications.entity";

export interface DBModels {
  FreelancerModel?: Model<IFreelancer>;
  BusinessModel?: Model<IBusiness>;
  ProjectModel?: Model<IProject>;
  BidModel?: Model<IBid>;
  InterviewModel?: Model<IInterview>;
  SkillModel?: Model<ISkill>;
  HireModel?: Model<IHire>;
  FaqModel?: Model<IFaq>;
  VerificationModel?: Model<IVerification>;
}

const models: DBModels = {
  FreelancerModel,
  BusinessModel,
  ProjectModel,
  BidModel,
  InterviewModel,
  SkillModel,
  HireModel,
  FaqModel,
  VerificationModel,
};

export default models;
