// import { UserModel } from './user.entity';
import { Model } from "mongoose";
import { BusinessModel } from "./business.entity";
import { ProjectModel } from "./project.entity";
import { FreelancerModel } from "./freelancer.entity";

export interface DBModels {
  // UserModel?: ModelDefined<any, any>;
  FreelancerModel?: Model<typeof FreelancerModel>;
  BusinessModel?: Model<typeof BusinessModel>;
  ProjectModel?: Model<typeof ProjectModel>;
}

export default {
  FreelancerModel,
  BusinessModel,
  ProjectModel,
};
