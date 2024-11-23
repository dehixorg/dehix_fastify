import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IProject, ProjectModel } from "../models/project.entity";
// import { BidModel } from "../models/bid.entity";

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
        ...(status && { status }), // Add status to the query if it's provided
      };

      return await this.model.find(query);
    } catch (error) {
      console.error("Error fetching freelancer projects:", error);
      throw error;
    }
  }

  async getBusinessProjectsById(
    business_id: string,
    status?: "Active" | "Pending" | "Completed" | "Rejected",
  ) {
    try {
      const query = {
        companyId: { $eq: `${business_id}` },
        ...(status && { status }),
      };

      return await this.model.find(query);
    } catch (error) {
      console.error("Error fetching business projects:", error);
      throw error;
    }
  }
  async getProjectById(project_id: string) {
    return this.model.findById(project_id);
  }
  async getAllProject() {
    try {
      const skills = await this.model.find();
      return skills;
    } catch (error: any) {
      throw new Error(`Failed to fetch skills: ${error.message}`);
    }
  }

  async getProjectProfileById(project_id: string, profile_id: string) {
    return this.model.findOne(
      { _id: project_id },
      { profiles: { $elemMatch: { _id: profile_id } } },
    );
  }
  async deleteProjectProfileById(project_id: string, profile_id: string) {
    return this.model.findOneAndUpdate(
      { _id: project_id },
      { $pull: { profiles: { _id: profile_id } } },
      { new: true },
    );
  }

  async updateProjectProfileById(
    project_id: string,
    profile_id: string,
    update: any,
  ) {
    const updateFields = Object.keys(update).reduce((acc, key) => {
      acc[`profiles.$.${key}`] = update[key];
      return acc;
    }, {});

    return this.model.findOneAndUpdate(
      { _id: project_id, "profiles._id": profile_id },
      { $set: updateFields },
      { new: true },
    );
  }
  async updateStatus(project_id: string, status: any) {
    return await this.model.findByIdAndUpdate(
      project_id,
      { status, updatedAt: new Date() },
      { new: true },
    );
  }

  async getProjectAndBidsData(project_id: string) {
    // const project = await ProjectModel.findById(project_id);
    // const bids = await BidModel.find({ project_id });
    // return {
    //   project,
    //   bids,
    // };

    return this.model.aggregate([
      { $match: { _id: project_id } },
      {
        $lookup: {
          from: "bids",
          localField: "_id",
          foreignField: "project_id",
          as: "bids",
        },
      },
    ]);
  }
  async updateBiddingDate(project_id: string, maxBiddingDate: Date, startBiddingDate: Date) {
    return await this.model.findByIdAndUpdate(
      project_id,
      { maxBidDate: maxBiddingDate,
        startBidDate: startBiddingDate
      },
      { new: true},
    )
  }
}
