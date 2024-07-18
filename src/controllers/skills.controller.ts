/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, PATCH, POST, DELETE, Inject } from "fastify-decorators";
import { SkillsService } from "../services/skills.service";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

import {
  SKILLS_ENDPOINT,
  SKILLS_ALL_ENDPOINT,
  CREATE_SKILL,
  DELETE_SKILL,
} from "../constants/skills.constant";
import { getSkillsSchema } from "../schema/v1/skills/getAll";
import { AuthController } from "../common/auth.controller";
import { createSkillSchema } from "../schema/v1/skills/create";
import { deleteSkillSchema } from "../schema/v1/skills/delete";
import { DeleteSkillPathParams } from "../types/v1/skill/delete";

@Controller({ route: SKILLS_ENDPOINT })
export default class SkillsController extends AuthController {
  @Inject(SkillsService)
  skillsService!: SkillsService;

  @GET(SKILLS_ALL_ENDPOINT, { schema: getSkillsSchema })
  async getSkills(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`SkillsController -> getSkills -> Fetching skills`);

      const data = await this.skillsService.getAllSkills();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Skills"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getSkills: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @POST(CREATE_SKILL,{schema:createSkillSchema})
  async createSkill(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`SkillsController -> createSkill -> Creating skill`);

      const data = await this.skillsService.createSkill(request.body);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in createSkill: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(DELETE_SKILL,{schema:deleteSkillSchema})
  async deleteSkill(
    request: FastifyRequest<{Params:DeleteSkillPathParams}>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(`SkillsController -> deleteSkill -> Deleting skill`);

      const data = await this.skillsService.deleteSkill(request.params.skill_id);
      reply.status(STATUS_CODES.SUCCESS).send({ message:"skill deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteSkill: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Skills not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Skills"),
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
