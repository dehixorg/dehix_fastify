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
  
}
