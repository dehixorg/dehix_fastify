import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { DomainDAO } from "../dao/domain.dao";


@Service()
export class DomainService extends BaseService {
  @Inject(DomainDAO)
  private DomainDAO!: DomainDAO;

  async getAllDomain() {
    this.logger.info(
      "DomainService: getAllDomain: Fetching All Domain "
      
    );

    const domain: any =
      await this.DomainDAO.getAllDomain()

    if (!domain) {
      this.logger.error(
        "DomainService: getAllDomain: Domain not found ",
       
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Domain"),
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return domain;
  }

}