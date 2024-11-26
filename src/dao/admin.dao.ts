import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import {
  AdminModel,
  IAdmin,
  AdminStatus,
  AdminType,
} from "../models/admin.entity";

@Service()
export class AdminDAO extends BaseDAO {
  model: Model<IAdmin>;

  constructor() {
    super();
    this.model = AdminModel;
  }

  // Method to find an admin by ID
  async findAdminById(id: string): Promise<IAdmin | null> {
    try {
      const admin = await this.model.findById(id);
      if (!admin) {
        throw new Error(`Admin with ID ${id} not found`);
      }
      return admin;
    } catch (error: any) {
      throw new Error(`Failed to fetch admin: ${error.message}`);
    }
  }

  // Method to create a new admin
  async createAdmin(data: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone?: string;
    status?: AdminStatus;
    type?: AdminType;
  }): Promise<IAdmin> {
    try {
      // Set defaults for status and type if not provided
      data.status = data.status || AdminStatus.PENDING;
      data.type = data.type || AdminType.ADMIN;
      const admin = await this.model.create(data);
      return admin;
    } catch (error: any) {
      throw new Error(`Failed to create admin: ${error.message}`);
    }
  }

  // Method to delete an admin by ID
  async deleteAdminById(admin_id: string): Promise<IAdmin | null> {
    try {
      const admin = await this.model.findByIdAndDelete(admin_id);
      if (!admin) {
        throw new Error(`Admin with ID ${admin_id} not found`);
      }
      return admin;
    } catch (error: any) {
      throw new Error(`Failed to delete admin: ${error.message}`);
    }
  }

  // Method to get all admins
  async getAllAdmins(): Promise<IAdmin[]> {
    try {
      const admins = await this.model.find();
      if (admins.length === 0) {
        throw new Error("No admins found");
      }
      return admins;
    } catch (error: any) {
      throw new Error(`Failed to fetch admins: ${error.message}`);
    }
  }

  // Method to find the most verified admin
  async findOracle(): Promise<{ id: string; username: string } | null> {
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
