import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import {
  NotificationModel,
  INotification,
} from "../models/notification.entity";

@Service()
export class NotificationDAO extends BaseDAO {
  model: Model<INotification>;

  constructor() {
    super();
    this.model = NotificationModel;
  }

  async createNotification(data: any) {
    return this.model.create(data);
  }

  async findNotification(notification_id: string) {
    return this.model.findById(notification_id);
  }

  async findNotificationById(id: string) {
    return this.model.findById(id);
  }

  async deleteNotification(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
