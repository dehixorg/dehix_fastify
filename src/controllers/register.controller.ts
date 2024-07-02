/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Inject, POST } from "fastify-decorators";
import { FreelancerService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import {
  REGISTRATION_ENDPOINT,
  FREELANCER_ENDPOINT,
} from "../constants/freelancer.constant";
import { IFreelancer } from "../models/freelancer.entity";
import { createFreelancerSchema } from "../schema/v1/freelancer/create";
import { BaseController } from "../common/base.controller";
import { BUSINESS_END_POINT } from "../constants/business.constant";
import { createBusinessSchema } from "../schema/v1/business/create";
import { IBusiness } from "../models/business.entity";
import { BusinessService } from "../services/business.service";

@Controller({ route: REGISTRATION_ENDPOINT })
export default class RegisterController extends BaseController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @Inject(BusinessService)
  businessService!: BusinessService;

  @POST(FREELANCER_ENDPOINT, { schema: createFreelancerSchema })
  async create(
    request: FastifyRequest<{ Body: IFreelancer }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> create -> : Creating a new freelancer`,
      );
      const data = await this.freelancerService.createFreelancerProfile(
        request.body,
      );
      this.logger.warn(data)
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in create: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @POST(BUSINESS_END_POINT, { schema: createBusinessSchema })
  async createBusinessProfile(
    request: FastifyRequest<{ Body: IBusiness }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`BusinessController -> create business profile`);

      const data = await this.businessService.createBusiness(request.body);
      if (!data) {
        return reply.status(STATUS_CODES.NO_CONTENT).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.INVALID_DATA,
        });
      }
      return reply
        .status(STATUS_CODES.SUCCESS)
        .send({data});
    } catch (error) {
      this.logger.error("error in controller create business profile", error);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
