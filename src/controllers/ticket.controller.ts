import { FastifyRequest, FastifyReply } from "fastify";
import {
  Controller,
  DELETE,
  GET,
  Inject,
  PATCH,
  POST,
  PUT,
} from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";

import {
  TICKET_ENDPOINT,
  GET_ALL_TICKET,
  CREATE_TICKET,
  UPDATE_STATUS_BY_TICKET_ID,
  UPDATE_TICKET_BY_ID_ENDPOINT,
  GET_TICKET_BY_ID,
  GET_TICKET_BY_CUSTOMER_TYPE,
  GET_TICKET_BY_STATUS,
  DELETE_TICKET_BY_ID,
  GET_TICKET_BY_SUBJECT,
  GET_TICKET_BY_CUSTOMER_ID,
} from "../constants/ticket.constant";
import { TicketService } from "../services/ticket.service";

import { createTicketSchema } from "../schema/v1/ticket/ticket.create";
import {
  getAllTicketSchema,
  getTicketSchema,
  getTicketsByCustomerTypeSchema,
  getTicketsByStatusSchema,
  getTicketsBySubjectSchema,
  getTicketsByCustomerIDSchema,
} from "../schema/v1/ticket/ticket.get";
import {
  updateTicketSchema,
  updateTicketStatusSchema,
} from "../schema/v1/ticket/ticket.update";
import { createTicketBody } from "../types/v1/ticket/createTicket";
import {
  GetTicketPathParams,
  GetTicketByCustomerTypeQueryParams,
  GetTicketByStatusQueryParams,
  GetTicketBySubjectQueryParams,
  GetTicketByCustomerIDQueryParams,
} from "../types/v1/ticket/getTicket";
import {
  PutTicketBody,
  PutTicketStatusBody,
} from "../types/v1/ticket/updateTicket";
import { deleteTicketSchema } from "../schema/v1/ticket/ticket.delete";
import { DeleteTicketPathParams } from "../types/v1/ticket/deleteTicket";

@Controller({ route: TICKET_ENDPOINT })
export default class TicketController extends AuthController {
  @Inject(TicketService)
  ticketService!: TicketService;

  @POST(CREATE_TICKET, { schema: createTicketSchema })
  async createTicket(
    request: FastifyRequest<{ Body: createTicketBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`TicketController  -> createTicket -> create Ticket}`);
      const data = await this.ticketService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateTicket: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(GET_ALL_TICKET, { schema: getAllTicketSchema })
  async getAllTicket(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`TicketController -> getAllTicket -> Fetching Ticket`);

      const data = await this.ticketService.getAllTickets();

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllTicket: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Ticket not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @PUT(UPDATE_TICKET_BY_ID_ENDPOINT, { schema: updateTicketSchema })
  async updateTicketById(
    request: FastifyRequest<{
      Params: GetTicketPathParams;
      Body: PutTicketBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> updateTicketById -> Updating Ticket using: ${request.params.ticket_id}`,
      );

      const data = await this.ticketService.updateTicketById(
        request.params.ticket_id,
        request.body,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateTicketById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
  @PATCH(UPDATE_STATUS_BY_TICKET_ID, {
    schema: updateTicketStatusSchema,
  })
  async updateFaqStatusById(
    request: FastifyRequest<{
      Params: GetTicketPathParams;
      Body: PutTicketStatusBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> updateTicketStatusById -> Updating Ticket with ID: ${request.params.ticket_id}`,
      );

      const data = await this.ticketService.updateTicketStatus(
        request.params.ticket_id,
        request.body.status,
      );

      reply.status(STATUS_CODES.SUCCESS).send({
        message: "Ticket Status updated",
        data,
      });
    } catch (error: any) {
      this.logger.error(`Error in updateTicketStatusById: ${error.message}`);

      if (
        error.ERROR_CODES === "Ticket_NOT_FOUND" ||
        error.message.includes("Ticket with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "Ticket_NOT_FOUND" ||
        error.message.includes("Ticket not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @GET(GET_TICKET_BY_ID, { schema: getTicketSchema })
  async getTicketById(
    request: FastifyRequest<{ Params: GetTicketPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> getTIcketById -> Fetching Ticket using: ${request.params.ticket_id}`,
      );

      const data = await this.ticketService.getTicketById(
        request.params.ticket_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getTicketById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
  @GET(GET_TICKET_BY_CUSTOMER_TYPE, { schema: getTicketsByCustomerTypeSchema })
  async getTicketByCustomerType(
    request: FastifyRequest<{
      Querystring: GetTicketByCustomerTypeQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> getTicketByCustomerType -> Fetching Ticket`,
      );
      const { customerType } = request.query;

      const data =
        await this.ticketService.getTicketsByCustomerType(customerType);
      if (data.length === 0) {
        return reply
          .code(404)
          .send({ message: "No tickets found for this customer type" });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllTicket: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Ticket not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @GET(GET_TICKET_BY_STATUS, { schema: getTicketsByStatusSchema })
  async getTicketByStatus(
    request: FastifyRequest<{ Querystring: GetTicketByStatusQueryParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> getTicketByCustomerType -> Fetching Ticket`,
      );
      const { status } = request.query;

      const data = await this.ticketService.getTicketsByStatus(status);
      if (data.length === 0) {
        return reply
          .code(404)
          .send({ message: "No tickets found for this Status" });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllTicket: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Ticket not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @DELETE(DELETE_TICKET_BY_ID, { schema: deleteTicketSchema })
  async deleteTicketById(
    request: FastifyRequest<{ Params: DeleteTicketPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> deleteTicketById -> Deleting ticket using: ${request.params.ticket_id}`,
      );
      await this.ticketService.deleteTicketById(request.params.ticket_id);

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Ticket deleted" });
    } catch (error: any) {
      this.logger.error(`Error in delete ticket: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @GET(GET_TICKET_BY_SUBJECT, { schema: getTicketsBySubjectSchema })
  async getTicketBySubject(
    request: FastifyRequest<{ Querystring: GetTicketBySubjectQueryParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> getTicketByCustomerType -> Fetching Ticket`,
      );
      const { subject } = request.query;

      const data = await this.ticketService.getTicketsBySubject(subject);
      if (data.length === 0) {
        return reply
          .code(404)
          .send({ message: "No tickets found for this Subject" });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in get ticket by subject: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Ticket not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
  @GET(GET_TICKET_BY_CUSTOMER_ID, { schema: getTicketsByCustomerIDSchema })
  async getTicketByCustomerID(
    request: FastifyRequest<{ Querystring: GetTicketByCustomerIDQueryParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `TicketController -> getTicketByCustomerType -> Fetching Ticket`,
      );
      const { customerID } = request.query;

      const data = await this.ticketService.getTicketsByCustomerID(customerID);
      if (data.length === 0) {
        return reply
          .code(404)
          .send({ message: "No tickets found for this CustomerID" });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in get ticket by CustomerID: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Ticket not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
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
