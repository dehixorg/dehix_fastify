import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { BidApplyBody } from "src/types/v1/bid/bidApplyBody";
import { BidDAO } from "../dao/bid.dao";

@Service()
export class BidService extends BaseService {
  @Inject(BidDAO)
  private BidDAO!: BidDAO;

  /**
   * Service method to register a new vendor
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
}
