/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import {
  Controller,
  GET,
  DELETE,
  POST,
  PUT,
  PATCH,
  Inject,
} from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import {
  ADD_TALENT_INTO_LOBBY_ENDPOINT,
  GET_HIRE_BY_ID_ENDPOINT,
  HIRE_CREATE_ENDPOINT,
  HIRE_DEHIX_TALENT_UPDATE_BY_ID,
  HIRE_DELETE_BY_ID_ENDPOINT,
  HIRE_UPDATE_BY_ID_ENDPOINT,
} from "../constants/hireDehixTalent.constant";
import { HireService } from "../services/hireDehixTalent.service";
import { addTalentIntoLobbySchema, createhireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.create";
import { IHire } from "../models/hireDehixTalent.entity";
import {
  UpdateHireDehixTalent,
  updateStatusHireDehixTalentSchema,
} from "../schema/v1/hireDehixTalent/hireDehixTalent.update";
import {
  PutHireDehixTalentBody,
  HireDehixTalentPathParams,
  PutStatusHireDehixTalent,
} from "../types/v1/hireDehixTalent/updateHireDehixTalent";
import { deleteHireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.delete";
import { BUSINESS_END_POINT } from "../constants/business.constant";
import { GetBusinessPathParams } from "../types/v1/business/getBusiness";
import { getHireDehixTalentSchema } from "../schema/v1/hireDehixTalent/hireDehixTalent.get";
import { addDehixTalentInLobbyBody } from "../types/v1/hireDehixTalent/addFreelancerIntoLobby";

@Controller({ route: BUSINESS_END_POINT })
export default class HireController extends AuthController {
  @Inject(HireService)
  hireService!: HireService;

  @POST(HIRE_CREATE_ENDPOINT, { schema: createhireDehixTalentSchema })
  async create(
    request: FastifyRequest<{
      Params: GetBusinessPathParams;
      Body: IHire;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> create -> Create a new hireDehixTalent using Id: ${request.params.business_id}`
      );

      const data = await this.hireService.createhireDehixTalent(
        request.params.business_id,
        request.body
      );
      this.logger.warn(data);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateHireDehixTalent: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(HIRE_UPDATE_BY_ID_ENDPOINT, { schema: UpdateHireDehixTalent })
  async putHireDehixTalent(
    request: FastifyRequest<{
      Params: HireDehixTalentPathParams;
      Body: PutHireDehixTalentBody;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> putHireDehixTalent-> update hire dehix talent using ID: ${request.params.hireDehixTalent_id}`
      );

      const data = await this.hireService.putHireDehixTalent(
        request.params.hireDehixTalent_id,
        request.body
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in experince add: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(HIRE_DELETE_BY_ID_ENDPOINT, { schema: deleteHireDehixTalentSchema })
  async deleteExperienceFreelancer(
    request: FastifyRequest<{ Params: HireDehixTalentPathParams }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> deleteHireDehixTalent -> Deleting hire dehix talent using ID: ${request.params.hireDehixTalent_id}`
      );

      await this.hireService.deleteHireDehixTalent(
        request.params.hireDehixTalent_id
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Hire Dehix Talent deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteHireDehixTalent: ${error.message}`);
      if (
        error.ERROR_CODES === "HIRE_DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Hire Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"),
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

  @GET(GET_HIRE_BY_ID_ENDPOINT, { schema: getHireDehixTalentSchema })
  async getHireDehixTalentById(
    request: FastifyRequest<{
      Params: GetBusinessPathParams;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> getHireDehixTalentById -> Fetching hire dehix talent for BusinessID: ${request.params.business_id}`
      );

      const data = await this.hireService.getHireDehixTalentById(
        request.params.business_id
      );

      if (!data || data.length === 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getHireDehixTalentById: ${error.message}`);
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
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

  @PATCH(HIRE_DEHIX_TALENT_UPDATE_BY_ID, {
    schema: updateStatusHireDehixTalentSchema,
  })
  async updateHireDehixTalentById(
    request: FastifyRequest<{
      Params: HireDehixTalentPathParams;
      Body: PutStatusHireDehixTalent;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> updateHireDehixTalentById -> Updating hireDehixTalent with ID: ${request.params.hireDehixTalent_id}`
      );

      const data = await this.hireService.updateHireDehixTalent(
        request.params.business_id,
        request.params.hireDehixTalent_id,
        request.body
      );
      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Hire Dehix Talent updated", data });
    } catch (error: any) {
      this.logger.error(`Error in updateHireDehixTalentById: ${error.message}`);
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "HIRE_DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Hire Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"),
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

  @PUT(ADD_TALENT_INTO_LOBBY_ENDPOINT, {
    schema: addTalentIntoLobbySchema,
  })
  async addDehixTalentIntoLobby(
    request: FastifyRequest<{
      Params: HireDehixTalentPathParams;
      Body: addDehixTalentInLobbyBody;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `HireController -> addDehixTalentIntoLobby -> adding DehixTalent into lobby with ID: ${request.params.hireDehixTalent_id} ${request.body}`
      );

      const response = await this.hireService.addDehixTalentIntoLobby(
        request.params.hireDehixTalent_id,
        request.body
      );

      reply.status(STATUS_CODES.SUCCESS).send({ response });
    } catch (error: any) {
      this.logger.error(`Error in addDehixTalentIntoLobby: ${error.message}`);
      if (
        error.ERROR_CODES === "HIRE_DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Hire Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Hire Dehix Talent"),
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
