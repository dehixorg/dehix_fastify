import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { BidApplyBody } from "../types/v1/bid/bidApplyBody";
import { BidDAO } from "../dao/bid.dao";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { businessDAO, FreelancerDAO } from "../dao";
import { ProjectDAO } from "../dao/project.dao";

@Service()
export class BidService extends BaseService {
  @Inject(BidDAO)
  private BidDAO!: BidDAO;
  @Inject(FreelancerDAO)
  private FreelancerDao!: FreelancerDAO;
  @Inject(ProjectDAO)
  private ProjectDao!: ProjectDAO;
  @Inject(businessDAO)
  private BusinesssDao!: businessDAO;

  /**
   * Service method to register a new FREELANCER
   * @param body
   * @param em
   * @returns
   */
  async create(body: BidApplyBody) {
    const { bidder_id, project_id, domain_id, current_price } = body;
    this.logger.info("fvfvffgrbgbghghg");
    const bidderExist = await this.FreelancerDao.findFreelancerById(bidder_id);
    const projectExist = await this.BusinesssDao.getProjectById(project_id);
    if (!bidderExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    if (!projectExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.PROJECT_NOT_FOUND_BY_ID,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const bid: any = await this.BidDAO.createOne({
      bidder_id,
      project_id,
      domain_id,
      current_price,
      userName: bidderExist.userName,
    });
    return bid;
  }

  async updateBid(bid_id: string, bid: any) {
    this.logger.info("BidService:Updating Bid: ", bid_id, bid);
    const bidExist = await this.BidDAO.findBidById(bid_id);
    if (!bidExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Bid"),
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data: any = await this.BidDAO.updateBid({ _id: bid_id }, bid);
    return data;
  }

  async bidStatusUpdate(bid_id: string, bid_status: string): Promise<any> {
    this.logger.info(
      "BidService: updateBidStatus: Updating Bid Status: ",
      bid_id,
    );
    const updateStatus = async (bid_status: string) => {
      return await this.BidDAO.updateStatus(bid_id, bid_status);
    };
    const bidExist = await this.BidDAO.findBidById(bid_id);
    if (!bidExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Bid"),
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data =
      bid_status == "Accepted"
        ? await updateStatus("Accepted")
        : bid_status == "Rejected"
          ? await updateStatus("Rejected")
          : bid_status == "Interview"
            ? await updateStatus("Interview")
            : bid_status == "Panel"
              ? await updateStatus("Panel")
              : await updateStatus("Pending");
    return data;
  }

  async getBidBusiness(project_id: string) {
    this.logger.info(`Bid Service: Getting  business project bid`);
    const projectExist = await this.BusinesssDao.getProjectById(project_id);

    if (!projectExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.PROJECT_NOT_FOUND_BY_ID,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.BidDAO.findBidByProjectId(project_id);
    return data;
  }
  async getBidfreelancer(bidder_id: string) {
    this.logger.info(`Bid Service: Getting  Freelancer project bid`);
    const bidderExist = await this.FreelancerDao.findFreelancerById(bidder_id);

    if (!bidderExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }

    const data = await this.BidDAO.findBidByBidderId(bidder_id);
    return data;
  }
  async deleteBid(id: string) {
    this.logger.info(`Bid Service: Deleting  project bid`);
    const bidExist = await this.BidDAO.findBidById(id);
    if (!bidExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Bid"),
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.BidDAO.deleteBid(id);
    return data;
  }

  async getAllBids() {
    this.logger.info("BidService: getAllBids: Fetching All Bids ");

    const bids: any = await this.BidDAO.getAllBids();

    if (!bids) {
      this.logger.error("BidService: getAllBids: Bids not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Bids"),
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return bids;
  }
  async getAllBidByProject(project_id: string) {
    this.logger.info("BidService: getAllBidByProject: Fetching All Bids ");
    const projectExist = await this.ProjectDao.getProjectById(project_id);

    if (!projectExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.PROJECT_NOT_FOUND_BY_ID,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.BidDAO.getBidByProject(project_id);

    return data;
  }
}
