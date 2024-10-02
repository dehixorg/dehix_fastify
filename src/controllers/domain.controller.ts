/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators";
import { DomainService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

import {
  DOMAIN_ENDPOINT,
  DOMAIN_ALL_ENDPOINT,
  DOMAIN_DELETE_BY_ID_ENDPOINT,
  DOMAIN_ID_ENDPOINT,
  DOMAIN_BY_ID_ENDPOINT,
} from "../constants/domain.constant";

import { createDomainSchema } from "../schema/v1/domain/domain.create";
import { createDomainBody } from "../types/v1/domain/createDomain";
import { DeleteDomainPathParams } from "../types/v1/domain/deleteDomain";
import { deleteDomainSchema } from "../schema/v1/domain/domain.delete";
import { getDomainSchema } from "../schema/v1/domain/domain.getAll";
import { AuthController } from "../common/auth.controller";
import { getDomainByIdSchema } from "../schema/v1/domain/domain.get";
import { GetDomainPathParams } from "../types/v1/domain/getDomain";
import { updateDomainSchema } from "../schema/v1/domain/domain.update";
import {
  PutDomainBody,
  PutDomainPathParams,
} from "../types/v1/domain/updateDomain";
import { GET_ALL_ADMIN_ENDPOINT } from "../constants/admin.constant";

@Controller({ route: DOMAIN_ENDPOINT })
export default class DomainController extends AuthController {
  @Inject(DomainService)
  domainService!: DomainService;

  @POST(DOMAIN_ID_ENDPOINT, { schema: createDomainSchema })
  async createDomain(
    request: FastifyRequest<{ Body: createDomainBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`DomainController -> createDomain -> Creating domain`);

      const data = await this.domainService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in createDomain: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DOMAIN_DELETE_BY_ID_ENDPOINT, { schema: deleteDomainSchema })
  async deleteDomainById(
    request: FastifyRequest<{ Params: DeleteDomainPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `DomainController -> deleteDomainById -> Deleting DOMAIN using: ${request.params.domain_id}`,
      );
      await this.domainService.deleteDomainById(request.params.domain_id);

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Domain deleted" });
    } catch (error: any) {
      this.logger.error(`Error in delete domain: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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

  @GET(DOMAIN_ALL_ENDPOINT, { schema: getDomainSchema })
  async getDomain(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`DomainController -> getDomain -> Fetching domain`);

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
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
  @GET(GET_ALL_ADMIN_ENDPOINT, { schema: getDomainSchema })
  async getDomainAdmin(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`DomainController -> getDomain -> Fetching domain`);

      const data = await this.domainService.getAllDomainAdmin();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getDomain: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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

  @GET(DOMAIN_BY_ID_ENDPOINT, { schema: getDomainByIdSchema })
  async getDomainById(
    request: FastifyRequest<{ Params: GetDomainPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `DomainController -> getDomainById -> Fetching domain using: ${request.params.domain_id}`,
      );

      const data = await this.domainService.getDomainById(
        request.params.domain_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getDomainById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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

  @PUT(DOMAIN_BY_ID_ENDPOINT, { schema: updateDomainSchema })
  async updateDomain(
    request: FastifyRequest<{
      Params: PutDomainPathParams;
      Body: PutDomainBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `DomainController -> updateDomain -> Updating domain using: ${request.params.domain_id}`,
      );

      const data = await this.domainService.updateDomain(
        request.params.domain_id,
        request.body,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateDomain: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
