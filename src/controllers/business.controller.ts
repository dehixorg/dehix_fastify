import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
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
  CREATE_BUSINESS_PROJECT_END_POINT,
  DELETE_BUSINESS_PROJECT_END_POINT,
  GET_ALL_BUSINESS_PROJECT_END_POINT,
} from "../constants/business.constant";
import { getBusinessSchema } from "../schema/v1/business/get";
import { updateBusinessSchema } from "../schema/v1/business/update";
import { BusinessService } from "../services";
import { GetBusinessPathParams } from "../types/v1/business/get";
import {
  PutBusinessBody,
  PutBusinessPathParams,
} from "../types/v1/business/update";
import { getProjectPathParams } from "../types/v1/project/post";
import { DeleteProjectPathParams } from "../types/v1/project/delete";
import { IProject } from "../models/project.entity";
import { getProjectSchema } from "../schema/v1/project/get";
import { createProjectSchema } from "../schema/v1/project/create";
import { deleteProjectSchema } from "../schema/v1/project/delete";

@Controller({ route: BUSINESS_END_POINT })
export default class BusinessController extends AuthController {
  @Inject(BusinessService)
  BusinessService!: BusinessService;

  @GET(BUSINESS_ID_END_POINT, { schema: getBusinessSchema })
  async getBusiness(
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
  @PUT(BUSINESS_UPDATE_END_POINT, { schema: updateBusinessSchema })
  async updateBusinessProfile(
    request: FastifyRequest<{
      Params: PutBusinessPathParams;
      Body: PutBusinessBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> updateBusiness -> updating Business profile for ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.updateBusiness(
        request.params.business_id,
        request.body,
      );
      if (!data) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }
    } catch (error) {
      this.logger.info(error, "error in PutBusinessProfile ");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(ALL_BUSINESS_END_POINT, { schema: getBusinessSchema })
  async getAllBusinessData(reply: FastifyReply) {
    try {
      this.logger.info(
        `BusinessController -> getAllBusiness -> Fetching Business All profile `,
      );
      const data = await this.BusinessService.getAllBusinessInfo();
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND,
          code: ERROR_CODES.NOT_FOUND,
        });
      }
    } catch (error) {
      this.logger.info(error, "error in getAllBusiness");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(GET_ALL_BUSINESS_PROJECT_END_POINT, { schema: getProjectSchema })
  async getAllProjectBusiness(reply: FastifyReply) {
    try {
      this.logger.info(
        `BusinessController -> getAllProjectBusiness -> Fetching Business all project `,
      );
      const data = await this.BusinessService.getAllProjectsData();
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      this.logger.info(error, "error in getAllProjectBusiness");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @POST(CREATE_BUSINESS_PROJECT_END_POINT, { schema: createProjectSchema })
  async createBusinessProject(
    request: FastifyRequest<{ Params: getProjectPathParams; Body: IProject }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`BusinessController -> create business project`);

      const data = await this.BusinessService.createBusinessProject(
        request.params.project_id,
        request.body,
      );
      if (!data) {
        return reply.status(STATUS_CODES.NO_CONTENT).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.INVALID_DATA,
        });
      }
      return reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: RESPONSE_MESSAGE.CREATED });
    } catch (error) {
      this.logger.info(error, "error in Post Business");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DELETE_BUSINESS_PROJECT_END_POINT, { schema: deleteProjectSchema })
  async deleteBusinessProject(
    request: FastifyRequest<{ Params: DeleteProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> Delete ProjectBusiness -> Deleting Business All Project `,
      );

      const data = await this.BusinessService.deleteBusinessProject(
        request.params.project_id,
      );
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      this.logger.info(error, "error in Delete Business Project");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
