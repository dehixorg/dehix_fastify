/* eslint-disable import/no-extraneous-dependencies */
import { Service, Inject } from "fastify-decorators";
import { v4 as uuidv4 } from "uuid";
import { BaseService } from "../common/base.service";
import { BidApplyBody } from "src/types/v1/bid/bidApplyBody";
import { BidDAO } from "../dao/bid.dao";

@Service()
export class BidService extends BaseService {
  /**
   * Service method to register a new vendor
   * @param body
   * @param em
   * @returns
   */
  async create(body: BidApplyBody) {
    const { bidder_id, project_id, domain_id } = body;
    const bid: any = await this.bidDAO.createOne(
      bidder_id,
      project_id,
      domain_id,
    );
    return bid;
  }
}
