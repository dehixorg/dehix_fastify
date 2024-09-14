import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IAdmin extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  status: "Pending" | "Accept"| "Reject";
  type: "Admin" | "Super_Admin";
}

const AdminSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Accept", "Reject"],
      default: "Admin",
    },
    type: {
      type: String,
      enum: ["Admin", "Super_Admin"],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  AdminSchema,
);
