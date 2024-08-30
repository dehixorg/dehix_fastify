import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { NotificationDAO } from "../dao";

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
}
