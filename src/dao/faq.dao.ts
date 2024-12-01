import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { FaqModel, IFaq, StatusEnum } from "../models/faq.entity";
import { NotFoundError } from "../common/errors";
import { RESPONSE_MESSAGE, ERROR_CODES } from "../common/constants";

// FaqDAO class to interact with the database
@Service()
export class FaqDAO extends BaseDAO {
  model: Model<IFaq>;

  // Constructor to initialize the model
  constructor() {
    super();
    this.model = FaqModel;
  }

  // Method to create a new FAQ
  async createFaq(data: IFaq) {
    try {
      const faq = await this.model.create(data);
      return faq;
    } catch (error: any) {
      throw new Error(`Failed to create FAQ: ${error.message}`);
    }
  }

  // Method to find a FAQ by its ID
  async findFaq(faq_id: string): Promise<IFaq | null> {
    try {
      const faq = await this.model.findById(faq_id).lean().exec();
      if (!faq) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.NOT_FOUND("FAQ"),
          ERROR_CODES.NOT_FOUND,
        );
      }
      return faq;
    } catch (error: any) {
      throw new Error(`Failed to find FAQ: ${error.message}`);
    }
  }

  // Method to delete a FAQ by its ID
  async deleteFaq(id: string): Promise<void> {
    try {
      const faq = await this.model.findByIdAndDelete(id);
      if (!faq) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.NOT_FOUND("FAQ"),
          ERROR_CODES.NOT_FOUND,
        );
      }
    } catch (error: any) {
      throw new Error(`Failed to delete FAQ: ${error.message}`);
    }
  }

  // Method to get all FAQs
  async getAllFaqs(): Promise<IFaq[]> {
    try {
      return await this.model.find().lean().exec();
    } catch (error: any) {
      throw new Error(`Failed to fetch FAQs: ${error.message}`);
    }
  }

  // Method to update a FAQ by its ID
  async updateFaq(faq_id: string, update: Partial<IFaq>): Promise<IFaq | null> {
    try {
      const updatedFaq = await this.model
        .findByIdAndUpdate(faq_id, update, { new: true, runValidators: true })
        .lean()
        .exec();

      if (!updatedFaq) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.NOT_FOUND("FAQ"),
          ERROR_CODES.NOT_FOUND,
        );
      }

      return updatedFaq;
    } catch (error: any) {
      throw new Error(`Failed to update FAQ: ${error.message}`);
    }
  }

  // Method to update the status of a FAQ
  async updateFaqStatus(
    faq_id: string,
    status: StatusEnum,
  ): Promise<IFaq | null> {
    try {
      const updatedFaq = await this.model
        .findByIdAndUpdate(
          faq_id,
          { status, updatedAt: new Date() },
          { new: true, runValidators: true },
        )
        .lean()
        .exec();

      if (!updatedFaq) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.NOT_FOUND("FAQ"),
          ERROR_CODES.NOT_FOUND,
        );
      }

      return updatedFaq;
    } catch (error: any) {
      throw new Error(`Failed to update FAQ status: ${error.message}`);
    }
  }
}
