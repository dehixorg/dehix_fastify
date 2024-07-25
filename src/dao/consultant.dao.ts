import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "src/common/base.dao";
import { ConsultantModel, IConsultant } from "src/models/consultant.entity";
@Service()
export class ConsultantDao extends BaseDAO {
  model: Model<IConsultant>;
  constructor() {
    super();
    this.model = ConsultantModel;
  }
  async createConsultant(data: any) {
    return this.model.create(data);
  }
  async updateConsultant(consultant_id: string, update: any) {
    return this.model.findByIdAndUpdate(consultant_id, update);
  }
  async getConsultantById(consulant_id: string) {
    return this.model.findById(consulant_id);
  }
  async getAllConsultant() {
    return this.model.find();
  }
  async deleteConsultant(consultant_id: string) {
    return this.model.findByIdAndDelete(consultant_id);
  }
}
