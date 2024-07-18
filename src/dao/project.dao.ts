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

  async getFreelancerProjects(
    user_id: string,
    status?: "Active" | "Pending" | "Completed" | "Rejected",
  ) {
    try {
      const query = {
        team: { $in: [user_id] },
        ...(status && { status }), 
      };

      return await this.model.find(query);
    } catch (error) {
      console.error("Error fetching freelancer projects:", error);
      throw error;
    }
  }
}
