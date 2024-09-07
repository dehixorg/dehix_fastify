/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { BidService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
// import { GetBidPathParams } from "../types/v1";
import {
  ALL_BID_ENDPOINT,
  BID_ENDPOINT,
  BID_ID_BUSINESS_END_POINT,
  BID_ID_FREELANCER_END_POINT,
  DELETE_BID_END_POINT,
  UPDATE_BID_BY_ID_ENDPOINT,
  UPDATE_BID_STATUS_BY_ID_ENDPOINT,
} from "../constants/bid.constant";
import { AuthController } from "../common/auth.controller";
import { bidApplySchema } from "../schema/v1/bid/bid.apply";
import { BidApplyBody } from "../types/v1/bid/bidApplyBody";
import {
  BidStatusBody,
  PutBidBody,
  PutBidPathParams,
} from "../types/v1/bid/updateBid";
import {
  updateBidSchema,
  updateBidStatusSchema,
} from "../schema/v1/bid/bid.update";
import {
  getAllBidsSchema,
  getBidForBidderIdSchema,
  getBidForProjectIdSchema,
} from "../schema/v1/bid/bid.get";
import {
  GetBidByBidderIdPathParams,
  GetBidByProjectIdPathParams,
} from "../types/v1/bid/getBid";
import { DeleteBidPathParams } from "../types/v1/bid/deleteBid";
import { deleteBidSchema } from "../schema/v1/bid/bid.delete";

@Controller({ route: BID_ENDPOINT })
export default class BidController extends AuthController {
  @Inject(BidService)
  bidService!: BidService;

  @POST("", { schema: bidApplySchema })
  async bidApply(
    request: FastifyRequest<{ Body: BidApplyBody }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(`BidController -> getById -> Applying for bid}`);
      const data = await this.bidService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({
        data,
      });
    } catch (error: any) {
      this.logger.error(`Error in create bid: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.message.includes(
          "Freelancer with provided ID could not be found."
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (error.message.includes("Project not found by id")) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
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

  @PUT(UPDATE_BID_BY_ID_ENDPOINT, { schema: updateBidSchema }) //add schema
  async updateBidById(
    request: FastifyRequest<{
      Params: PutBidPathParams;
      Body: PutBidBody;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `BidController -> updateBidById -> Update bid for bidder using ID: ${request.params.bid_id}`
      );

      const data = await this.bidService.updateBid(
        request.params.bid_id,
        request.body
      );

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Bid updated" });
    } catch (error: any) {
      this.logger.error(`Error in update bid project: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.message.includes(
          "Freelancer with provided ID could not be found."
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (error.message.includes("Project not found by id")) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
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

  @PUT(UPDATE_BID_STATUS_BY_ID_ENDPOINT, { schema: updateBidStatusSchema })
  async updateBidStatusById(
    request: FastifyRequest<{
      Params: PutBidPathParams;
      Body: BidStatusBody;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `BidController -> updateBidStatusById -> Update bid status using ID: ${request.params.bid_id}`
      );

      const data = await this.bidService.bidStatusUpdate(
        request.params.bid_id,
        request.body.bid_status
      );
      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Status Update Sucessfull" });
    } catch (error: any) {
      this.logger.error(`Error in Update status: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
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

  @GET(BID_ID_BUSINESS_END_POINT, { schema: getBidForProjectIdSchema })
  async getBidBusiness(
    request: FastifyRequest<{ Params: GetBidByProjectIdPathParams }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `BidController -> getBidBusiness -> Fetching Business Bid for project ID: ${request.params.project_id}`
      );

      const data = await this.bidService.getBidBusiness(
        request.params.project_id
      );

      if (!data || data.length === 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in get business bid: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.message.includes(
          "Freelancer with provided ID could not be found."
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (error.message.includes("Project not found by id")) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
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

  @GET(BID_ID_FREELANCER_END_POINT, { schema: getBidForBidderIdSchema })
  async getBidFreelancer(
    request: FastifyRequest<{ Params: GetBidByBidderIdPathParams }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `BidController -> getBidFreelancer -> Fetching Freelancer Bid for Bidder ID: ${request.params.bidder_id}`
      );

      const data = await this.bidService.getBidfreelancer(
        request.params.bidder_id
      );

      if (!data || data.length === 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getBidFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.message.includes(
          "Freelancer with provided ID could not be found."
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (error.message.includes("Project not found by id")) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
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

  @DELETE(DELETE_BID_END_POINT, { schema: deleteBidSchema })
  async deleteBid(
    request: FastifyRequest<{ Params: DeleteBidPathParams }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `BidController -> Delete Bid -> Deleting Bid for Bid ID: ${request.params.bid_id} `
      );

      const data = await this.bidService.deleteBid(request.params.bid_id);
      return reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Bid deleted" });
    } catch (error: any) {
      this.logger.error(`Error in delete bid: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Bid not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bid"),
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

  @GET(ALL_BID_ENDPOINT, { schema: getAllBidsSchema })
  async getAllBids(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`BidController -> getAllBids -> Fetching bids`);

      const data = await this.bidService.getAllBids();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Bids"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      console.log("DATA:", data);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllBids: ${error.message}`);
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
