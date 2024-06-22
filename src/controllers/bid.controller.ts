/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, GET, Inject, POST } from 'fastify-decorators';
import { BidService } from '../services';
import { STATUS_CODES, ERROR_CODES, RESPONSE_MESSAGE } from '../common/constants';
import { GetBidPathParams } from '../types/v1';
import { BID_ENDPOINT } from '../constants/bid.constant';
import { UnAuthorisedError } from '../common/errors';
import { AuthController } from '../common/auth.controller';
import { bidApplySchema } from '../schema/v1/bid/apply';
import { BidApplyBody } from 'src/types/v1/bid/bidApplyBody';

@Controller({ route: BID_ENDPOINT })
export default class BidController extends AuthController {
  @Inject(BidService)
  bidService!: BidService;

  @POST(BID_ENDPOINT, { schema: bidApplySchema })
  async bidApply(request: FastifyRequest<{ Body: BidApplyBody}>, reply: FastifyReply) {
    this.logger.info(
      `BidController -> getById -> Applying for bid}`,
    );
    const data = await this.bidService.create(request.body);
    
    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }
}
