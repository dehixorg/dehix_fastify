import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FaqDAO } from "src/dao";

@Service()
export class FaqService extends BaseService {
  @Inject(FaqDAO)
  private FaqDAO!: FaqDAO;

  
}
