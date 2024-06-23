import {
  FastifyInstanceToken,
  FastifyReplyToken,
  FastifyRequestToken,
  Inject,
} from "fastify-decorators";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Logger } from "./services/logger.service";

export class BaseService {
  @Inject(FastifyInstanceToken)
  fastifyInstance!: FastifyInstance;

  @Inject(FastifyRequestToken)
  request!: FastifyRequest;

  @Inject(FastifyReplyToken)
  reply!: FastifyReply;

  @Inject(Logger)
  logger!: Logger;
}
