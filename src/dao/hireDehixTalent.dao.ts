import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { HireModel, IHire } from "../models/hireDehixTalent.entity";
import { v4 as uuidv4 } from "uuid";
@Service()
export class HireDAO extends BaseDAO {
  model: Model<IHire>;

  constructor() {
    super();
    this.model = HireModel;
  }

  async createHireDehixTalent(data: any) {
    return this.model.create(data);
  }

  async updateHireDehixTalent(hireDehixTalent_id: any, newData: any) {
    return this.model.findByIdAndUpdate(
      {_id: hireDehixTalent_id},
      newData,
      { new: true }
    );
  }
}
