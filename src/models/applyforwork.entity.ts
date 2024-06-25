import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the ApplicationForWork document
export interface IApplicationForWork extends Document {
  uuid: string;
  desiredSalary: string;
  role: string;
  status: string;
  projectId: Schema.Types.ObjectId;
}

// Define the ApplicationForWork schema
const applyForPositionSchema: Schema<IApplicationForWork> = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      required: true,
    },
    desiredSalary: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectListByCompany",
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  },
);


export const ApplicationForWorkModel: Model<IApplicationForWork> = mongoose.model<IApplicationForWork>(
  "Applicationforwork",
  applyForPositionSchema,
);

export default ApplicationForWorkModel;
