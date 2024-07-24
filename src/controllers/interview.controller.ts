import { Controller, GET, Inject, POST, PUT } from "fastify-decorators";
import { AuthController } from "../common/auth.controller";
import {
  CREATE_INTERVIEW_END_POINT,
  GET_ALL_INTERVIEW,
  INTERVIEW,
  UPDATE_INTERVIEW_END_POINT,
} from "../constants/interview.constant";
import { createInterviewSchema } from "../schema/v1/interview/create";
import { InterviewService } from "../services/interview.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetInterviewPathParams } from "../types/v1/interview/get";
import { InterviewBody } from "../types/v1/interview/create";
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants";
import { updateInterviewSchema } from "../schema/v1/interview/update";
import { updateInterviewBody } from "../types/v1/interview/update";
import { getInterviewSchema } from "../schema/v1/interview/get";

@Controller({ route: INTERVIEW })
export default class InterviewController extends AuthController {
  @Inject(InterviewService)
  private InterviewService!: InterviewService;

  @POST(CREATE_INTERVIEW_END_POINT, { schema: createInterviewSchema })
  async createInterview(
    request: FastifyRequest<{
      Params: GetInterviewPathParams;
      Body: InterviewBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("controllers->interview.controller->createInterview");
      const data = await this.InterviewService.createInterview(
        request.params.interviewee,
        request.body,
      );
      reply.status(STATUS_CODES.CREATED).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in create interview: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Data"),
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

  @PUT(UPDATE_INTERVIEW_END_POINT, { schema: updateInterviewSchema })
  async updateInterviewById(
    request: FastifyRequest<{
      Params: GetInterviewPathParams;
      Body: updateInterviewBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("controllers->interview.controller->updateInterview");
      const data = await this.InterviewService.updateInterview(
        request.params.interview_id,
        request.body,
      );
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`error in interview  update: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Interview not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND(" Interview"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Data"),
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
  @GET(GET_ALL_INTERVIEW, { schema: getInterviewSchema })
  async getAllInterview(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info("controllers->interview.controller->getAllInterview");
      const data = await this.InterviewService.getAllInterview();
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      reply
        .status(STATUS_CODES.SERVER_ERROR)
        .send({ message: "Internal server error" });
    }
  }
}
