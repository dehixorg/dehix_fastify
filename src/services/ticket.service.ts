import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { TicketDAO } from "../dao/ticket.dao";
import { stat } from "fs";

@Service()
export class TicketService extends BaseService {
  @Inject(TicketDAO)
  private TicketDAO!: TicketDAO;

  async create(body: any) {
    const ticket: any = await this.TicketDAO.createTicket(body);
    return ticket;
  }

  async getAllTickets() {
    this.logger.info("TicketService: getAllTickets: Fetching All ticket ");

    const ticket: any = await this.TicketDAO.getAllTicket();

    if (ticket.length == 0) {
      this.logger.error("TicketService: getAllTicket: Ticket not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Ticket"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    return ticket;
  }

  async deleteTicketById(ticket_id: string) {
    this.logger.info(
      `TicketService: deleteTicketById: Deleting Ticket for ID:${ticket_id}`,
    );

    const checkTicket = await this.TicketDAO.getTicketByID(ticket_id);
    if (!checkTicket) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const deleteTicket = await this.TicketDAO.deleteTicket(ticket_id);

    return deleteTicket;
  }

  async updateTicketById(ticket_id: string, body: any) {
    this.logger.info(
      `TicketService: updateTicketById: Updating Ticket for ID:${ticket_id}`,
    );

    const checkTicket = await this.TicketDAO.getTicketByID(ticket_id);
    if (!checkTicket) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data = await this.TicketDAO.updateTicket(ticket_id, body);

    return data;
  }
  async updateTicketStatus(ticket_id, status) {
    try {
      const result = await this.TicketDAO.updateTicketStatus(ticket_id, status);

      if (!result) {
        throw new Error("Failed to update the ticket status. No ticket found.");
      }

      return { message: `Ticket status updated to ${status}` };
    } catch (error) {
      console.log(error);
    }
  }
  async getTicketById(ticket_id: string) {
    this.logger.info(
      `TicketService: getTicketById: Fetching Ticket for ID:${ticket_id}`,
    );

    const checkTicket: any = await this.TicketDAO.getTicketByID(ticket_id);
    if (!checkTicket) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const getTicket: any = await this.TicketDAO.getTicketByID(ticket_id);

    return getTicket;
  }
    async getTicketsByCustomerType(
        customerType: "business" | "freelancer") {
    
    return await this.TicketDAO.getTicketsByCustomerType(customerType);
  }
  async getTicketsByStatus(
    status: "created" | "closed" | "active") {

    return await this.TicketDAO.getTicketsByStatus(status);
  }
  async getTicketsBySubject(
    subject: string) {

    return await this.TicketDAO.getTicketsBySubject(subject);
  }
  async getTicketsByCustomerID(
    customerID: string) {

    return await this.TicketDAO.getTicketsByCustomerID(customerID);
  }
}