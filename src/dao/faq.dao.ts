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

  async getAllFaqs() {
    try {
      const faqs = await this.model.find();
      return faqs;
    } catch (error: any) {
      throw new Error(`Failed to fetch faqs: ${error.message}`);
    }
  }

  async updateFaq(faq_id: string, update: any) {
    return this.model.findByIdAndUpdate({ _id: faq_id }, update, { new: true });
  }
}
