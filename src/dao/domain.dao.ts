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

  async countDomains(): Promise<number> {
    return this.model.countDocuments(); // Returns the count of domains
  }

  async addDomain(domainsData: Partial<IDomain>[]) {
    try {
      const insertedDomain = await Promise.all(
        domainsData.map(async (domainData) => {
          const domain = await this.model.create({
            _id: uuidv4(),
            ...domainData,
            createdBy: "admin",
            status: "active",
          });
          return domain;
        }),
      );
      return insertedDomain;
    } catch (error: any) {
      throw new Error(`Failed to add domains: ${error.message}`);
    }
  }

  async findDomain(domain_id: string) {
    return this.model.findById(domain_id);
  }

  async getAllDomain() {
    try {
      const domains = await this.model.find({ status: "active" });
      return domains;
    } catch (error: any) {
      throw new Error(`Failed to fetch domains: ${error.message}`);
    }
  }
  async getAllDomainAdmin() {
    try {
      const domains = await this.model.find();
      return domains;
    } catch (error: any) {
      throw new Error(`Failed to fetch domains: ${error.message}`);
    }
  }

  async deleteDomain(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async createDomain(data: any) {
    return this.model.create(data);
  }

  async findDomainById(id: string) {
    return this.model.findById(id);
  }

  async updateDomain(id: string, update: any) {
    if (update.status) {
      return this.model.findByIdAndUpdate(
        { _id: id },
        { ...update, status: update.status },
        { new: true },
      );
    }
    return this.model.findByIdAndUpdate({ _id: id }, update, { new: true });
  }
}
