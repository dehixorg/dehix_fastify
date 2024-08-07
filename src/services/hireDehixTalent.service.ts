import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { HireDAO } from "../dao/hireDehixTalent.dao";
import { IHire } from "../models/hireDehixTalent.entity";

@Service()
export class HireService extends BaseService {
  @Inject(HireDAO)
  private HireDAO!: HireDAO;

  async createhireDehixTalent(hireDehixTalent: IHire) {
    try {
      this.logger.info(
        "HireService: createHireDehixTalent: Creating HireDehixTalent: ",
        hireDehixTalent,
      );

      const data: any =
        await this.HireDAO.createHireDehixTalent(hireDehixTalent);

      return data;
    } catch (error: any) {
      this.logger.error("Error in createHireDehixTalent:", error);
      throw error; // Pass the error to the parent for proper handling
    }
  }

  async putHireDehixTalent(hireDehixTalent_id: string, update: any) {
    this.logger.info(
      "HireService: update hire dehix talent ",
      hireDehixTalent_id,
    );

    const data = await this.HireDAO.updateHireDehixTalent(
      hireDehixTalent_id,
      update,
    );
    this.logger.info(data, "in update hireDehixTalent");
    return data;
  }

  async deleteHireDehixTalent(hireDehixTalent_id: string) {
    this.logger.info("HireService: deleteHireDehixTalent", hireDehixTalent_id);

    const hireDehixTalentExist =
      await this.HireDAO.findHireDehixTalentById(hireDehixTalent_id);
    if (!hireDehixTalentExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.HIRE_DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.HIRE_DEHIX_TALENT_NOT_FOUND,
      );
    }

    const data =
      await this.HireDAO.deleteHireDehixTalentById(hireDehixTalent_id);
    return data;
  }
}
