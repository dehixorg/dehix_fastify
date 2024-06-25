/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { DomainService } from "../services/domain.service";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

import {
  DOMAIN_ENDPOINT,
  DOMAIN_ALL_ENDPOINT,
} from "../constants/domain.constant";
import { getDomainSchema } from "../schema/v1/domain/getAll";
import { AuthController } from "../common/auth.controller";


@Controller({ route: DOMAIN_ENDPOINT })
export default class DomainController extends AuthController {
  @Inject(DomainService)
  domainService!: DomainService;

  @GET(  DOMAIN_ALL_ENDPOINT, { schema: getDomainSchema })
  async getDomain(
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `DomainController -> getDomain -> Fetching domain`,
      );

      const data = await this.domainService.getAllDomain();
      

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getDomain: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

}