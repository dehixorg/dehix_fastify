import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { DomainDAO } from "../dao/domain.dao";

@Service()
export class DomainService extends BaseService {
  @Inject(DomainDAO)
  private DomainDAO!: DomainDAO;

  async create(body: any) {
    const domain: any = await this.DomainDAO.createDomain(body);
    return domain;
  }

  async deleteDomainById(domain_id: string) {
    this.logger.info(
      `DomainService: deleteDomainById: Deleting Domain for Domain ID:${domain_id}`,
    );

    const checkDomain = await this.DomainDAO.findDomain(domain_id);
    if (!checkDomain) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const deleteDomain = await this.DomainDAO.deleteDomain(domain_id);

    return deleteDomain;
  }

  async getAllDomain() {
    this.logger.info("DomainService: getAllDomain: Fetching All Domain ");

    const domain: any = await this.DomainDAO.getAllDomain();

    if (!domain) {
      this.logger.error("DomainService: getAllDomain: Domain not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Domain"),
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return domain;
  }
}
