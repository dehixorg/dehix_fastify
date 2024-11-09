import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { AdminModel, IAdmin } from "../models/admin.entity";

@Service()
export class AdminDAO extends BaseDAO {
  model: Model<IAdmin>;
  constructor() {
    super();
    this.model = AdminModel;
  }

  async findAdminById(id: string) {
    return this.model.findById(id);
  }

  async createAdmin(data: any) {
    return this.model.create(data);
  }

  async deleteAdminById(admin_id: string) {
    return this.model.findByIdAndDelete(admin_id);
  }

  async getAllAdmins() {
    try {
      const admin = await this.model.find();
      return admin;
    } catch (error: any) {
      throw new Error(`Failed to fetch admins: ${error.message}`);
    }
  }

  async findOracle() {
    try {
      const admin = await this.model
        .aggregate([
          {
            $lookup: {
              from: "verifications",
              localField: "_id",
              foreignField: "verifier_id",
              as: "verifications",
            },
          },
          {
            $project: {
              _id: 1,
              userName: 1,
              verificationCount: { $size: "$verifications" },
            },
          },
          {
            $sort: {
              verificationCount: -1, // Sort in descending order to get the most verified
            },
          },
          {
            $limit: 1,
          },
        ])
        .exec();

      if (!admin || admin.length === 0) {
        throw new Error("No admin found");
      }

      // Return the admin object with id and username
      return {
        id: admin[0]._id,
        username: admin[0].userName,
      };
    } catch (error: any) {
      console.error("Error finding admin for verification:", error);
      throw new Error(`Failed to find admin: ${error.message}`);
    }
  }
}
