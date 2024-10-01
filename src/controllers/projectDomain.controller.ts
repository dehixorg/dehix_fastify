import { FastifyRequest, FastifyReply } from "fastify"; // Importing Fastify request and reply interfaces
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators"; // Importing decorators for defining routes and dependency injection
import { ProjectDomainService } from "../services"; // Importing the project domain service to handle business logic
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants"; // Importing constants for response messages and status codes

import { AuthController } from "../common/auth.controller"; // Importing base controller for authentication-related functionality
import {
  DELETE_PROJECT_DOMAIN_BY_ID_ENDPOINT,
  PROJECT_DOMAIN_ALL_ENDPOINT,
  PROJECT_DOMAIN_ENDPOINT,
  PROJECT_DOMAIN_ID_ENDPOINT,
} from "../constants/projectDomain.constant"; // Importing constant endpoints for project domain-related operations
import { createProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.create"; // Importing schema for creating project domains
import { CreateProjectDomainBody } from "../types/v1/projectDomain/createProjectDomain"; // Importing types for project domain creation body
import { deleteProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.delete"; // Importing schema for deleting project domains
import { DeleteProjectDomainPathParams } from "../types/v1/projectDomain/deleteProjectDomain"; // Importing types for deleting project domains
import { getAllProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.get"; // Importing schema for retrieving all project domains
import { updateProjectDomainSchema } from "../schema/v1/projectDomain/projectDomain.update"; // Importing schema for updating project domains
import {
  PutProjectDomainBody,
  PutProjectDomainPathParams,
} from "../types/v1/projectDomain/updateProjectDomain"; // Importing types for updating project domains

@Controller({ route: PROJECT_DOMAIN_ENDPOINT }) // Defining controller with the project domain route
export default class ProjectDomainController extends AuthController {
  @Inject(ProjectDomainService)
  projectDomainService!: ProjectDomainService; // Injecting project domain service for handling business logic

  @POST(PROJECT_DOMAIN_ID_ENDPOINT, { schema: createProjectDomainSchema }) // Route to create a new project domain
  async createProjectDomain(
    request: FastifyRequest<{ Body: CreateProjectDomainBody }>, // Expecting project domain data in the request body
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `ProjectDomainController -> createProjectDomain -> Creating project-domain`,
      );

      const data = await this.projectDomainService.createProjectDomain( // Calling the service to create a project domain
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the created project domain data as response
    } catch (error: any) {
      this.logger.error(`Error in createProjectDomain: ${error.message}`); // Logging any errors that occur
      reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DELETE_PROJECT_DOMAIN_BY_ID_ENDPOINT, { // Route to delete a project domain by its ID
    schema: deleteProjectDomainSchema,
  })
  async deleteProjectDomainById(
    request: FastifyRequest<{ Params: DeleteProjectDomainPathParams }>, // Expecting project domain ID in path parameters
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `ProjectDomainController -> deleteProjectDomainById -> Deleting ProjectDomain using: ${request.params.projectDomain_id}`,
      );
      await this.projectDomainService.deleteProjectDomainById(
        request.params.projectDomain_id,
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Project Domain deleted" });
    } catch (error: any) {
      this.logger.error(`Error in delete domain: ${error.message}`); // Logging any errors that occur
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found") // Handling specific error cases for not found
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND, // Sending not found message for project domain
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(PROJECT_DOMAIN_ALL_ENDPOINT, { schema: getAllProjectDomainSchema }) // Route to get all project domains
  async getallProjectDomain(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(
        `projectDomainController -> getallProjectDomain -> Fetching project domain`,
      );

      const data = await this.projectDomainService.getAllProjectDomain(); // Calling the service to fetch all project domains

      if (!data) { // Checking if any project domains were found
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("project domain"), // Sending not found message for project domain
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved project domain data as response
    } catch (error: any) {
      this.logger.error(`Error in getallProjectDomain: ${error.message}`); // Logging any errors that occur
      reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(DELETE_PROJECT_DOMAIN_BY_ID_ENDPOINT, { // Route to update a project domain by its ID
    schema: updateProjectDomainSchema,
  })
  async updateProjectDomain(
    request: FastifyRequest<{ // Expecting project domain ID in path and updated data in body
      Params: PutProjectDomainPathParams;
      Body: PutProjectDomainBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `ProjectDomainController -> updateProjectDomain -> Updating ProjectDomain using: ${request.params.projectDomain_id}`,
      );

      const data = await this.projectDomainService.updateProjectDomain( // Calling the service to update the project domain
        request.params.projectDomain_id,
        request.body,
      );

      if (!data) { // Checking if the updated project domain was found
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("ProjectDomain"), // Sending not found message for project domain
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the updated project domain data as response
    } catch (error: any) {
      this.logger.error(`Error in updateProjectDomain: ${error.message}`); // Logging any errors that occur
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found") // Handling specific error cases for not found
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND, // Sending not found message for project domain
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
