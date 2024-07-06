/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { FreelancerService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { GetFreelancerPathParams } from "../types/v1";
import {
  FREELANCER_ENDPOINT,
  FREELANCER_ID_ENDPOINT,
  FREELANCER_PROJECT_ADD_BY_ID,
  FREELANCER_CREATE_ENDPOINT,
  FREELANCER_PROJECT_DELETE_BY_ID,
  FREELANCER_SKILLS_ADD_BY_ID,
  FREELANCER_SKILL_DELETE_BY_ID,
  FREELANCER_ORACLE_STATUS_BY_ID,
  FREELANCER_INTERVIEWS_ALIGNED_BY_ID,
} from "../constants/freelancer.constant";
import { getFreelancerSchema } from "../schema/v1/freelancer/get";
import { AuthController } from "../common/auth.controller";
import {
  addFreelancerProjectSchema,
  interviewsAlignedSchema,
  oracleStatusSchema,
  updateFreelancerSchema,
} from "../schema/v1/freelancer/update";
import {
  PutFreelancerPathParams,
  PutFreelancerBody,
  PutFreelancerSkillsBody,
  PutFreelancerOracleStatusBody,
  PutFreelancerInterviewsAlignedBody,
} from "../types/v1/freelancer/updateProfile";
import {
  deleteFreelancerProjectSchema,
  deleteFreelancerSkillSchema,
} from "../schema/v1/freelancer/delete";
import {
  DeleteFreelancerProjectPathParams,
  DeleteFreelancerSkillPathParams,
} from "../types/v1/freelancer/delete";
import { PutFreelancerProjectBody } from "../types/v1/freelancer/updateProject";

import { addFreelancerSkillsSchema } from "../schema/v1/freelancer/update";
import { IFreelancer } from "../models/freelancer.entity";
import { createFreelancerSchema } from "../schema/v1/freelancer/create";

@Controller({ route: FREELANCER_ENDPOINT })
export default class FreelancerController extends AuthController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @GET(FREELANCER_ID_ENDPOINT, { schema: getFreelancerSchema })
  async getFreelancer(
    request: FastifyRequest<{ Params: GetFreelancerPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancer -> Fetching freelancer profile for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerProfile(
        request.params.freelancer_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancer: ${error.message}`);
      if (error.ERROR_CODES === "FREELANCER_NOT_FOUND" || error.message.includes('Freelancer with provided ID could not be found.')) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND('Freelancer'),
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

  @PUT(FREELANCER_ID_ENDPOINT, { schema: updateFreelancerSchema })
  async updateFreelancer(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateFreelancer -> Updating profile for ID: ${request.params.freelancer_id}`,
      );
      const data = await this.freelancerService.updateProfileFreelancer(
        request.params.freelancer_id,
        request.body,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateFreelancer: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(FREELANCER_PROJECT_DELETE_BY_ID, {
    schema: deleteFreelancerProjectSchema,
  })
  async deleteProjectById(
    request: FastifyRequest<{ Params: DeleteFreelancerProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteProjectById -> Deleting project using: ${request.params}`,
      );
      const data = await this.freelancerService.deleteFreelancerProject(
        request.params.freelancer_id,
        request.params.project_id,
      );
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in deleteProjectById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(FREELANCER_SKILL_DELETE_BY_ID, {
    schema: deleteFreelancerSkillSchema,
  })
  async deleteSkillById(
    request: FastifyRequest<{ Params: DeleteFreelancerSkillPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteSkillById -> Deleting skill using: ${request.params}`,
      );
      const data = await this.freelancerService.deleteFreelancerSkill(
        request.params.freelancer_id,
        request.params.skill_id,
      );

      if (data.modifiedCount == 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Skill"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in deleteSkillById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(FREELANCER_PROJECT_ADD_BY_ID, { schema: addFreelancerProjectSchema })
  async addProjectById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerProjectBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> addProjectById -> Adding project for freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.addFreelancerProject(
        request.params.freelancer_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in addProjectById: ${error.message}`);

      if (error.ERROR_CODES === "FREELANCER_NOT_FOUND" || error.message.includes('Freelancer with provided ID could not be found.')) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND('Freelancer'),
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

  @PUT(FREELANCER_SKILLS_ADD_BY_ID, { schema: addFreelancerSkillsSchema })
  async addSkillsById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerSkillsBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> addSkillsById -> Adding skills for freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.addFreelancerSkills(
        request.params.freelancer_id,
        request.body.skills,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in addSkillsById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(FREELANCER_ORACLE_STATUS_BY_ID, { schema: oracleStatusSchema })
  async updateOracleStatusById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerOracleStatusBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateOracleStatusById -> Updating oracle status of freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.updateFreelancerOracleStatus(
        request.params.freelancer_id,
        request.body.oracleStatus,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateOracleStatusById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(FREELANCER_INTERVIEWS_ALIGNED_BY_ID, { schema: interviewsAlignedSchema })
  async interviewsAlignedById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerInterviewsAlignedBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> interviewsAlignedById -> Interviews aligned of freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.freelancerInterviewsAligned(
        request.params.freelancer_id,
        request.body.interviewsAligned,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in aligned interviews: ${error.message}`);
      if (error.ERROR_CODES === "FREELANCER_NOT_FOUND" || error.message.includes('Freelancer with provided ID could not be found.')) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND('Freelancer'),
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
