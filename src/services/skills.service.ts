import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { SkillDAO } from "../dao/skills.dao";

@Service()
export class SkillsService extends BaseService {
  @Inject(SkillDAO)
  private SkillDAO!: SkillDAO;

  async getAllSkills() {
    this.logger.info("SkillsService: getAllSkills: Fetching All Skills ");

    const skills: any = await this.SkillDAO.getAllSkills();

    if (!skills) {
      this.logger.error("SkillsService: getAllSkills: Skills not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Skills"),
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return skills;
  }
}
