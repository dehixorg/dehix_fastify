import { Model } from "mongoose";
import { FreelancerModel, IFreelancer } from "./freelancer.entity";
import { BusinessModel, IBusiness } from "./business.entity";
import { ProjectModel, IProject } from "./project.entity";
import { BidModel, IBid } from "./bid.entity";
import { IInterview } from "./interview.entity";

export interface DBModels {
  FreelancerModel?: Model<IFreelancer>;
  BusinessModel?: Model<IBusiness>;
  ProjectModel?: Model<IProject>;
  BidModel?: Model<IBid>;
  InterviewModel?:Model<IInterview>
}

const models: DBModels = {
  FreelancerModel,
  BusinessModel,
  ProjectModel,
  BidModel,
};

export default models;