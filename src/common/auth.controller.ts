/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hook, Inject } from 'fastify-decorators';
import { BaseController } from './base.controller';
import { BadTokenError } from './errors';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RolesService } from '../services';
import { RESPONSE_MESSAGE, STATUS_CODES } from '../common/constants';
import { firebaseClient } from '../common/services/firebase.service';

export abstract class AuthController extends BaseController {
  @Inject(RolesService)
  private roleService!: RolesService;

  @Hook('onRequest')
  async validateAuth(
    request: FastifyRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: FastifyReply,
  ): Promise<void> {
    const auth = request.headers?.authorization ?? request.headers?.Authorization;

    this.logger.info(`AuthController -> validateAuth: url: ${request.url} and headers authorization: ${auth}`);

    if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
      const token = auth.split(' ')[1];
      request.decodedToken = await firebaseClient.getDecodedFirebaseToken(token);

      this.logger.info('AuthController: validateAuth: Decoded Token: ', request.decodedToken);

      return this.roleService.validatePermission(request.decodedToken);
    }

    throw new BadTokenError(RESPONSE_MESSAGE.BAD_TOKEN, `${STATUS_CODES.UNAUTHORISED}`);
  }
}
