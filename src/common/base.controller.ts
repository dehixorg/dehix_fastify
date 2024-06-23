/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  BadTokenError,
  CreationError,
  NotFoundError,
  UnAuthorisedError,
  DataValidationError,
  BadRequestError,
  ConflictError,
  ServerError,
} from "./errors";
import {
  FastifyInstanceToken,
  Inject,
  ErrorHandler,
  Hook,
} from "fastify-decorators";
import { Logger } from "./services/logger.service";
import { ERROR_CODES } from "../common/constants";

/*
    Resposibilities
    1. All error handling
    2. CORS
*/
export abstract class BaseController {
  @Inject(FastifyInstanceToken) fastifyInstance!: FastifyInstance;

  @Inject(Logger) logger!: Logger;

  @Hook("onRequest")
  addRequestContext(request, reply, done) {
    done();
  }

  @Hook("onSend")
  // eslint-disable-next-line
  async onReplySend(request, reply, payload, done) {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Headers", "*");
    reply.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, PUT, PATCH, POST, DELETE",
    );
    reply.header("Cache-Control", "no-cache, no-store");
  }

  @Hook("onClose")
  async onRequestClose(request, reply, done) {
    done();
  }

  // Errors
  @ErrorHandler(BadTokenError)
  handleTokenNotFound(
    error: BadTokenError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply
      .status(403)
      .send({ message: "Not Authorized", code: error.statusCode });
  }

  // Errors
  @ErrorHandler(UnAuthorisedError)
  handleUnAuthorised(
    error: UnAuthorisedError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(401).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(BadRequestError)
  handleBadRequestError(
    error: UnAuthorisedError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(400).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(ConflictError)
  handleConflictError(
    error: UnAuthorisedError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(409).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(CreationError)
  handleCreationError(
    error: CreationError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(500).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(ServerError)
  handleServerError(
    error: ServerError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(500).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(NotFoundError)
  handleNotFoundError(
    error: NotFoundError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    reply.status(404).send({ message: error.message, code: error.statusCode });
  }

  @ErrorHandler(DataValidationError)
  handleDataValidationError(
    error: DataValidationError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    this.fastifyInstance.log.error(
      `DataValidationError: error ${error.message}`,
    );
    reply.status(400).send({
      message: error.message,
      code: error.statusCode,
      data: error?.data,
    });
  }

  @ErrorHandler(ERROR_CODES.FST_ERR_VALIDATION)
  handleSchemaValidationError(
    error: DataValidationError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    this.fastifyInstance.log.error(`schema: error ${error.message}`);
    reply.status(400).send({ message: error.message, code: error.statusCode });
  }

  // Unhandeled exception
  @ErrorHandler()
  generalErrorHandler(
    error: any,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    this.fastifyInstance.log.error(`General Error: error ${error.message}`);
    this.logger.error("General Error", error.stack);
    reply.status(500).send({ message: error.message, code: error });
  }
}
