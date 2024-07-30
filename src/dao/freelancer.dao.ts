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
  async findAllFreelancers(filters: {
    experience?: string[];
    jobType?: string[];
    domain?: string[];
    skills?: string[];
  }) {
    const { experience, jobType, domain, skills } = filters;

    // Build the query object based on the provided filters
    const query: any = {};

    if (experience && experience.length > 0) {
      query.workExperience = { $in: experience };
    }

    if (jobType && jobType.length > 0) {
      query.jobType = { $in: jobType };
    }

    // Handling nested fields in profiles array
    if (domain && domain.length > 0) {
      query["domain"] = { $in: domain };
    }

    if (skills && skills.length > 0) {
      query["skills.name"] = { $in: skills };
    }

    return await this.model.find(query);
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

  async findDomainExistInFreelancer(freelancer_id: string, domain_id: any) {
    return this.model.findOne({
      _id: freelancer_id,
      domain: { $elemMatch: { _id: domain_id } },
    });
  }
  async findSkillExistInFreelancer(freelancer_id: string, skill_id: any) {
    return this.model.findOne({
      _id: freelancer_id,
      skills: { $elemMatch: { _id: skill_id } },
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

  async putProjectById(freelancer_id: string, project_id: string, update: any) {
    return this.model.findOneAndUpdate(
      { _id: freelancer_id, [`projects.${project_id}`]: { $exists: true } },
      {
        $set: { [`projects.${project_id}`]: { _id: project_id, ...update } },
      },
      { new: true },
    );
  }

  async interviewStatusUpdate(id: string, update: string) {
    return this.model.findByIdAndUpdate(id, { interviewee: update });
  }
  async getInterviewer(id: string) {
    return this.model.aggregate([
      {
        $match: { _id: { $ne: id }, workExperience: { $gte: 3 } },
      },
      { $sample: { size: 1 } },
    ]);
  }

  async addFreelancerDomain(id: string, domain: any) {
    const result = await this.model.updateOne(
      { _id: id },
      { $addToSet: { domain: { $each: domain } } },
      { new: true },
    );
    if (!result) {
      throw new Error("Freelancer not found or domain could not be added");
    }
    return {
      id,
      domain,
    }; // Fetch and return the updated document
  }

  async getFreelancerOwnProjects(freelancer_id: string) {
    try {
      return await this.model.find(
        { _id: freelancer_id },
        { projects: 1, _id: 0 },
      );
    } catch (error) {
      console.error("Error fetching freelancer projects:", error);
      throw error;
    }
  }

  async getFreelancerSkills(freelancer_id: string) {
    try {
      return await this.model.find(
        { _id: freelancer_id },
        { skills: 1, _id: 0 },
      );
    } catch (error) {
      console.error("Error fetching freelancer skills:", error);
      throw error;
    }
  }

  async getFreelancerDomains(freelancer_id: string) {
    try {
      return await this.model.find(
        { _id: freelancer_id },
        { domain: 1, _id: 0 },
      );
    } catch (error) {
      console.error("Error fetching freelancer domains:", error);
      throw error;
    }
  }

  async addDehixTalentById(id: string, update: any) {
    const dehixTalentId = uuidv4();
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          [`dehixTalent.${dehixTalentId}`]: {
            _id: dehixTalentId,
            ...update,
          },
        },
      },
      { new: true, upsert: true },
    );
  }

  async getDehixTalentById(freelancerId: string, dehixTalent_id: string) {
    return this.model.findOne(
      {
        _id: freelancerId,
        [`dehixTalent.${dehixTalent_id}`]: { $exists: true },
      },
      { [`dehixTalent.${dehixTalent_id}`]: 1 },
    );
  }

  async deleteDehixTalentById(id: string, dehixTalentId: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $unset: {
          [`dehixTalent.${dehixTalentId}`]: 1,
        },
      },
      { new: true },
    );
  }

  async putConsultant(
    freelancer_id: string,
    consultant_id: string,
    update: any,
  ) {
    return this.model.findByIdAndUpdate(
      {
        _id: freelancer_id,
        [`consultant.${consultant_id}`]: { $exists: true },
      },
      { $set: { [`consultant.${consultant_id}`]: { ...update } } },
    );
  }

  async addConsultant(freelancer_id: string, update: any) {
    const consultant_id = uuidv4();
    return this.model.findByIdAndUpdate(
      freelancer_id,
      {
        $set: {
          [`consultant.${consultant_id}`]: { _id: consultant_id, ...update },
        },
      },
      { new: true, upsert: true },
    );
  }
  async getConsultantById(freelancer_id: string, consultant_id: string) {
    return this.model.findOne({
      _id: freelancer_id,
      [`consultant.${consultant_id}`]: { $exists: true },
    });
  }
  async getConsultant(freelancer_id: string, consultant_id: string) {
    return this.model.findOne(
      { _id: freelancer_id },
      { [`consultant.${consultant_id}`]: 1 },
    );
  }
  async updateConsultant(
    freelancer_id: string,
    consultant_id: string,
    update: any,
  ) {
    return this.model.findByIdAndUpdate(
      {
        _id: freelancer_id,
        [`consultant.${consultant_id}`]: { $exists: true },
      },
      { $set: { [`consultant.${consultant_id}`]: { ...update } } },
      {
        new: true,
      },
    );
  }
  async deleteConsultant(freelancer_id: string, consultant_id: string) {
    return this.model.findByIdAndUpdate(
      freelancer_id,
      { $unset: { [`consultant.${consultant_id}`]: "" } },
      { new: true },
    );
  }
}
