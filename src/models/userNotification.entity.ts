import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

// Enum for Notification Type and Status
export enum UserNotificationTypeEnum {
  PROJECT_HIRING = "PROJECT_HIRING",
  SKILL_INTERVIEW = "SKILL_INTERVIEW",
  DOMAIN_INTERVIEW = "DOMAIN_INTERVIEW",
  TALENT_INTERVIEW = "TALENT_INTERVIEW",
}

export interface IUserNotification extends Document {
  _id: string;
  message: string;
  type: UserNotificationTypeEnum;
  entity: string;
  path: string;
}

const UserNotificationSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(UserNotificationTypeEnum),
      required: true,
    },
    entity: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserNotificationModel: Model<IUserNotification> =
  mongoose.model<IUserNotification>("UserNotification", UserNotificationSchema);
