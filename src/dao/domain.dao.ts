import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { DomainModel, IDomain } from "../models/domain.entity";
import { v4 as uuidv4 } from "uuid";
@Service()
export class DomainDAO extends BaseDAO {
  model: Model<IDomain>;

  constructor() {
    super();
    this.model = DomainModel;
  }

  async addDomain(domainsData: any) {
    try {
      const domain = await this.model.create({
        _id: uuidv4(),
        ...domainsData,
      });
      return domain;
    } catch (error: any) {
      throw new Error(`Failed to add domains: ${error.message}`);
    }
  }

  async getAllDomain() {
    try {
      const domains = await this.model.find();
      return domains;
    } catch (error: any) {
      throw new Error(`Failed to fetch domains: ${error.message}`);
    }
  }
  async deleteDomain(domain_id: string) {
    return this.model.findOneAndDelete({ _id: domain_id });
  }
  async getDomainById(domain_id: string) {
    return this.model.findById(domain_id);
  }
}
