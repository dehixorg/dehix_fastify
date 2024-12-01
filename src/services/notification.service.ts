import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { NotificationDAO } from "../dao";
import { PutNotificationBody } from "../types/v1/notification/updateNotification";

@Service()
export class NotificationService extends BaseService {
  @Inject(NotificationDAO)
  private NotificationDAO!: NotificationDAO;

  async create(body: any) {
    const notification: any =
      await this.NotificationDAO.createNotification(body);
    return notification;
  }

  async getNotificationById(notification_id: string) {
    this.logger.info(
      `NotificationService: getNotificationById: Fetching Notification for Notification ID:${notification_id}`,
    );

    const checkNotification: any =
      await this.NotificationDAO.findNotification(notification_id);
    if (!checkNotification) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const getNotification: any =
      await this.NotificationDAO.findNotificationById(notification_id);

    return getNotification;
  }

  async deleteNotificationById(notification_id: string) {
    this.logger.info(
      `NotificationService: deleteNotificationById: Deleting Notification for Notification ID:${notification_id}`,
    );

    const checkNotification: any =
      await this.NotificationDAO.findNotification(notification_id);

    if (!checkNotification) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const deleteNotification: any =
      await this.NotificationDAO.deleteNotification(notification_id);

    return deleteNotification;
  }

  async updateNotification(
    notification_id: string,
    update: PutNotificationBody,
  ) {
    this.logger.info(
      `NotificationService: updateNotification: Updating Notification for Notification ID:${notification_id}`,
    );

    const checkNotification: any =
      await this.NotificationDAO.findNotificationById(notification_id);

    if (!checkNotification) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data = await this.NotificationDAO.updateNotificationById(
      notification_id,
      update,
    );

    return data;
  }

  async getAllNotification() {
    this.logger.info(
      `NotificationService: getAllNotification: Fetching all Notifications`,
    );

    const data = await this.NotificationDAO.getAllNotifications();
    return data;
  }
}
