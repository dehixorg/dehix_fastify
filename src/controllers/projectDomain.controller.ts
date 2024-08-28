import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators";
import { ProjectDomainService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";


import { AuthController } from "../common/auth.controller";
import { DELETE_PROJECT_DOMAIN_BY_ID_ENDPOINT, PROJECT_DOMAIN_ENDPOINT, PROJECT_DOMAIN_ID_ENDPOINT } from "../constants/projectDomain.constant";
import { createProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.create";
import { CreateProjectDomainBody } from "../types/v1/projectDomain/createProjectDomain";
import { deleteProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.delete";
import { DeleteProjectDomainPathParams } from "../types/v1/projectDomain/deleteProjectDomain";

@Controller({ route: PROJECT_DOMAIN_ENDPOINT })
export default class ProjectDomainController extends AuthController {
  @Inject(ProjectDomainService)
  projectDomainService!: ProjectDomainService;


  @POST(PROJECT_DOMAIN_ID_ENDPOINT, { schema: createProjectDomainSchema })
  async createProjectDomain(
    request: FastifyRequest<{ Body: CreateProjectDomainBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`ProjectDomainController -> createProjectDomain -> Creating project-domain`);

      const data = await this.projectDomainService.createProjectDomain(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in createProjectDomain: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DELETE_PROJECT_DOMAIN_BY_ID_ENDPOINT, { schema: deleteProjectDomainSchema })
  async deleteProjectDomainById(
    request: FastifyRequest<{ Params: DeleteProjectDomainPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `ProjectDomainController -> deleteProjectDomainById -> Deleting ProjectDomain using: ${request.params.projectDomain_id}`,
      );
      await this.projectDomainService.deleteProjectDomainById(request.params.projectDomain_id);

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Project Domain deleted" });
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


}
