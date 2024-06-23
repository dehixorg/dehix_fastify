/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, GET, Inject, POST } from 'fastify-decorators';
import { FreelancerService } from '../services';
import { STATUS_CODES, ERROR_CODES, RESPONSE_MESSAGE } from '../common/constants';
import { GetFreelancerPathParams } from '../types/v1';
import { VENDORS_ENDPOINT, VENDOR_ID_ENDPOINT ,CREATE_PROJECT, FREELANCER_INFO} from '../constants/freelancer.constant';
import { getFreelancerSchema } from '../schema/v1';
import { UnAuthorisedError } from '../common/errors';
import { AuthController } from '../common/auth.controller';

@Controller({ route: VENDORS_ENDPOINT })
export default class FreelancerController extends AuthController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @GET(VENDOR_ID_ENDPOINT, { schema: getFreelancerSchema })
  async getById(request: FastifyRequest<{ Params: GetFreelancerPathParams }>, reply: FastifyReply) {
    this.logger.info(
      `FreelancerController -> getById -> Fetching vendor profile for vendor with ID: ${request.params.vendor_id}`,
    );

    if (request.decodedToken.userId !== request.params.vendor_id) {
      this.logger.error(
        `FreelancerController -> getById -> Unauthorized access attempt by user with ID: ${request.decodedToken.userId} to vendor with ID: ${request.params.vendor_id}`,
      );
      throw new UnAuthorisedError(RESPONSE_MESSAGE.UNAUTHORISED, ERROR_CODES.UNAUTHORIZED);
    }

    const data = await this.freelancerService.getFreelancerProfile(request.params.vendor_id);
    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }
  
}
