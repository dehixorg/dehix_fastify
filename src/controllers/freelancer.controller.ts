/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST } from "fastify-decorators";
import { FreelancerService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { GetFreelancerPathParams } from "../types/v1";
import {
  FREELANCER_ENDPOINT,
  FREELANCER_ID_ENDPOINT,
  CREATE_PROJECT,
  FREELANCER_INFO,
  FREELANCER_CREATE_ENDPOINT
} from "../constants/freelancer.constant";
import { getFreelancerSchema } from "../schema/v1/freelancer/get";
import { UnAuthorisedError } from "../common/errors";
import { AuthController } from "../common/auth.controller";
import {CreateFreelancerBody} from "../types/v1/freelancer/create"
import { IFreelancer } from "src/models/freelancer.entity";
import { createFreelancerSchema } from "../schema/v1/freelancer/create";

@Controller({ route: FREELANCER_ENDPOINT })
export default class FreelancerController extends AuthController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @GET(FREELANCER_ID_ENDPOINT, { schema: getFreelancerSchema })
  async getById(
    request: FastifyRequest<{ Params: GetFreelancerPathParams }>,
    reply: FastifyReply,
  ) {
    this.logger.info(
      `FreelancerController -> getById -> Fetching vendor profile for vendor with ID: ${request.params.freelancer_id}`,
    );

    // if (request.decodedToken.userId !== request.params.freelancer_id) {
    //   this.logger.error(
    //     `FreelancerController -> getById -> Unauthorized access attempt by user with ID: ${request.decodedToken.userId} to vendor with ID: ${request.params.freelancer_id}`,
    //   );
    //   throw new UnAuthorisedError(RESPONSE_MESSAGE.UNAUTHORISED, ERROR_CODES.UNAUTHORIZED);
    // }

    const data = await this.freelancerService.getFreelancerProfile(
      request.params.freelancer_id,
    );
    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }
  @POST(FREELANCER_CREATE_ENDPOINT, { schema: createFreelancerSchema })
  async create(
    request: FastifyRequest<{ Body: IFreelancer }>,
    reply: FastifyReply,
  ) {
    this.logger.info(
      `FreelancerController -> create -> : Creating a new freelancer`,
    );
    const data = await this.freelancerService.createFreelancerProfile(
      request.body,
    );
    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }

}
