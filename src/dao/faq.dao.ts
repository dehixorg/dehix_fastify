import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { FaqModel, IFaq } from "src/models/faq.entity";

@Service()
export class FaqDAO extends BaseDAO {
  model: Model<IFaq>;

  constructor() {
    super();
    this.model = FaqModel;
  }

  
}
