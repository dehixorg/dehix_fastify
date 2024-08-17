import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import {
  IVerification,
  VerificationModel,
} from "../models/verifications.entity";

@Service()
export class VerificationDAO extends BaseDAO {
  model: Model<IVerification>;

  constructor() {
    super();
    this.model = VerificationModel;
  }

  async createOne(
    verifier_id: string,
    requester_id: string,
    document_id: string,
  ) {
    return this.model.create({
      verifier_id,
      requester_id,
      document_id,
    });
  }

  async getVerificationById(id: string) {
    return this.model
      .findById(
        id,
        "verifier_id requester_id document_id verification_status createdAt updatedAt",
      )
      .lean()
      .exec();
  }

  async updateVerification(condition: any, newData: any) {
    return this.model.updateOne(condition, newData).exec();
  }

  async findVerificationById(id: string) {
    return this.model.findById(id).lean().exec();
  }

  async updateVerificationData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update).exec();
  }

  async deleteVerification(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async updateStatus(verification_id: string, status: any) {
    return this.model.updateOne(
      { _id: verification_id },
      { $set: { verification_status: status } },
    );
  }

  async findVerificationByVerifierId(verifier_id: string) {
    return this.model.find({ verifier_id: verifier_id });
  }

  async findVerificationByRequesterId(requester_id: string) {
    return this.model.find({ requester_id: requester_id });
  }

  async findVerificationByDocumentId(document_id: string) {
    return this.model.find({ document_id: document_id });
  }
}