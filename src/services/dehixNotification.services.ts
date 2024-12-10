import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { DehixNotificationDAO } from "../dao/dehixNotification.dao";
import { firebaseClient } from "../common/services";

@Service()
export class DehixNotificationService extends BaseService {
  @Inject(DehixNotificationDAO)
  private DehixNotificationDAO!: DehixNotificationDAO;

  async sendNotification(notification) {
    const { message, entity, path } = notification;

    // Save the notification in the database
    await this.DehixNotificationDAO.createDehixNotification(notification);

    // Send notification via Firebase
    const payload = {
      notification: {
        title: `New Notification for ${entity}`,
        body: message,
        clickAction: path, // Path to redirect in the app
      },
    };

    try {
      // Replace with actual device tokens for the recipient
      const tokens = [notification.entity]; // Example: user tokens
      await firebaseClient.sendNotification(tokens, payload);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  async getNotificationsByEntity(entity) {
    return await this.DehixNotificationDAO.findAllByEntity(entity);
  }

  async deleteNotification(id) {
    return await this.DehixNotificationDAO.deleteById(id);
  }
}
