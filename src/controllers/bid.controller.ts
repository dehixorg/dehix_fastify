/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject, POST, PUT } from "fastify-decorators";
import { BidService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
// import { GetBidPathParams } from "../types/v1";
import {
  BID_ENDPOINT,
  UPDATE_BID_BY_ID_ENDPOINT,
} from "../constants/bid.constant";
import { UnAuthorisedError } from "../common/errors";
import { AuthController } from "../common/auth.controller";
import { bidApplySchema } from "../schema/v1/bid/apply";
import { BidApplyBody } from "../types/v1/bid/bidApplyBody";
import { PutBidBody, PutBidPathParams } from "../types/v1/bid/updateBid";
import { updateBidSchema } from "../schema/v1/bid/update";

@Controller({ route: BID_ENDPOINT })
export default class BidController extends AuthController {
  @Inject(BidService)
  bidService!: BidService;

  @POST(BID_ENDPOINT, { schema: bidApplySchema })
  async bidApply(
    request: FastifyRequest<{ Body: BidApplyBody }>,
    reply: FastifyReply,
  ) {
    this.logger.info(`BidController -> getById -> Applying for bid}`);
    const data = await this.bidService.create(request.body);

    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }

  @PUT(UPDATE_BID_BY_ID_ENDPOINT, { schema: updateBidSchema }) //add schema
  async addProjectById(
    request: FastifyRequest<{
      Params: PutBidPathParams;
      Body: PutBidBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BidController -> updateBidById -> Update bid for bidder using ID: ${request.params.bid_id}`,
      );

      const data = await this.bidService.updateBid(
        request.params.bid_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in addProjectById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
