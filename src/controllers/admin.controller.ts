/* eslint-disable @typescript-eslint/no-unused-vars */
// Import necessary modules and constants
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST, DELETE } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";

// Importing authentication controller and services
import { AuthController } from "../common/auth.controller";

// Importing relevant constants for admin-related endpoints
import {
  ADMIN_ALL_ENDPOINT,
  ADMIN_BY_ID_ENDPOINT,
  ADMIN_ENDPOINT,
  ADMIN_ID_ENDPOINT,
} from "../constants/admin.constant";

// Importing necessary services for admin and verification handling
import { AdminsService, VerificationService } from "../services";

// Importing schemas for validation of admin-related API requests
import { createAdminSchema } from "../schema/v1/admin/admin.create";
import { createAdminBody } from "../types/v1/admin/createAdminBody";
import { adminPathParams } from "../types/v1/admin/deleteAdmin";
import { deleteAdminSchema } from "../schema/v1/admin/admin.delete";
import {
  getAdminByIdSchema,
  getAllAdminSchema,
} from "../schema/v1/admin/admin.get";

// Controller for handling admin-related API endpoints
@Controller({ route: ADMIN_ENDPOINT })
export default class AdminsController extends AuthController {
  @Inject(AdminsService)
  adminsService!: AdminsService;
  @Inject(VerificationService)
  verificationService!: VerificationService;

  // POST request to create a new admin
  @POST(ADMIN_ID_ENDPOINT, { schema: createAdminSchema })
  async createAdmin(
    request: FastifyRequest<{ Body: createAdminBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`AdminsController -> createAdmin -> Creating admin`);

      const adminExists = await this.adminsService.getAdminByEmail(
        request.body.email,
      );
      if (adminExists) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.USER_EXISTS,
          code: ERROR_CODES.USER_ALREADY_EXIST,
        });
      }

      const data = await this.adminsService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in createAdmin: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // DELETE request to remove an admin by ID
  @DELETE(ADMIN_BY_ID_ENDPOINT, { schema: deleteAdminSchema })
  async deleteAdminById(
    request: FastifyRequest<{ Params: adminPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `AdminsController -> deleteAdminById -> Deleting Admin using: ${request.params.admin_id}`,
      );
      await this.adminsService.deleteAdminById(request.params.admin_id);

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Admin deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteAdminById: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Admin")
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

  // GET request to retrieve all admins
  @GET(ADMIN_ALL_ENDPOINT, { schema: getAllAdminSchema })
  async getAllAdmin(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`AdminsController -> getAllAdmin -> Fetching admins`);

      const data = await this.adminsService.getAllAdmins();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Admin"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllAdmin: ${error.message}`);
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

  // GET request to retrieve a specific admin by ID
  @GET(ADMIN_BY_ID_ENDPOINT, { schema: getAdminByIdSchema })
  async getAdminById(
    request: FastifyRequest<{ Params: adminPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `AdminsController -> getAdminById -> Fetching admin using: ${request.params.admin_id}`,
      );

      const data = await this.adminsService.getAdminById(
        request.params.admin_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Admin"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAdminById: ${error.message}`);
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
}
