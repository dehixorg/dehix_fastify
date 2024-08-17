import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { VerificationDAO } from "../dao/verifications.dao";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO } from "../dao/freelancer.dao";
import { v4 as uuidv4 } from "uuid";

@Service()
export class VerificationService extends BaseService {
  @Inject(VerificationDAO)
  private verificationDAO!: VerificationDAO;
  @Inject(FreelancerDAO)
  private freelancerDAO!: FreelancerDAO;

  /**
   * Service method to request a new verification
   * @param doc_id
   * @param requester_id
   * @returns
   */
  async requestVerification(doc_id: string, requester_id: string) {
    const requesterExist =
      await this.freelancerDAO.findFreelancerById(requester_id);

    if (!requesterExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const verification: any = await this.verificationDAO.createOne(
      uuidv4(),
      requester_id,
      doc_id,
    );

    return verification;
  }

  async updateVerificationStatus(id: string, status: string) {
    this.logger.info("VerificationService: Updating Verification Status: ", id);

    const verificationExist =
      await this.verificationDAO.findVerificationById(id);

    if (!verificationExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Verification"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data: any = await this.verificationDAO.updateStatus(id, status);

    return data;
  }

  async deleteVerification(id: string) {
    this.logger.info(`VerificationService: Deleting Verification: ${id}`);

    const verificationExist =
      await this.verificationDAO.findVerificationById(id);

    if (!verificationExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Verification"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data = await this.verificationDAO.deleteVerification(id);

    return data;
  }
}
