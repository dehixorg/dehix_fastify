/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../common/base.controller';
import { UnAuthorisedError } from '../common/errors';
import { ERROR_CODES, RESPONSE_MESSAGE } from '../common/constants';

export class PlanMiddleware extends BaseController {
  /**
   * Pre-handler to verify x-api-key.
   * @param {FastifyRequest} request The request object.
   * @param {FastifyReply} reply The reply object.
   * @returns {Promise<void>}
   */
  async verifyApiKey(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    this.logger.info('Error from verify');
    const apiKey = request.headers['x-api-key'];
    this.logger.info('key :: ' + apiKey);
    if (!apiKey || apiKey !== process.env.SERVER_FMV_PUBLIC_API_KEY) {
      throw new UnAuthorisedError(RESPONSE_MESSAGE.UNAUTHORISED, ERROR_CODES.UNAUTHORIZED);
    }
  }
}
