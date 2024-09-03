import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { VerificationDAO } from "../dao/verifications.dao";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO } from "../dao/freelancer.dao";

@Service()
export class VerificationService extends BaseService {
  @Inject(VerificationDAO)
  private verificationDAO!: VerificationDAO;
  @Inject(FreelancerDAO)
  private freelancerDAO!: FreelancerDAO;

  /**
   * Service method to request a new verification
   * @param doc_id
   * @param doc_type
   * @param requester_id
   * @returns
   */
  async requestVerification(
    doc_id: string,
    doc_type: string,
    requester_id: string,
  ) {
    // Check if the requester exists
    const requesterExist =
      await this.freelancerDAO.findFreelancerById(requester_id);

    if (!requesterExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    // Find the verifier
    const verifier = await this.freelancerDAO.findOracle(requester_id);
    if (!verifier) {
      throw new Error("Verifier not found"); // Handle case where no verifier is found
    }

    const verifier_id = verifier.id;
    const verifier_username = verifier.username; // Assuming `username` is the field for verifier's username

    // Create a new verification entry
    const verification = await this.verificationDAO.createOne(
      verifier_id,
      verifier_username,
      requester_id,
      doc_id,
      doc_type,
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

  async getVerificationData(
    verifier_id: string,
    doc_type: "skill" | "domain" | "education" | "project" | "experience",
  ) {
    this.logger.info(
      "VerificationsService: verifier get verification request data",
      verifier_id,
    );

    const verifierExist =
      await this.freelancerDAO.findFreelancerById(verifier_id);
    if (!verifierExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data = await this.verificationDAO.getVerificationData(
      verifier_id,
      doc_type,
    );

    if (doc_type == "skill") {
      const requesterData = await Promise.all(
        data.map((doc: any) =>
          this.freelancerDAO.getSkillById(doc.requester_id, doc.document_id),
        ),
      );
      this.logger.info(requesterData, "in get verification request data");
      return requesterData;
    } else if (doc_type == "domain") {
      const requesterData = await Promise.all(
        data.map((doc: any) =>
          this.freelancerDAO.getDomainById(doc.requester_id, doc.document_id),
        ),
      );
      this.logger.info(requesterData, "in get verification request data");
      return requesterData;
    } else if (doc_type == "project") {
      const requesterData = await Promise.all(
        data.map((doc: any) =>
          this.freelancerDAO.getProjectById(doc.requester_id, doc.document_id),
        ),
      );
      this.logger.info(requesterData, "in get verification request data");
      return requesterData;
    } else if (doc_type == "education") {
      const requesterData = await Promise.all(
        data.map((doc: any) =>
          this.freelancerDAO.getEducationById(
            doc.requester_id,
            doc.document_id,
          ),
        ),
      );
      this.logger.info(requesterData, "in get verification request data");
      return requesterData;
    } else {
      const requesterData = await Promise.all(
        data.map((doc: any) =>
          this.freelancerDAO.getExperienceById(
            doc.requester_id,
            doc.document_id,
          ),
        ),
      );
      this.logger.info(requesterData, "in get verification request data");
      return requesterData;
    }
  }
}
