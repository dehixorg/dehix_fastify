import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { v4 as uuidv4 } from "uuid";
import { ProjectDomainModel, IProjectDomain } from "../models/projectDomain.entity";
@Service()
export class ProjectDomainDAO extends BaseDAO {
  model: Model<IProjectDomain>;

  constructor() {
    super();
    this.model = ProjectDomainModel;
  }

  async addDomain(domainsData: Partial<IProjectDomain>[]) {
    try {
      const insertedDomain = await Promise.all(
        domainsData.map(async (domainData) => {
          const domain = await this.model.create({
            _id: uuidv4(),
            ...domainData,
          });
          return domain;
        }),
      );
      return insertedDomain;
    } catch (error: any) {
      throw new Error(`Failed to add domains: ${error.message}`);
    }
  }

  async findProjectDomain(domain_id: string) {
    return this.model.findById(domain_id);
  }

  async getAllProjectDomain() {
    try {
      const domains = await this.model.find();
      return domains;
    } catch (error: any) {
      throw new Error(`Failed to fetch domains: ${error.message}`);
    }
  }

  async deleteProjectDomain(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async createProjectDomain(data: any) {
    return this.model.create(data);
  }

  async findProjectDomainById(id: string) {
    return this.model.findById(id);
  }

  async updateProjectDomain(id: string, update: any) {
    return this.model.findByIdAndUpdate({ _id: id }, update, { new: true });
  }
}
