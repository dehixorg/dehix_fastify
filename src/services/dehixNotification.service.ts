import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { DehixNotificationDAO } from "src/dao/dehixNotification.dao";
import { IDehixNotification } from "src/models/dehixNotification.entity";

// DehixNotificationService class to interact with the database
@Service()
export class DehixNotificationService extends BaseService {
  @Inject(DehixNotificationDAO)
  private DehixNotificationDAO!: DehixNotificationDAO;

  /**
   * Creates a new notification.
   * @param notificationData - The notification data to create.
   * @returns The ID of the created notification.
   */
  async createNotification(
    notificationData: IDehixNotification,
  ): Promise<string> {
    try {
      return await this.DehixNotificationDAO.addNotification(notificationData);
    } catch (error: any) {
      throw new Error(
        `NotificationService -> Failed to create notification: ${error.message}`,
      );
    }
  }
}
