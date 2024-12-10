import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import {
  DehixNotificationModel,
  IDehixNotification,
} from "../models/dehixNotification.entity";

@Service()
export class DehixNotificationDAO extends BaseDAO {
  model: Model<IDehixNotification>;

  constructor() {
    super();
    this.model = DehixNotificationModel;
  }

  async createDehixNotification(notification: any) {
    return await this.model.create(notification);
  }

  async findAllByEntity(entity) {
    return await this.model.find({ entity }).sort({ timeStamp: -1 });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
