import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { FaqModel, IFaq } from "../models/faq.entity";

@Service()
export class FaqDAO extends BaseDAO {
  model: Model<IFaq>;

  constructor() {
    super();
    this.model = FaqModel;
  }

  async createFaq(data: any) {
    return this.model.create(data);
  }
  
  async findFaq(faq_id: string) {
    return this.model.findById(faq_id);
  }

  async deleteFaq(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
