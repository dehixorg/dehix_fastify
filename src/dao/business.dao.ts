import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { MongoClient } from "../clients";
import { BaseDAO } from "../common/base.dao";
import { IBusiness, BusinessModel } from "../models/business.entity";

@Service()
export class businessDAO extends BaseDAO {
  model: Model<IBusiness>;

  constructor() {
    super();
    this.model = BusinessModel;
  }

  async getBusinessByEmail(email: string) {
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

  async addFreelancerSkill(id: string, skills: any) {
    return this.model.updateOne(
      { _id: id },
      { $addToSet: { skills: { $each: skills } } },
    );
  }
}
