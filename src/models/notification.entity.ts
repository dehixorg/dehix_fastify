import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

// Enum for Notification Type and Status
export enum NotificationTypeEnum {
  BUSINESS = "BUSINESS",
  FREELANCER = "FREELANCER",
  BOTH = "BOTH",
}
export enum NotificationStatusEnum {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export interface INotification extends Document {
  _id: string;
  heading: string;
  description: string;
  type: NotificationTypeEnum;
  status: NotificationStatusEnum;
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
      enum: Object.values(NotificationTypeEnum),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatusEnum),
      required: true,
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
