import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IAdmin extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  dob?: Date;
  githubLink?: string;
  linkedin?: string;
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
    dob: {
      type: Date,
      required: false,
    },
    githubLink: { type: String, required: false },
    linkedin: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  AdminSchema,
);
