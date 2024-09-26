import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { HireModel, IHire } from "../models/hireDehixTalent.entity";

@Service()
export class HireDAO extends BaseDAO {
  model: Model<IHire>;

  constructor() {
    super();
    this.model = HireModel;
  }

  async findHireDehixTalentById(id: string) {
    return this.model.findById(id);
  }

  async createHireDehixTalent(data: any) {
    return this.model.create(data);
  }

  async updateHireDehixTalent(hireDehixTalent_id: any, newData: any) {
    return this.model.findByIdAndUpdate({ _id: hireDehixTalent_id }, newData, {
      new: true,
    });
  }

  async deleteHireDehixTalentById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async getHireDehixTalent(business_id: string) {
    try {
      // Query the HireModel for all records that match the business_id
      const hires = await this.model.find({ businessId: business_id });
      return hires;
    } catch (error) {
      console.error("Error in getHireByBusinessId:", error);
      throw new Error("Could not retrieve Hire records");
    }
  }

  async updateStatusHireDehixTalent(
    business_id: string,
    hireDehixTalent_id: string,
    update: { status?: string; visible?: boolean },
  ) {
    // Use the $set operator to only update the specific fields
    const updateFields = {} as any;

    if (update.status !== undefined) {
      updateFields[`status`] = update.status;
    }
    if (update.visible !== undefined) {
      updateFields[`visible`] = update.visible;
    }
    console.log(updateFields);
    // Perform the update with only the necessary fields
    try {
      const data = this.model.findOneAndUpdate(
        {
          _id: hireDehixTalent_id,
        },
        { $set: updateFields },
        {
          new: true, // Return the updated document
        },
      );
      // console.log("Data is",data);
      return data;
    } catch (error) {
      console.error("Error in updateStatusHireDehixTalent:", error);
      throw new Error("Could not update Hire records");
    }
  }
}
