import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { FaqModel, IFaq } from "../models/faq.entity";

// FaqDAO class to interact with the database
@Service()
export class FaqDAO extends BaseDAO {
  model: Model<IFaq>;

  // Constructor to initialize the model
  constructor() {
    super();
    this.model = FaqModel;
  }

  // Method to create a new faq
  async createFaq(data: any) {
    return this.model.create(data);
  }

  // Method to find a faq by id
  async findFaq(faq_id: string) {
    return this.model.findById(faq_id);
  }

  // Method to delete a faq by id
  async deleteFaq(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  // Method to get all faqs
  async getAllFaqs() {
    try {
      const faqs = await this.model.find();
      return faqs;
    } catch (error: any) {
      throw new Error(`Failed to fetch faqs: ${error.message}`);
    }
  }

  // Method to update a faq by id
  async updateFaq(faq_id: string, update: any) {
    return this.model.findByIdAndUpdate({ _id: faq_id }, update, { new: true });
  }

  async updateFaqStatus(faq_id: string, status: string) {
    try {
      return await this.model.findByIdAndUpdate(
        faq_id,
        { status, updatedAt: new Date() },
        { new: true },
      );
    } catch (error) {
      console.error("Error updating faq status:", error);
      throw new Error("Failed to update faq status");
    }
  }
}
