import { Hook } from "fastify-decorators";
import { BaseController } from "./base.controller";
import { BadTokenError } from "./errors";
import { FastifyReply, FastifyRequest } from "fastify";
import { RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";
import { firebaseClient } from "../common/services/firebase.service";

export abstract class AuthController extends BaseController {
  @Hook("onRequest")
  async validateAuth(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const auth =
      request.headers?.authorization ?? request.headers?.Authorization;

    this.logger.info(
      `AuthController -> validateAuth: url: ${request.url} and headers authorization: ${auth}`,
    );

    if (typeof auth === "string" && auth.startsWith("Bearer ")) {
      const token = auth.split(" ")[1];
      request.decodedToken =
        await firebaseClient.getDecodedFirebaseToken(token);

      this.logger.info(
        "AuthController: validateAuth: Decoded Token: ",
        request.decodedToken,
      );

      // Log the reply object for debugging, even if not directly used
      this.logger.info(`Reply object: ${JSON.stringify(reply)}`);

      return;
    }

    reply
      .code(STATUS_CODES.UNAUTHORISED)
      .send({ error: RESPONSE_MESSAGE.BAD_TOKEN });

    throw new BadTokenError(
      RESPONSE_MESSAGE.BAD_TOKEN,
      `${STATUS_CODES.UNAUTHORISED}`,
    );
  }
}
