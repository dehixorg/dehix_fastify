/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, PUT } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import { VerificationService } from "../services";
import { getVerificationDataSchema } from "../schema/v1/verifications/verifications.get";
import {
  FREELANCER_ENDPOINT,
  ORACLE_ID_ENDPOINT,
  ORACLE_UPDATE_END_POINT,
  VERIFICATION_BY_VERIFIER_ID,
  UPDATE_COMMENT_IN_VERIFICATION,
} from "../constants/freelancer.constant";
import { GetVerifierPathParams } from "../types/v1/verifications/getVerificationData";
import { GetDocTypeQueryParams } from "../types/v1/verifications/getDocType";
import {
  updateVerificationStatusSchema,
  updateVerificationCommentSchema,
} from "../schema/v1/verifications/verification.patch";
import {
  PatchOracleBody,
  PutCommentBody,
} from "../types/v1/verifications/updateVerificationBody";
import { TransactionService } from "../services/transaction.service";

@Controller({ route: FREELANCER_ENDPOINT })
export default class VerificationsController extends AuthController {
  @Inject(VerificationService)
  verificationService!: VerificationService;

  @Inject(TransactionService)
  transactionService!: TransactionService;

  @GET(ORACLE_ID_ENDPOINT, { schema: getVerificationDataSchema })
  async getVerificationData(
    request: FastifyRequest<{
      Params: GetVerifierPathParams;
      Querystring: GetDocTypeQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `VerificationsController -> getVerificationData -> Fetching verification request for verifier ID: ${request.params.verifier_id}`,
      );

      const { verifier_id } = request.params;
      const { doc_type } = request.query;

      const data = await this.verificationService.getVerificationData(
        verifier_id,
        doc_type,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getVerificationData: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(ORACLE_UPDATE_END_POINT, { schema: updateVerificationStatusSchema })
  async updateVerificationStatus(
    request: FastifyRequest<{
      Body: PatchOracleBody;
      Params: GetVerifierPathParams;
      Querystring: GetDocTypeQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `VerificationsController -> updateVerificationData -> updating verification request for verifier ID: ${request.params.verifier_id}`,
      );
      await this.verificationService.updateVerificationStatus(
        request.params.document_id,
        request.body.verification_status,
        request.body.comments,
        request.query.doc_type,
      );
      reply.status(STATUS_CODES.SUCCESS).send({ message: "verification done" });
    } catch (error: any) {
      this.logger.error(`Error in updateVerificationData: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Verification not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Verification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Verification Document not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Verification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
  @GET(VERIFICATION_BY_VERIFIER_ID, { schema: getVerificationDataSchema })
  async getVerificationByVerifierId(
    request: FastifyRequest<{
      Params: GetVerifierPathParams;
      Querystring: GetDocTypeQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `VerificationsController -> getVerificationData -> Fetching verification request for verifier ID: ${request.params.verifier_id}`,
      );

      const { verifier_id } = request.params;
      const { doc_type } = request.query;

      const data = await this.verificationService.getVerificationByVerifierId(
        verifier_id,
        doc_type,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getVerificationData: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
  @PUT(UPDATE_COMMENT_IN_VERIFICATION, {
    schema: updateVerificationCommentSchema,
  })
  async updateVerificationComment(
    request: FastifyRequest<{
      Body: PutCommentBody;
      Params: GetVerifierPathParams;
      Querystring: GetDocTypeQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `VerificationsController -> updateVerificationData -> updating verification request for verifier ID: ${request.params.verification_id}`,
      );
      await this.verificationService.putCommentInVerification(
        request.params.verification_id,
        request.body.comment,
        request.body.verifiedAt,
        request.body.verification_status,
      );
      const { doc_type, verifier_id } =
        await this.verificationService.getVerificationByID(
          request.params.verification_id,
        );
      const freelancer_id = verifier_id;
      try {
        let amount = 0;
        switch (doc_type) {
          case "business":
            amount = parseInt(
              process.env.VERIFICATION_REWARD_BUSINESS || "0",
              10,
            );
            break;
          case "education":
            amount = parseInt(
              process.env.VERIFICATION_REWARD_EDUCATION || "0",
              10,
            );
            break;
          case "experience":
            amount = parseInt(
              process.env.VERIFICATION_REWARD_EXPERIENCE || "0",
              10,
            );
            break;
          case "project":
            amount = parseInt(
              process.env.VERIFICATION_REWARD_PROJECT || "0",
              10,
            );
            break;
          default:
            throw new Error("Invalid doc_type");
        }
        const transactionData = {
          from: "system",
          to: "freelancer",
          amount,
          type: "rewards",
          from_type: "admin",
          reference: "freelancer",
          reference_id: freelancer_id,
        };

        await this.transactionService.create(transactionData);
      } catch (error: any) {
        this.logger.error(
          `Error in updateVerificationComment: ${error.message}`,
        );
      }

      await this.verificationService.increaseConnects(freelancer_id, doc_type);
      reply.status(STATUS_CODES.SUCCESS).send({ message: "verification done" });
    } catch (error: any) {
      this.logger.error(`Error in updateVerificationData: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Verification not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Verification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Verification Document not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Verification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
