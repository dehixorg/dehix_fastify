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
    const { bidder_id, project_id, domain_id, current_price } = body;
    const bid: any = await this.BidDAO.createOne(
      bidder_id,
      project_id,
      domain_id,
      current_price,
    );
    return bid;
  }

  async updateBid(bid_id: string, bid) {
    this.logger.info("BidService: updateBid: Updating Bid: ", bid_id, bid);

    const data: any = await this.BidDAO.updateBid({ _id: bid_id }, bid);

    return data;
  }

  async bidStatusUpdate(bid_id: string, status: string): Promise<any> {
    const updateStatus = async (status: string) => {
      return await this.BidDAO.updateStatus(bid_id, status);
    };
    const data =
      status == "Accepted"
        ? await updateStatus("Accepted")
        : await updateStatus("Rejected");

    const updateStatus = async (status: string) => {
      return await this.BidDAO.updateStatus(bid_id, status);
    };
    const data =
      status === "Accepted"
        ? await updateStatus("Accepted")
        : await updateStatus("Rejected");

    return data;
  }

  async getBidBusiness(project_id: string) {
    this.logger.info(`Bid Service: Getting  business project bid`);
    const data = await this.BidDAO.findBidByProjectId(project_id);
    return data;
  }
  async getBidfreelancer(bidder_id: string) {
    this.logger.info(`Bid Service: Getting  Freelancer project bid`);
    const data = await this.BidDAO.findBidByBidderId(bidder_id);
    return data;
  }
  async deleteBid(id: string) {
    this.logger.info(`Bid Service: Deleting  project bid`);
    return await this.BidDAO.deleteBid(id);
  }
}
