import { Model } from "mongoose";
import { FreelancerModel, IFreelancer } from "./freelancer.entity";
import { BusinessModel, IBusiness } from "./business.entity";
import { ProjectModel, IProject } from "./project.entity";
import { BidModel, IBid } from "./bid.entity";
import { InterviewModel, IInterview } from "./interview.entity";
import { SkillModel, ISkill } from "./skill.entity";

export interface DBModels {
  FreelancerModel?: Model<IFreelancer>;
  BusinessModel?: Model<IBusiness>;
  ProjectModel?: Model<IProject>;
  BidModel?: Model<IBid>;
  InterviewModel?: Model<IInterview>;
  SkillModel?: Model<ISkill>;
}

const models: DBModels = {
  FreelancerModel,
  BusinessModel,
  ProjectModel,
  BidModel,
  InterviewModel,
  SkillModel,
};

export default models;
