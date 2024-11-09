import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { TicketModel, ITicket } from "../models/ticket.entity";

@Service()
export class TicketDAO extends BaseDAO {
  model: Model<ITicket>;

  constructor() {
    super();
    this.model = TicketModel;
  }

  async createTicket(data: any) {
    return this.model.create(data);
  }
  async getAllTicket() {
    return await this.model.find();
  }

  async getTicketByID(ticket_id: string) {
    const data = await this.model.findById(ticket_id);
    return data;
  }
  async deleteTicket(ticket_id: string) {
    return this.model.findByIdAndDelete(ticket_id);
  }

  async updateTicket(ticket_id: string, update: any) {
    return this.model.findByIdAndUpdate({ _id: ticket_id }, update, {
      new: true,
    });
  }

  async updateTicketStatus(ticket_id: string, status: string) {
    try {
      return await this.model.findByIdAndUpdate(
        ticket_id,
        { status, updatedAt: new Date() },
        { new: true },
      );
    } catch (error) {
      console.error("Error updating ticket status:", error);
      throw new Error("Failed to update ticket status");
    }
  }
  async getTicketByCustomerID(customerID: string) {
    return await this.model.findById(customerID);
  }
  async getTicketByStatus(status: string) {
    return await this.model.findById(status);
  }
  async getTicketBySubject(subject: string) {
    return await this.model.findById(subject);
  }
  async getTicketsByCustomerType(customerType: "business" | "freelancer") {
    try {
      const query = {
        ...(customerType && { customerType }),
      };
      const TicketData = await this.model.find(query);
      console.log("data>>>>>>>>>", TicketData);
      return TicketData;
    } catch (error: any) {
      throw new Error(`Failed to fetch ticket data: ${error.message}`);
    }
  }
  async getTicketsByStatus(status: "created" | "closed" | "active") {
    try {
      const query = {
        ...(status && { status }),
      };
      const TicketData = await this.model.find(query);
      return TicketData;
    } catch (error: any) {
      throw new Error(`Failed to fetch ticket data: ${error.message}`);
    }
  }
  async getTicketsBySubject(subject: string) {
    try {
      const query = {
        ...(subject && { subject }),
      };
      const TicketData = await this.model.find(query);
      return TicketData;
    } catch (error: any) {
      throw new Error(`Failed to fetch ticket data: ${error.message}`);
    }
  }
  async getTicketsByCustomerID(customerID: string) {
    try {
      const query = {
        ...(customerID && { customerID }),
      };
      const TicketData = await this.model.find(query);
      return TicketData;
    } catch (error: any) {
      throw new Error(`Failed to fetch ticket data: ${error.message}`);
    }
  }
}
