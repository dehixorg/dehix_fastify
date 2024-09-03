/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PATCH } from "fastify-decorators";
import {
    STATUS_CODES,
    ERROR_CODES,
    RESPONSE_MESSAGE,
  } from "../common/constants";
import { AuthController } from "../common/auth.controller";
import { VerificationService } from "../services";
import { FREELANCER_ENDPOINT, ORACLE_ENDPOINT, ORACLE_ID_ENDPOINT, ORACLE_UPDATE_END_POINT } from "../constants/freelancer.constant";
import { getVerificationDataSchema } from "../schema/v1/verifications/verifications.get";
import { GetVerifierPathParams } from "../types/v1/verifications/getVerificationData";
import { GetDocTypeQueryParams } from "../types/v1/verifications/getDocType";
import { updateVerificationStatusSchema } from "../schema/v1/verifications/verification.patch";
import { PatchOracleBody } from "../types/v1/verifications/updateVerificationBody";

@Controller({ route: FREELANCER_ENDPOINT })
export default class VerificationsController extends AuthController {
  @Inject(VerificationService)
  verificationService!: VerificationService;

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
  
  @PATCH(ORACLE_UPDATE_END_POINT,{schema:updateVerificationStatusSchema})
  async updateVerificationStatus(request:FastifyRequest<{Body:PatchOracleBody,Params:GetVerifierPathParams,Querystring: GetDocTypeQueryParams;}>,reply:FastifyReply){
try {
  this.logger.info(
    `VerificationsController -> updateVerificationData -> updating verification request for verifier ID: ${request.params.verifier_id}`,
  );
  const data= await this.verificationService.updateVerificationStatus(request.params.document_id,request.body.verification_status,request.body.comments,request.query.doc_type)
 reply.status(STATUS_CODES.SUCCESS).send( {message:"verification done"})
  
} catch (error:any) {
  this.logger.error(`Error in updateVerificationData: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes(
          "Verification not found",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Verification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
     else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes(
          "Verification Document not found",
        )
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
