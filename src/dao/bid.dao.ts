import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IBid, BidModel } from "../models/bid.entity";

@Service()
export class BidDAO extends BaseDAO {
  model: Model<IBid>;

  constructor() {
    super();
    this.model = BidModel;
  }

  async createOne(
    bidder_id: string,
    project_id: string,
    domain_id: string,
    current_price: number
  ) {
    return this.model.create({
      bidder_id,
      project_id,
      domain_id,
      current_price,
    });
  }

  async getBidByEmail(email: string) {
    return this.model.findOne({ email }).lean().exec();
  }

  async findOneByEmail(email: string) {
    return this.model
      .findOne(
        { email },
        "id password firebase_id full_name email is_email_verified owner_id"
      )
      .lean()
      .exec();
  }

  async getById(id: string) {
    return this.model
      .findById(id, "id firebase_id full_name email is_email_verified owner_id")
      .lean()
      .exec();
  }

  async updateBid(condition: any, newData: any) {
    return this.model.findOneAndUpdate(condition, newData, { new: true }).exec();
  }

  async findBidById(id: string) {
    return this.model.findById(id).lean().exec();
  }

  async updateBidData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update).exec();
  }

  async deleteBid(id: string) {
    return this.model.findByIdAndDelete(id);
  }
  async updateStatus(bid_id: string, status: any) {
    return this.model.updateOne(
      { _id: bid_id },
      { $set: { bid_status: status } }
    );
  }
  async findBidByProjectId(project_id: string) {
    return this.model.find({ project_id: project_id });
  }
  async findBidByBidderId(bidder_id: string) {
    return this.model.find({ bidder_id: bidder_id });
  }

  async getAllBids() {
    try {
      const bids = await this.model.find();
      return bids;
    } catch (error: any) {
      throw new Error(`Failed to fetch bids: ${error.message}`);
    }
  }
  async getBidByProject(project_id:string){
    return this.model.find({project_id:project_id})
  }
}
