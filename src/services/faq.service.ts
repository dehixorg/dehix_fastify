import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FaqDAO } from "../dao";

@Service()
export class FaqService extends BaseService {
  @Inject(FaqDAO)
  private FaqDAO!: FaqDAO;

  async create(body: any) {
    const faq: any = await this.FaqDAO.createFaq(body);
    return faq;
  }

  async deleteFaqById(faq_id: string) {
    this.logger.info(
      `FaqService: deleteFaqById: Deleting FAQ for Faq ID:${faq_id}`,
    );

    const checkFaq = await this.FaqDAO.findFaq(faq_id);
    if (!checkFaq) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const deleteFaq = await this.FaqDAO.deleteFaq(faq_id);

    return deleteFaq;
  }

  async getAllFaqs() {
    this.logger.info("FaqService: getAllFaqs: Fetching All Faqs ");

    const faqs: any = await this.FaqDAO.getAllFaqs();

    if (faqs.length == 0) {
      this.logger.error("FaqService: getAllFaqs: Faq not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Faq"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    return faqs;
  }

  async updateFaqById(faq_id: string, body: any) {
    this.logger.info(
      `FaqService: updateFaqById: Updating FAQ for Faq ID:${faq_id}`,
    );

    const checkFaq = await this.FaqDAO.findFaq(faq_id);
    if (!checkFaq) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data = await this.FaqDAO.updateFaq(faq_id, body);

    return data;
  }
  async updateFaqStatus(faq_id, status) {
    try {
      const result = await this.FaqDAO.updateFaqStatus(
        faq_id,
        status,
      );

      if (!result) {
        throw new Error(
          "Failed to update the faq status. No faq found.",
        );
      }

      return { message: `Faq status updated to ${status}` };
    } catch (error) {
      console.log(error);
    }
  }
}
