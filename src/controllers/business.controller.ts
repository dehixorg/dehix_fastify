import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, PUT, PATCH } from "fastify-decorators";
import { AuthController } from "../common/auth.controller";
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants";
import {
  ALL_BUSINESS_END_POINT,
  BUSINESS_END_POINT,
  BUSINESS_ID_END_POINT,
  BUSINESS_UPDATE_END_POINT,
  UPDATE_STATUS_OF_BUSINESS_BY_BUSINESS_ID,
  GET_BUSINESS_DETAILS_BY_ID,
} from "../constants/business.constant";
import {
  getBusinessSchema,
  getBusinessDetailsSchema,
  getAllBusinessSchema,
} from "../schema/v1/business/business.get";
import {
  updateBusinessSchema,
  updateBusinessStatusSchema,
} from "../schema/v1/business/business.update";
import { BusinessService } from "../services";
import { GetBusinessPathParams } from "../types/v1/business/getBusiness";
import {
  PutBusinessBody,
  PutBusinessPathParams,
  PutBusinessStatusBody,
} from "../types/v1/business/updateBusiness";

// Define the controller with the main business endpoint
@Controller({ route: BUSINESS_END_POINT })
export default class BusinessController extends AuthController {
  // Inject BusinessService to handle business-related logic
  @Inject(BusinessService)
  BusinessService!: BusinessService;

  // Handler to get a business profile by its ID
  @GET(BUSINESS_ID_END_POINT, { schema: getBusinessSchema })
  async getBusiness(
    request: FastifyRequest<{ Params: GetBusinessPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch the business profile
      this.logger.info(
        `BusinessController -> getBusiness -> Fetching Business profile for ID: ${request.params.business_id}`,
      );

      // Fetch the business profile using the provided ID
      const data = await this.BusinessService.getBusinessProfile(
        request.params.business_id,
      );

      // Return a 404 error if no business profile is found
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      // Send the business profile data if found
      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.info(error, "error in getBusiness");
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to update a business profile by its ID
  @PUT(BUSINESS_UPDATE_END_POINT, { schema: updateBusinessSchema })
  async updateBusinessProfile(
    request: FastifyRequest<{
      Params: PutBusinessPathParams;
      Body: PutBusinessBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to update the business profile
      this.logger.info(
        `BusinessController -> updateBusiness -> updating Business profile for ID: ${request.params.business_id}`,
      );

      // Update the business profile using the provided ID and request body
      const data = await this.BusinessService.updateBusiness(
        request.params.business_id,
        request.body,
      );

      // Return a 400 error if the update fails
      if (!data) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.info(error, "error in PutBusinessProfile ");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to get all business profiles
  @GET(ALL_BUSINESS_END_POINT, { schema: getAllBusinessSchema })
  async getAllBusinessData(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Log the attempt to fetch all business profiles
      this.logger.info(
        `BusinessController -> getBusinessData -> Fetching business profiles`,
      );

      // Fetch all business profiles
      const data = await this.BusinessService.getAllBusinessInfo();

      // Return a 404 error if no profiles are found
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log any errors encountered during the request
      this.logger.error(`Error in getAllBusiness: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @PATCH(UPDATE_STATUS_OF_BUSINESS_BY_BUSINESS_ID, {
    schema: updateBusinessStatusSchema,
  })
  async updateBusinessStatusById(
    request: FastifyRequest<{
      Params: PutBusinessPathParams;
      Body: PutBusinessStatusBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> updateBusinessStatusById -> Updating status with ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.updateBusinessStatus(
        request.params.business_id,
        request.body.status,
      );

      // If successful, send response
      reply.status(STATUS_CODES.SUCCESS).send({
        message: "Business Status updated",
        data,
      });
    } catch (error: any) {
      this.logger.error(`Error in updateBusinessStatusById: ${error.message}`);

      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("BUSINESS not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("BUSINESS"),
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
  @GET(GET_BUSINESS_DETAILS_BY_ID, { schema: getBusinessDetailsSchema })
  async getBusinessdetails(
    request: FastifyRequest<{ Params: GetBusinessPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusiness -> Fetching Business profile for ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.getBusinessProfile(
        request.params.business_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error) {
      this.logger.info(error, "error in getBusiness");
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
