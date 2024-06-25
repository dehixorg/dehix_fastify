/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { SkillsService } from "../services/skills.service";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

import {
  SKILLS_ENDPOINT,
  SKILLS_ALL_ENDPOINT,
} from "../constants/skills.constant";
import { getSkillsSchema } from "../schema/v1/skills/getAll";
import { AuthController } from "../common/auth.controller";


@Controller({ route: SKILLS_ENDPOINT })
export default class SkillsController extends AuthController {
  @Inject(SkillsService)
  skillsService!: SkillsService;

  @GET( SKILLS_ALL_ENDPOINT, { schema: getSkillsSchema })
  async getSkills(
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `SkillsController -> getSkills -> Fetching skills`,
      );

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

}