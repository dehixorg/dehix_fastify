import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

// Enum for Notification Type and Status
export enum DehixNotificationTypeEnum {
  PROJECT_HIRING = "PROJECT_HIRING",
  SKILL_INTERVIEW = "SKILL_INTERVIEW",
  DOMAIN_INTERVIEW = "DOMAIN_INTERVIEW",
  TALENT_INTERVIEW = "TALENT_INTERVIEW",
}

export interface IDehixNotification extends Document {
  _id: string;
  message: string;
  type: DehixNotificationTypeEnum;
  entity: string;
  path: string;
}

const DehixNotificationSchema: Schema = new Schema(
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
      enum: Object.values(DehixNotificationTypeEnum),
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

export const DehixNotificationModel: Model<IDehixNotification> =
  mongoose.model<IDehixNotification>(
    "DehixNotification",
    DehixNotificationSchema,
  );
