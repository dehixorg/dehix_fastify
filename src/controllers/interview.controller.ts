import { Controller, GET, Inject, POST, PUT } from "fastify-decorators"; // Importing decorators for defining routes and dependency injection
import { AuthController } from "../common/auth.controller"; // Importing base controller for authentication-related functionality
import {
  CREATE_INTERVIEW_END_POINT,
  GET_ALL_INTERVIEW,
  INTERVIEW,
  UPDATE_INTERVIEW_END_POINT,
  CompletedInterviewForInterviewee,
  CurrentInterviewForInterviewee,
} from "../constants/interview.constant"; // Importing constant endpoints for interview-related operations
import { createInterviewSchema } from "../schema/v1/interview/interview.create"; // Importing schema for creating interviews
import { InterviewService } from "../services/interview.service"; // Importing service for interview-related logic
import { FastifyReply, FastifyRequest } from "fastify"; // Importing Fastify request and reply interfaces
import { GetInterviewPathParams } from "../types/v1/interview/getInterview"; // Importing types for interview path parameters
import { InterviewBody } from "../types/v1/interview/createInterview"; // Importing types for interview creation body
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants"; // Importing constants for response messages and status codes
import { updateInterviewSchema } from "../schema/v1/interview/interview.update"; // Importing schema for updating interviews
import { updateInterviewBody } from "../types/v1/interview/updateInterview"; // Importing types for updating interviews
import {
  getAllInterviewSchema,
  getInterviewSchema,
} from "../schema/v1/interview/interview.get"; // Importing schema for retrieving interviews

@Controller({ route: INTERVIEW }) // Defining controller with the interview route
export default class InterviewController extends AuthController {
  @Inject(InterviewService)
  private InterviewService!: InterviewService; // Injecting interview service for handling business logic

  @POST(CREATE_INTERVIEW_END_POINT, { schema: createInterviewSchema }) // Route to create a new interview
  async createInterview(
    request: FastifyRequest<{
      Params: GetInterviewPathParams; // Expecting interviewee ID in path parameters
      Body: InterviewBody; // Expecting interview data in the request body
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("controllers->interview.controller->createInterview"); // Logging the creation attempt
      const data = await this.InterviewService.createInterview(
        request.params.interviewee_id, // Fetching interviewee ID from parameters
        request.body, // Getting interview data from request body
      );
      reply.status(STATUS_CODES.CREATED).send({ data }); // Sending the created interview data as response
    } catch (error: any) {
      this.logger.error(`Error in create interview: ${error.message}`); // Logging any errors that occur
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"), // Sending not found message for freelancer
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Data"), // Sending not found message for data
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

  @PUT(UPDATE_INTERVIEW_END_POINT, { schema: updateInterviewSchema }) // Route to update an existing interview
  async updateInterviewById(
    request: FastifyRequest<{
      Params: GetInterviewPathParams; // Expecting interviewee ID in path parameters
      Body: updateInterviewBody; // Expecting updated interview data in the request body
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("controllers->interview.controller->updateInterview"); // Logging the update attempt
      const data = await this.InterviewService.updateInterview(
        request.params.interviewee_id, // Fetching interviewee ID from parameters
        request.body, // Getting updated interview data from request body
      );
      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the updated interview data as response
    } catch (error: any) {
      this.logger.error(`error in interview  update: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Interview not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND(" Interview"), // Sending not found message for interview
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Data"), // Sending not found message for data
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

  @GET(GET_ALL_INTERVIEW, { schema: getAllInterviewSchema }) // Route to get all interviews
  async getAllInterview(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info("controllers->interview.controller->getAllInterview");
      const { limit, page } = request.query as {
        limit: string;
        page: string;
      };
      const data = await this.InterviewService.getAllInterview(limit, page); // Fetching all interviews
      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved interview data as response
    } catch (error) {
      reply // Handling server errors
        .status(STATUS_CODES.SERVER_ERROR)
        .send({ message: "Internal server error" });
    }
  }

  @GET(CompletedInterviewForInterviewee, { schema: getInterviewSchema }) // Route to get completed interviews for an interviewee
  async getCompletedInterviews(
    request: FastifyRequest<{
      Params: GetInterviewPathParams; // Expecting interviewee ID in path parameters
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancersController -> getCompletedinterview -> Fetching completed interview`, // Logging the retrieval attempt
      );

      const data = await this.InterviewService.completedinterview(
        request.params.interviewee_id, // Fetching completed interviews using interviewee ID
      );

      if (!data || data.length === 0) { // Checking if any completed interviews were found
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Completed Project"), // Sending not found message for completed projects
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved completed interview data as response
    } catch (error: any) {
      this.logger.error(`Error in get completed interviews: ${error.message}`); // Logging any errors that occur
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND, // Sending not found message for data
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(CurrentInterviewForInterviewee, { schema: getInterviewSchema }) // Route to get current interviews for an interviewee
  async getCurrentInterviews(
    request: FastifyRequest<{
      Params: GetInterviewPathParams; // Expecting interviewee ID in path parameters
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancersController -> getCurrentInterviews -> Fetching current interviews`, // Logging the retrieval attempt
      );

      const data = await this.InterviewService.currentinterview(
        request.params.interviewee_id, // Fetching current interviews using interviewee ID
      );

      if (!data || data.length === 0) { // Checking if any current interviews were found
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Current Interview"), // Sending not found message for current interview
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved current interview data as response
    } catch (error: any) {
      this.logger.error(`Error in get current interviews: ${error.message}`); // Logging any errors that occur
      // Handling specific error cases for better response
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND, // Sending not found message for data
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({ // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
