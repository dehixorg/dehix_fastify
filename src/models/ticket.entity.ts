import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITicket extends Document {
  _id?: string;
  customerID?: string;
  customerType: string;
  description?: string;
  filesAttached?: string;
  status: string;
  subject?: string;
}

const TicketSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      enum: ["business", "freelancer"],
      required: true,
    },
    description: {
      type: String,
    },
    filesAttached: {
      type: String,
      default: [],
    },
    status: {
      type: String,
      enum: ["created", "closed", "active"],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TicketModel: Model<ITicket> = mongoose.model<ITicket>(
  "Ticket",
  TicketSchema,
);
