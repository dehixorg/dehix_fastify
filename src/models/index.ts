import { Model } from "mongoose";
import { FreelancerModel, IFreelancer } from "./freelancer.entity";
import { BusinessModel, IBusiness } from "./business.entity";
import { ProjectModel, IProject } from "./project.entity";
import { BidModel, IBid } from "./bid.entity";
import { InterviewModel, IInterview } from "./interview.entity";
import { SkillModel, ISkill } from "./skills.entity";
import { HireModel, IHire } from "./hireDehixTalent.entity";
import { FaqModel, IFaq } from "./faq.entity";
import { DomainModel, IDomain } from "./domain.entity";
import { VerificationModel, IVerification } from "./verifications.entity";
import { AdminModel, IAdmin } from "./admin.entity";
import { NotificationModel, INotification } from "./notification.entity";
import { ProjectDomainModel, IProjectDomain } from "./projectDomain.entity";
import {
  UserNotificationModel,
  IUserNotification,
} from "./userNotification.entity";

export interface DBModels {
  FreelancerModel?: Model<IFreelancer>;
  BusinessModel?: Model<IBusiness>;
  ProjectModel?: Model<IProject>;
  BidModel?: Model<IBid>;
  InterviewModel?: Model<IInterview>;
  SkillModel?: Model<ISkill>;
  HireModel?: Model<IHire>;
  FaqModel?: Model<IFaq>;
  DomainModel?: Model<IDomain>;
  VerificationModel?: Model<IVerification>;
  AdminModel?: Model<IAdmin>;
  NotificationModel?: Model<INotification>;
  ProjectDomainModel?: Model<IProjectDomain>;
  UserNotificationModel?: Model<IUserNotification>;
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
  DomainModel,
  VerificationModel,
  AdminModel,
  NotificationModel,
  ProjectDomainModel,
  UserNotificationModel,
};

export default models;
