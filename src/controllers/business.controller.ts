import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, PUT } from "fastify-decorators";
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
} from "../constants/business.constant";
import { getAllBusinessSchema, getBusinessSchema } from "../schema/v1/business/business.get";
import { updateBusinessSchema } from "../schema/v1/business/business.update";
import { BusinessService } from "../services";
import { GetBusinessPathParams } from "../types/v1/business/getBusiness";
import {
  PutBusinessBody,
  PutBusinessPathParams,
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
}
