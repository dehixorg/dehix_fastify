import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IBusiness, BusinessModel } from "../models/business.entity";
import { IProject, ProjectModel } from "../models/project.entity";

@Service()
export class businessDAO extends BaseDAO {
  model: Model<IBusiness>;
  projectmodel: Model<IProject>;
  constructor() {
    super();
    this.model = BusinessModel;
    this.projectmodel = ProjectModel;
  }

  async getBusinessByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async getBusinessById(id: string) {
    return this.model.findOne({ _id: id });
  }
  async populateBusiness(business_id: string) {
    return this.model.findById(business_id).populate("ProjectList").populate({
      path: "hirefreelancer.freelancer",
      model: "Freelancer",
    });
  }
  async findOneByEmail(email: string) {
    return this.model.findOne(
      { email },
      "id password firebase_id full_name email is_email_verified owner_id"
    );
  }
  async createBusiness(data: any) {
    return this.model.create(data);
  }

  async getById(id: string) {
    return this.model.findById(id);
  }

  async updateBusiness(condition: any, newData: any) {
    return this.model.updateOne(condition, newData);
  }

  async findBusinessById(id: string) {
    return this.model.findById(id);
  }

  async updateBusinessData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update);
  }
  async findAllBusiness() {
    return this.model.find();
  }
  async createProjectBusiness(data: any) {
    return this.projectmodel.create(data);
  }
  async findBusinessProject(id: string) {
    return this.projectmodel.findById(id);
  }
  async updateBusinessProject(id: string, update: any) {
    return this.projectmodel.findByIdAndUpdate(id, update);
  }
  async addProjectById(business_id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      business_id,
      { $push: { ProjectList: project_id } },
      { new: true }
    );
  }
  async deleteBusinessProject(id: string) {
    return this.projectmodel.findByIdAndDelete(id);
  }

  async addAppliedCandidateById(business_id: string, candidate_id: string) {
    return this.model.findByIdAndUpdate(business_id, {
      $addToSet: {
        Appliedcandidates: candidate_id,
      },
    });
  }
  async addCandidateByCategory(
    project_id: string,
    category: string,
    candidate_id: string
  ) {
    this.projectmodel.findOneAndUpdate(
      { _id: project_id, "TotalNeedOffreelancer.category": category },
      {
        $addToSet: {
          "TotalNeedOffreelancer.$.appliedCandidates": candidate_id,
        },
      },
      { new: true }
    );
  }
  async updateProjectStatus(project_id: string, category: string) {
    return this.projectmodel.updateOne(
      { _id: project_id, "TotalNeedOffreelancer.category": category },
      { $set: { "TotalNeedOffreelancer.$.status": "not assigned" } }
    );
  }
  async findAllProjects(filters: {
    location?: string[];
    jobType?: string[];
    domain?: string[];
    skills?: string[];
  }) {
    const { location, jobType, domain, skills } = filters;

    // Build the query object based on the provided filters
    const query: any = {};

    if (location && location.length > 0) {
      query.location = { $in: location };
    }

    if (jobType && jobType.length > 0) {
      query.jobType = { $in: jobType };
    }

    // Handling nested fields in profiles array
    if (domain && domain.length > 0) {
      query["profiles.domain"] = { $in: domain };
    }

    if (skills && skills.length > 0) {
      query.skillsRequired = { $in: skills };
    }

    return await this.projectmodel.find(query);
  }
  async getProjectById(project_id: string) {
    return this.projectmodel.findById(project_id);
  }
}
