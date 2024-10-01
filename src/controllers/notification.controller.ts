import { FastifyRequest, FastifyReply } from "fastify"; // Importing Fastify request and reply interfaces
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators"; // Importing decorators for defining routes and dependency injection
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants"; // Importing constants for response messages and status codes
import { AuthController } from "../common/auth.controller"; // Importing base controller for authentication-related functionality
import {
  NOTIFICATION_ENDPOINT,
  NOTIFICATION_BY_ID_ENDPOINT,
  NOTIFICATION_CREATE_ENDPOINT,
  NOTIFICATION_DELETE_BY_ID_ENDPOINT,
  NOTIFICATION_GET_ALL_ENDPOINT,
} from "../constants/notification.constant"; // Importing constant endpoints for notification-related operations
import { NotificationService } from "../services"; // Importing notification service for handling business logic
import { createNotificationSchema } from "../schema/v1/notification/notification.create"; // Importing schema for creating notifications
import { createNotificationBody } from "../types/v1/notification/createNotification"; // Importing types for notification creation body
import { getNotificationSchema } from "../schema/v1/notification/notification.get"; // Importing schema for retrieving notifications
import { GetNotificationPathParams } from "../types/v1/notification/getNotification"; // Importing types for notification path parameters
import { deleteNotificationSchema } from "../schema/v1/notification/notification.delete"; // Importing schema for deleting notifications
import { DeleteNotificationPathParams } from "../types/v1/notification/deleteNotification"; // Importing types for deleting notifications
import { PutNotificationBody } from "../types/v1/notification/updateNotification"; // Importing types for updating notifications
import { updateNotificationSchema } from "../schema/v1/notification/notification.update"; // Importing schema for updating notifications

@Controller({ route: NOTIFICATION_ENDPOINT }) // Defining controller with the notification route
export default class NotificationController extends AuthController {
  @Inject(NotificationService)
  notificationService!: NotificationService; // Injecting notification service for handling business logic

  @POST(NOTIFICATION_CREATE_ENDPOINT, { schema: createNotificationSchema }) // Route to create a new notification
  async createNotification(
    request: FastifyRequest<{ Body: createNotificationBody }>, // Expecting notification data in the request body
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> createNotification -> create Notification}`,
      );
      const data = await this.notificationService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the created notification data as response
    } catch (error: any) {
      this.logger.error(`Error in CreateNotification: ${error.message}`); // Logging any errors that occur
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        // Handling server errors
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @GET(NOTIFICATION_BY_ID_ENDPOINT, { schema: getNotificationSchema }) // Route to get a notification by its ID
  async getNotificationById(
    request: FastifyRequest<{ Params: GetNotificationPathParams }>, // Expecting notification ID in path parameters
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> getNotificationById -> get Notification}`,
      );

      const data = await this.notificationService.getNotificationById(
        // Calling the service to fetch the notification by ID
        request.params.notification_id,
      );

      if (!data) {
        // Checking if the notification was found
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"), // Sending not found message for notification
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved notification data as response
    } catch (error: any) {
      this.logger.error(`Error in getNotificationById: ${error.message}`); // Logging any errors that occur
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found") // Handling specific error cases for not found
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND, // Sending not found message for data
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @DELETE(NOTIFICATION_DELETE_BY_ID_ENDPOINT, {
    // Route to delete a notification by its ID
    schema: deleteNotificationSchema,
  })
  async deleteNotificationById(
    request: FastifyRequest<{ Params: DeleteNotificationPathParams }>, // Expecting notification ID in path parameters
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> deleteNotificationById -> delete Notification}`,
      );

      await this.notificationService.deleteNotificationById(
        // Calling the service to delete the notification by ID
        request.params.notification_id,
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Notification deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteNotificationById: ${error.message}`); // Logging any errors that occur
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found") // Handling specific error cases for not found
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"), // Sending not found message for notification
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(NOTIFICATION_BY_ID_ENDPOINT, { schema: updateNotificationSchema }) // Route to update a notification by its ID
  async updateNotificationById(
    request: FastifyRequest<{
      // Expecting notification ID in path and updated data in body
      Params: GetNotificationPathParams;
      Body: PutNotificationBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> updateNotificationById -> update Notification}`,
      );

      const data = await this.notificationService.updateNotification(
        // Calling the service to update the notification
        request.params.notification_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the updated notification data as response
    } catch (error: any) {
      this.logger.error(`Error in updateNotificationById: ${error.message}`); // Logging any errors that occur
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found") // Handling specific error cases for not found
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"), // Sending not found message for notification
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          // Handling server errors
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(NOTIFICATION_GET_ALL_ENDPOINT, { schema: getNotificationSchema }) // Route to get all notifications
  async getAllNotification(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(
        `NotificationController  -> getAllNotification -> get all Notification}`,
      );

      const data = await this.notificationService.getAllNotification(); // Calling the service to fetch all notifications
      reply.status(STATUS_CODES.SUCCESS).send({ data }); // Sending the retrieved notification data as response
    } catch (error: any) {
      this.logger.error(`Error in getAllNotification: ${error.message}`); // Logging any errors that occur
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        // Handling server errors
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
