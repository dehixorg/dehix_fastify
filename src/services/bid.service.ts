import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { BidApplyBody } from "../types/v1/bid/bidApplyBody";
import { BidDAO } from "../dao/bid.dao";

@Service()
export class BidService extends BaseService {
  @Inject(BidDAO)
  private BidDAO!: BidDAO;

  /**
   * Service method to register a new FREELANCER
   * @param body
   * @param em
   * @returns
   */
  async create(body: BidApplyBody) {
    const { bidder_id, project_id, domain_id } = body;
    const bid: any = await this.BidDAO.createOne(
      bidder_id,
      project_id,
      domain_id,
    );
    return bid;
  }

  async updateBid(bid_id: string, bid) {
    this.logger.info("BidService: updateBid: Updating Bid: ", bid_id, bid);

    const data: any = await this.BidDAO.updateBid({ _id: bid_id }, bid);

    return data;
  }
}
