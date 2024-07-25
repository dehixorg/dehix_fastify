/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, POST, Inject } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import { HIRE_CREATE_ENDPOINT, HIRE_ENDPOINT } from "../constants/hireDehixTalent.constant";
import { HireService } from "../services/hireDehixTalent.service";
import { createhireDehixTalentSchema } from "../schema/v1/hireDehixTalent/create";
import { IHire } from "../models/hireDehixTalent.entity";

@Controller({ route: HIRE_ENDPOINT })
export default class HireController extends AuthController {
  @Inject(HireService)
  hireService!: HireService;

  @POST(HIRE_CREATE_ENDPOINT, { schema: createhireDehixTalentSchema })
  async create(
    request: FastifyRequest<{ Body: IHire; }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `HireController -> create -> Create a new hireDehixTalent`,
      );

      const data = await this.hireService.createhireDehixTalent(
        request.body,
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
}
