import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define Enums in TypeScript
export enum AdminStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum AdminType {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

// Define IAdmin interface with enums
export interface IAdmin extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  status: AdminStatus; // Use TypeScript enum
  type: AdminType; // Use TypeScript enum
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
      enum: Object.values(AdminStatus), // Use enum values from AdminStatus
      default: AdminStatus.PENDING, // Default value from the enum
    },
    type: {
      type: String,
      enum: Object.values(AdminType), // Use enum values from AdminType
      default: AdminType.ADMIN, // Default value from the enum
    },
  },
  {
    timestamps: true,
  },
);

// Model for Admin
export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  AdminSchema,
);
