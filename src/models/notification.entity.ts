import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

export interface INotification extends Document {
  _id: string;
  heading?: string;
  description?: string;
  type?: "business" | "freelancer" | "both";
  status?: "active" | "inactive";
  background_img?: string;
  importantUrl?: {
    urlName?: string;
    url?: string;
  }[];
}

const NotificationSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["business", "freelancer", "both"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: false,
    },
    background_img: {
      type: String,
      required: false,
    },
    importantUrl: [
      {
        urlName: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const NotificationModel: Model<INotification> =
  mongoose.model<INotification>("Notification", NotificationSchema);
