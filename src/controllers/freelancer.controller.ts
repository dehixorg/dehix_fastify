/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
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
  FREELANCER_PROJECT_ADD_BY_ID,
  FREELANCER_INFO,
  FREELANCER_PROJECT_DELETE_BY_ID,
} from "../constants/freelancer.constant";
import { getFreelancerSchema } from "../schema/v1/freelancer/get";
import { UnAuthorisedError } from "../common/errors";
import { AuthController } from "../common/auth.controller";
import {
  addFreelancerProjectSchema,
  updateFreelancerSchema,
} from "../schema/v1/freelancer/update";
import {
  PutFreelancerPathParams,
  PutFreelancerBody,
} from "../types/v1/freelancer/updateProfile";
import { deleteFreelancerProjectSchema } from "../schema/v1/freelancer/delete";
import { DeleteFreelancerPathParams } from "../types/v1/freelancer/delete";
import { PutFreelancerProjectBody } from "../types/v1/freelancer/updateProject";

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
      `FreelancerController -> getById -> Fetching FREELANCER profile for FREELANCER with ID: ${request.params.freelancer_id}`,
    );

    // if (request.decodedToken.userId !== request.params.freelancer_id) {
    //   this.logger.error(
    //     `FreelancerController -> getById -> Unauthorized access attempt by user with ID: ${request.decodedToken.userId} to FREELANCER with ID: ${request.params.freelancer_id}`,
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

  // @PUT(FREELANCER_ID_ENDPOINT, { schema: updateFreelancerSchema })
  // async getByID(
  //   request: FastifyRequest<{
  //     Params: PutFreelancerPathParams;
  //     Body: PutFreelancerBody;
  //   }>,
  //   reply: FastifyReply,
  // ) {
  //   this.logger.info(
  //     `FreelancerController -> getById -> Fetching FREELANCER profile for FREELANCER with ID: ${request.params.freelancer_id}`,
  //   );
  //   // if (request.decodedToken.userId !== request.params.freelancer_id) {
  //   //   this.logger.error(
  //   //     `FreelancerController -> getById -> Unauthorized access attempt by user with ID: ${request.decodedToken.userId} to FREELANCER with ID: ${request.params.freelancer_id}`,
  //   //   );
  //   //   throw new UnAuthorisedError(RESPONSE_MESSAGE.UNAUTHORISED, ERROR_CODES.UNAUTHORIZED);
  //   // }
  //   const data = await this.freelancerService.updateProfileFreelancer(
  //     request.params.freelancer_id,
  //     request.body.update,
  //   );
  //   reply.status(STATUS_CODES.SUCCESS).send({ data });
  // }

  @DELETE(FREELANCER_PROJECT_DELETE_BY_ID, {
    schema: deleteFreelancerProjectSchema,
  })
  async deleteProjectById(
    request: FastifyRequest<{ Params: DeleteFreelancerPathParams }>,
    reply: FastifyReply,
  ) {
    this.logger.info(
      `FreelancerController -> deleteProjectById -> Deleting project using: ${request.params}`,
    );
    const data = await this.freelancerService.deleteFreelancerProject(
      request.params.freelancer_id,
      request.params.project_id,
    );
    reply.status(STATUS_CODES.SUCCESS).send({ data });
  }

  @PUT(FREELANCER_PROJECT_ADD_BY_ID, { schema: addFreelancerProjectSchema })
  async addProjectById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerProjectBody;
    }>,
    reply: FastifyReply,
  ) {
    this.logger.info(
      `FreelancerController -> addProjectById -> Adding project for freelancer using ID: ${request.params.freelancer_id}`,
    );

    const data = await this.freelancerService.addFreelancerProject(
      request.params.freelancer_id,
      request.body,
    );
    reply.status(STATUS_CODES.SUCCESS).send({ data });
  }
}
