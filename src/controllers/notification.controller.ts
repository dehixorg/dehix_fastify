import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import {
  NOTIFICATION_ENDPOINT,
  NOTIFICATION_BY_ID_ENDPOINT,
} from "../constants/notification.constant";
import { NotificationService } from "../services";
import { createNotificationSchema } from "../schema/v1/notification/notification.create";
import { CreateNotificationBody } from "../types/v1/notification/createNotification";
import { getNotificationSchema } from "../schema/v1/notification/notification.get";
import { GetNotificationPathParams } from "../types/v1/notification/getNotification";
import { deleteNotificationSchema } from "../schema/v1/notification/notification.delete";
import { DeleteNotificationPathParams } from "../types/v1/notification/deleteNotification";
import { PutNotificationBody } from "../types/v1/notification/updateNotification";
import { updateNotificationSchema } from "../schema/v1/notification/notification.update";
import { getAllNotificationsSchema } from "../schema/v1/notification/notification.get";

@Controller({ route: NOTIFICATION_ENDPOINT })
export default class NotificationController extends AuthController {
  @Inject(NotificationService)
  notificationService!: NotificationService;

  @POST("", { schema: createNotificationSchema })
  async createNotification(
    request: FastifyRequest<{ Body: CreateNotificationBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> createNotification -> create Notification}`,
      );
      const data = await this.notificationService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateNotification: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @GET(NOTIFICATION_BY_ID_ENDPOINT, { schema: getNotificationSchema })
  async getNotificationById(
    request: FastifyRequest<{ Params: GetNotificationPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> getNotificationById -> get Notification}`,
      );

      const data = await this.notificationService.getNotificationById(
        request.params.notification_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getNotificationById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @DELETE(NOTIFICATION_BY_ID_ENDPOINT, {
    schema: deleteNotificationSchema,
  })
  async deleteNotificationById(
    request: FastifyRequest<{ Params: DeleteNotificationPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `NotificationController  -> deleteNotificationById -> delete Notification}`,
      );

      await this.notificationService.deleteNotificationById(
        request.params.notification_id,
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Notification deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteNotificationById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(NOTIFICATION_BY_ID_ENDPOINT, { schema: updateNotificationSchema })
  async updateNotificationById(
    request: FastifyRequest<{
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
        request.params.notification_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateNotificationById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Notification"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET("", { schema: getAllNotificationsSchema })
  async getAllNotification(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(
        `NotificationController  -> getAllNotification -> get all Notification}`,
      );

      const data = await this.notificationService.getAllNotification();
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllNotification: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
