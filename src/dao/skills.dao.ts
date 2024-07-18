import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { SkillModel, ISkill } from "../models/skill.entity";
import { v4 as uuidv4 } from "uuid";
@Service()
export class SkillDAO extends BaseDAO {
  model: Model<ISkill>;

  constructor() {
    super();
    this.model = SkillModel;
  }

  async addSkills(skillsData: Partial<ISkill>[]) {
    try {
      const insertedSkills = await Promise.all(
        skillsData.map(async (skillData) => {
          const skill = await this.model.create({
            _id: uuidv4(),
            ...skillData,
          });
          return skill;
        }),
      );
      return insertedSkills;
    } catch (error: any) {
      throw new Error(`Failed to add skills: ${error.message}`);
    }
  }

  async getAllSkills() {
    try {
      const skills = await this.model.find();
      return skills;
    } catch (error: any) {
      throw new Error(`Failed to fetch skills: ${error.message}`);
    }
  }
  async deleteSkills(skill_id:string){
    return this.model.findByIdAndDelete(skill_id)
  }
  async getSkillById(skill_id:string){
    return this.model.findById(skill_id)
  }
}
