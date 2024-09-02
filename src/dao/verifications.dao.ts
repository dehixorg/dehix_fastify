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
    verifier_username: string,
    requester_id: string,
    doc_id: string,
    doc_type: string,
  ) {
    return this.model.create({
      verifier_id,
      verifier_username,
      requester_id,
      document_id: doc_id,
      doc_type,
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

  async getVerificationData(
    verifier_id: string,
    doc_type: "skill" | "domain" | "education" | "project" | "experience",
  ) {
    try {
      const query = {
        verifier_id: verifier_id, 
        ...(doc_type && { doc_type }),
      };

      const verificationData = await this.model.find(query);

      const requesterData = verificationData.map((doc: any) => ({
        requester_id: doc.requester_id,
        document_id: doc.document_id,
      }));

      return requesterData;
    } catch (error) {
      console.error("Error fetching verification requests data:", error);
      throw error;
    }
  }
}
