import {
  notificationStatusEnum,
  notificationTypeEnum,
} from "../../..//models/notification.entity";

export interface CreateNotificationBody {
  heading: string;
  description: string;
  type: notificationTypeEnum;
  status: notificationStatusEnum;
  background_img?: string;
  importantUrl?: {
    urlName: string;
    url: string;
  }[];
}
