import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject } from "fastify-decorators";
import { getBusinessDetailsPublicSchema } from "../schema/v1/business/business.get";
import { getFreelancerPublicDetails } from "../schema/v1/freelancer/freelancer.get";
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants";
import { GetBusinessPathParams } from "../types/v1/business/getBusiness";
import { GetFreelancerPathParams } from "../types/v1/freelancer/getProfile";
import { BusinessService, FreelancerService } from "../services";
import {
  PUBLIC_END_POINT,
  BUSINESS_PUBLIC_PAGE_BY_ID,
  FREELANCER_PUBLIC_PAGE_BY_ID,
} from "../constants/public.constant";
import { BaseController } from "../common/base.controller";

@Controller({ route: PUBLIC_END_POINT })
export default class PublicController extends BaseController {
  @Inject(BusinessService)
  BusinessService!: BusinessService;

  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @GET(BUSINESS_PUBLIC_PAGE_BY_ID, { schema: getBusinessDetailsPublicSchema })
  async getBusinessdetails(
    request: FastifyRequest<{ Params: GetBusinessPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusiness -> Fetching Business profile for ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.getBusinessProfile(
        request.params.business_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error) {
      this.logger.info(error, "error in getBusiness");
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(FREELANCER_PUBLIC_PAGE_BY_ID, { schema: getFreelancerPublicDetails })
  async getFreelancerDetails(
    request: FastifyRequest<{ Params: GetFreelancerPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerDetails -> Fetching freelancer details for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerProfile(
        request.params.freelancer_id,
      );
      console.log("DATA:", data);

      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancer: ${error.message}`);
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
}
