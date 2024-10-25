import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FaqDAO } from "../dao";

// FaqService class to interact with the database
@Service()
export class FaqService extends BaseService {
  @Inject(FaqDAO)
  private FaqDAO!: FaqDAO;

  // Method to create a new faq
  async create(body: any) {
    const faq: any = await this.FaqDAO.createFaq(body);
    return faq;
  }

  // Method to delete a faq by id
  async deleteFaqById(faq_id: string) {
    this.logger.info(
      `FaqService: deleteFaqById: Deleting FAQ for Faq ID:${faq_id}`,
    );

    // Check if the faq exists
    const checkFaq = await this.FaqDAO.findFaq(faq_id);
    if (!checkFaq) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    // Delete the faq
    const deleteFaq = await this.FaqDAO.deleteFaq(faq_id);

    return deleteFaq;
  }

  // Method to find a faq by id
  async getAllFaqs() {
    this.logger.info("FaqService: getAllFaqs: Fetching All Faqs ");

    const faqs: any = await this.FaqDAO.getAllFaqs();

    // Check if there are no faqs
    if (faqs.length == 0) {
      this.logger.error("FaqService: getAllFaqs: Faq not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Faq"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    return faqs;
  }

  // Method to find a faq by id
  async updateFaqById(faq_id: string, body: any) {
    this.logger.info(
      `FaqService: updateFaqById: Updating FAQ for Faq ID:${faq_id}`,
    );

    // Check if the faq exists
    const checkFaq = await this.FaqDAO.findFaq(faq_id);
    if (!checkFaq) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    // Update the faq
    const data = await this.FaqDAO.updateFaq(faq_id, body);
    
    return data;
  }
}
