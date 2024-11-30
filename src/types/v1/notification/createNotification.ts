import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from "../../..//models/notification.entity";

export interface CreateNotificationBody {
  heading: string;
  description: string;
  type: NotificationTypeEnum;
  status: NotificationStatusEnum;
  background_img?: string;
  importantUrl?: {
    urlName: string;
    url: string;
  }[];
}
