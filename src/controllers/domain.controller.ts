/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import {
  Controller,
  GET,
  PATCH,
  POST,
  DELETE,
  Inject,
} from "fastify-decorators";
import { DomainService } from "../services/domain.service";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

import {
  DOMAIN_ENDPOINT,
  DOMAIN_ALL_ENDPOINT,
  CREATE_DOMAIN,
  DELETE_DOMAIN,
} from "../constants/domain.constant";
import { getDomainSchema } from "../schema/v1/domain/getAll";
import { AuthController } from "../common/auth.controller";
import { DeleteDomainPathParams } from "../types/v1/domain/delete";
import { deleteDomainSchema } from "../schema/v1/domain/delete";
import { addDomainSchema } from "../schema/v1/domain/create";

@Controller({ route: DOMAIN_ENDPOINT })
export default class DomainController extends AuthController {
  @Inject(DomainService)
  domainService!: DomainService;

  @GET(DOMAIN_ALL_ENDPOINT, { schema: getDomainSchema })
  async getDomain(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`DomainController -> getDomain -> Fetching domains`);

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

  @POST(CREATE_DOMAIN, { schema: addDomainSchema })
  async addDomain(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`DomainController -> addDomain -> Adding domain`);

      const data = await this.domainService.addDomain(request.body);
      reply.status(STATUS_CODES.SUCCESS).send({ message: "Domain created" });
    } catch (error: any) {
      this.logger.error(`Error in addDomain: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DELETE_DOMAIN, { schema: deleteDomainSchema })
  async deleteDomain(
    request: FastifyRequest<{ Params: DeleteDomainPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`DomainController -> deleteDomain -> Deleting domain`);

      const data = await this.domainService.deleteDomain(
        request.params.domain_id,
      );
      reply.status(STATUS_CODES.SUCCESS).send({ message: "Domain deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteDomain: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Domain not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
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
