/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify"; // Importing Fastify request and reply interfaces
import {
  Controller,
  GET,
  DELETE,
  POST,
  PUT,
  PATCH,
  Inject,
} from "fastify-decorators"; // Importing decorators for defining routes and dependency injection
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants"; // Importing constants for response messages and status codes
import { AuthController } from "../common/auth.controller"; // Importing base controller for authentication-related functionality
import {
  GET_HIRE_BY_ID_ENDPOINT,
  HIRE_CREATE_ENDPOINT,
  HIRE_DEHIX_TALENT_UPDATE_BY_ID,
  HIRE_DELETE_BY_ID_ENDPOINT,
  HIRE_UPDATE_BY_ID_ENDPOINT,
} from "../constants/hireDehixTalent.constant"; // Importing constant endpoints for hireDehixTalent
import { HireService } from "../services/hireDehixTalent.service"; // Importing service for hireDehixTalent logic
import { createhireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.create"; // Importing schema for creating hireDehixTalent
import { IHire } from "../models/hireDehixTalent.entity"; // Importing hireDehixTalent model interface
import {
  UpdateHireDehixTalent,
  updateStatusHireDehixTalentSchema,
} from "../schema/v1/hireDehixTalent/hireDehixTalent.update"; // Importing schema for updating hireDehixTalent
import {
  PutHireDehixTalentBody,
  HireDehixTalentPathParams,
  PutStatusHireDehixTalent,
} from "../types/v1/hireDehixTalent/updateHireDehixTalent"; // Importing types for update operations
import { deleteHireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.delete"; // Importing schema for deleting hireDehixTalent
import { BUSINESS_END_POINT } from "../constants/business.constant"; // Importing constant for business endpoint
import { GetBusinessPathParams } from "../types/v1/business/getBusiness"; // Importing type for business path parameters
import { getHireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.get"; // Importing schema for getting hireDehixTalent

@Controller({ route: BUSINESS_END_POINT }) // Defining controller with the business endpoint
export default class HireController extends AuthController {
  @Inject(HireService)
  hireService!: HireService; // Injecting hire service for handling business logic

  @POST(HIRE_CREATE_ENDPOINT, { schema: createhireDehixTalentSchema }) // Route to create a new hireDehixTalent
  async create(
    request: FastifyRequest<{
      Params: GetBusinessPathParams; // Expecting business ID in path parameters
      Body: IHire; // Expecting hireDehixTalent data in the request body
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> create -> Create a new hireDehixTalent using Id: ${request.params.business_id}`,
      );

      const data = await this.hireService.createhireDehixTalent(
        request.params.business_id, // Fetching business ID from parameters
        request.body, // Getting hire data from request body
      );
      this.logger.warn(data);
      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the created hireDehixTalent data as response
    } catch (error: any) {
      this.logger.error(`Error in CreateHireDehixTalent: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(HIRE_UPDATE_BY_ID_ENDPOINT, { schema: UpdateHireDehixTalent }) // Route to update an existing hireDehixTalent
  async putHireDehixTalent(
    request: FastifyRequest<{
      Params: HireDehixTalentPathParams; // Expecting hireDehixTalent ID in path parameters
      Body: PutHireDehixTalentBody; // Expecting updated hireDehixTalent data in the request body
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> putHireDehixTalent-> update hire dehix talent using ID: ${request.params.hireDehixTalent_id}`,
      );

      const data = await this.hireService.putHireDehixTalent(
        request.params.hireDehixTalent_id, // Fetching hireDehixTalent ID from parameters
        request.body, // Getting updated hire data from request body
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the updated hireDehixTalent data as response
    } catch (error: any) {
      this.logger.error(`Error in experince add: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(HIRE_DELETE_BY_ID_ENDPOINT, { schema: deleteHireDehixTalentSchema }) // Route to delete a hireDehixTalent
  async deleteExperienceFreelancer(
    request: FastifyRequest<{ Params: HireDehixTalentPathParams }>, // Expecting hireDehixTalent ID in path parameters
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> deleteHireDehixTalent -> Deleting hire dehix talent using ID: ${request.params.hireDehixTalent_id}`,
      );

      await this.hireService.deleteHireDehixTalent(
        request.params.hireDehixTalent_id, // Fetching hireDehixTalent ID from parameters
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Hire Dehix Talent deleted" }); // Sending success message upon deletion
    } catch (error: any) {
      this.logger.error(`Error in deleteHireDehixTalent: ${error.message}`);
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "HIRE_DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Hire Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"), // Sending not found message
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

  @GET(GET_HIRE_BY_ID_ENDPOINT, { schema: getHireDehixTalentSchema }) // Route to get hireDehixTalent by ID
  async getHireDehixTalentById(
    request: FastifyRequest<{
      Params: GetBusinessPathParams; // Expecting business ID in path parameters
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> getHireDehixTalentById -> Fetching hire dehix talent for BusinessID: ${request.params.business_id}`,
      );

      const data = await this.hireService.getHireDehixTalentById(
        request.params.business_id, // Fetching hireDehixTalent using business ID
      );

      if (!data || data.length === 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"), // Sending not found message
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved hireDehixTalent data as response
    } catch (error: any) {
      this.logger.error(`Error in getHireDehixTalentById: ${error.message}`);
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"), // Sending not found message
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PATCH(HIRE_DEHIX_TALENT_UPDATE_BY_ID, {
    schema: updateStatusHireDehixTalentSchema, // Route to update hireDehixTalent status by ID
  })
  async updateHireDehixTalentById(
    request: FastifyRequest<{
      Params: HireDehixTalentPathParams; // Expecting hireDehixTalent ID in path parameters
      Body: PutStatusHireDehixTalent; // Expecting status update data in the request body
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> updateHireDehixTalentById -> Updating hireDehixTalent with ID: ${request.params.hireDehixTalent_id}`,
      );

      const data = await this.hireService.updateHireDehixTalent(
        request.params.business_id, // Fetching business ID from parameters
        request.params.hireDehixTalent_id, // Fetching hireDehixTalent ID from parameters
        request.body, // Getting status update data from request body
      );
      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Hire Dehix Talent updated", data }); // Sending success message along with updated data
    } catch (error: any) {
      this.logger.error(`Error in updateHireDehixTalentById: ${error.message}`);
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"), // Sending not found message
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "HIRE_DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Hire Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"), // Sending not found message
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
