import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IFreelancer, FreelancerModel } from "../models/freelancer.entity";
import { v4 as uuidv4 } from "uuid";
import ApplicationForWorkModel, {
  IApplicationForWork,
} from "../models/applyforwork.entity";

@Service()
export class FreelancerDAO extends BaseDAO {
  model: Model<IFreelancer>;
  applicationmodel: Model<IApplicationForWork>;
  constructor() {
    super();
    this.model = FreelancerModel;
    this.applicationmodel = ApplicationForWorkModel;
  }

  async getFreelancerByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findOneByEmail(email: string) {
    return this.model.findOne(
      { email },
      "id password firebase_id full_name email is_email_verified owner_id",
    );
  }

  async getById(id: string) {
    return this.model.findById(
      id,
      "id firebase_id full_name email is_email_verified owner_id",
    );
  }

  async findProject(project_id: string, freelancer_id: string) {
    return this.model.find({
      _id: freelancer_id,
      projects: { $elemMatch: { project_id: project_id } },
    });
  }

  async updateFreelancer(condition: any, newData: any) {
    return this.model.updateOne(condition, newData);
  }

  async findFreelancerById(id: string) {
    return this.model.findById(id);
  }

  async updateFreelancerData(id: string, update: any) {
    return this.model.findByIdAndUpdate({ _id: id }, update);
  }
  async findAllFreelancer() {
    return this.model.find();
  }

  async addFreelancerSkill(id: string, skills: any) {
    const result = await this.model.updateOne(
      { _id: id },
      { $addToSet: { skills: { $each: skills } } },
      { new: true },
    );
    if (!result) {
      throw new Error("Freelancer not found or skills could not be added");
    }
    return {
      id,
      skills,
    }; // Fetch and return the updated document
  }

  async findSkillExistInFreelancer(freelancer_id: string, skills_id: any) {
    return this.model.findOne({
      _id: freelancer_id,
      skills: { $elemMatch: { _id: skills_id } },
    });
  }
  async sendFreelancerInfo(id: string) {
    return this.model
      .findById(id, "id firebase_id full_name email is_email_verified owner_id")
      .populate("project")
      .populate("pendingProject")
      .populate("rejectedProject")
      .populate("acceptedProject");
  }
  // async addExperienceById(id: string, update: any, experinceid: string) {
  //   return this.model.findByIdAndUpdate(id, {
  //     $addToSet: {
  //       professional_info: { _id: experinceid, ...update },
  //     },
  //   });
  // }
  // async deleteExperienceById(id: string, experinceid: string) {
  //   return this.model.findByIdAndDelete(id, {
  //     $pull: {
  //       professionalInfo: { _id: experinceid },
  //     },
  //   });
  // }

  async deleteProjectById(id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      id,
      { $unset: { [`projects.${project_id}`]: "" } },
      { new: true },
    );
  }

  async createProjectById(id: string, project: any) {
    const projectId = uuidv4();
    try {
      const result = await this.model.findByIdAndUpdate(
        id,
        { $set: { [`projects.${projectId}`]: { ...project, _id: projectId } } },
        { new: true, upsert: true },
      );
      return result;
    } catch (error: any) {
      throw new Error(`Failed to add project to freelancer: ${error.message}`);
    }
  }

  async createFreelancer(freelancer: IFreelancer) {
    try {
      const createdFreelancer = await this.model.create(freelancer);
      return createdFreelancer;
    } catch (error: any) {
      throw new Error(`Failed to add freelancer: ${error.message}`);
    }
  }
  async updatePendingProjectById(freelancer_id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      { $addToSet: { pendingProject: project_id } },
      { new: true },
    );
  }
  async updateProjectByIdToAccept(freelancer_id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      {
        $pull: { pendingProject: project_id },
        $addToSet: { acceptedProject: project_id },
      },
      { new: true },
    );
  }
  async updateProjectByIdToReject(freelancer_id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      {
        $pull: { pendingProject: project_id },
        $addToSet: { rejectedProject: project_id },
      },
      { new: true },
    );
  }
  async creatJobApplication(data: any) {
    return this.applicationmodel.create(data);
  }
  async findJobApplicationById(application_id: string) {
    return this.applicationmodel.findById(application_id);
  }
  async updateJobApplicationStatusById(application_id: string, status: string) {
    return this.applicationmodel.findByIdAndUpdate(
      application_id,
      { status: status },
      { new: true },
    );
  }

  async addDomainById(id: string, domain: any) {
    return this.model.updateOne(
      { _id: id },
      { $addToSet: { domain: { $each: domain } } },
    );
  }

  async updateOracleStatusById(freelancer_id: string, oracleStatus: string) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      { oracleStatus },
      { new: true },
    );
  }

  async interviewsAlignedById(
    freelancer_id: string,
    interviewsAligned: string[],
  ) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      { interviewsAligned },
      { new: true },
    );
  }

  async addExperienceById(id: string, update: any) {
    const experienceId = uuidv4();
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          [`professionalInfo.${experienceId}`]: {
            _id: experienceId,
            ...update,
          },
        },
      },
      { new: true, upsert: true },
    );
  }

  async deleteExperienceById(id: string, experienceId: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $unset: {
          [`professionalInfo.${experienceId}`]: "",
        },
      },
      { new: true },
    );
  }

  async putExperienceById(
    freelancerId: string,
    experienceId: string,
    update: any,
  ) {
    return this.model.findOneAndUpdate(
      {
        _id: freelancerId,
        [`professionalInfo.${experienceId}`]: { $exists: true },
      },
      {
        $set: {
          [`professionalInfo.${experienceId}`]: {
            _id: experienceId,
            ...update,
          },
        },
      },
      { new: true },
    );
  }

  async getExperienceById(freelancerId: string, experienceId: string) {
    return this.model.findOne(
      { _id: freelancerId },
      { [`professionalInfo.${experienceId}`]: 1 },
    );
  }

  async getEducationById(freelancerId: string, educationId: string) {
    return this.model.findOne(
      { _id: freelancerId, [`education.${educationId}`]: { $exists: true } },
      { [`education.${educationId}`]: 1 },
    );
  }

  async addEducationById(id: string, update: any) {
    const educationId = uuidv4();
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          [`education.${educationId}`]: { _id: educationId, ...update },
        },
      },
      { new: true, upsert: true },
    );
  }

  async putEducationById(
    freelancerId: string,
    educationId: string,
    update: any,
  ) {
    return this.model.findOneAndUpdate(
      { _id: freelancerId, [`education.${educationId}`]: { $exists: true } },
      {
        $set: { [`education.${educationId}`]: { _id: educationId, ...update } },
      },
      { new: true },
    );
  }

  async deleteEducationById(id: string, educationId: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $unset: {
          [`education.${educationId}`]: "",
        },
      },
      { new: true },
    );
  }

  async addProjectById(id: string, update: any) {
    const projectId = uuidv4();
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          [`projects.${projectId}`]: { _id: projectId, ...update },
        },
      },
      { new: true, upsert: true },
    );
  }

  async getProjectById(freelancerId: string, project_id: string) {
    return this.model.findOne(
      { _id: freelancerId, [`projects.${project_id}`]: { $exists: true } },
      { [`projects.${project_id}`]: 1 },
    );
  }

  async putProjectById(
    freelancer_id: string,
    project_id: string,
    update: any,
  ) {
    return this.model.findOneAndUpdate(
      { _id: freelancer_id, [`projects.${project_id}`]: { $exists: true } },
      {
        $set: { [`projects.${project_id}`]: { _id: project_id, ...update } },
      },
      { new: true },
    );
  }
}
