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

  async addDomain(domainsData: Partial<IDomain>[]) {
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

  async getAllDomain() {
    try {
      const domains = await this.model.find();
      return domains;
    } catch (error: any) {
      throw new Error(`Failed to fetch domains: ${error.message}`);
    }
  }
}
