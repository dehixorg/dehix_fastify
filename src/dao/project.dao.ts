import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IProject, ProjectModel } from "../models/project.entity";

@Service()
export class ProjectDAO extends BaseDAO {
  model: Model<IProject>;
  constructor() {
    super();
    this.model = ProjectModel;
  }

  async getFreelancerProjects(user_id: string) {
    try {
      return await this.model.find({ team: { $in: [user_id] } });
    } catch (error) {
      console.error("Error fetching freelancer projects:", error);
      throw error;
    }
  }
}
