import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { HireDAO } from "../dao/hireDehixTalent.dao";
import { IHire } from "../models/hireDehixTalent.entity";
import { businessDAO } from "../dao";

@Service()
export class HireService extends BaseService {
  @Inject(HireDAO)
  private HireDAO!: HireDAO;
  @Inject(businessDAO)
  private businessDAO!: businessDAO;

  async createhireDehixTalent(business_id: string, data: IHire) {
    try {
      this.logger.info(
        "HireService: createHireDehixTalent: Creating HireDehixTalent: ",
        business_id,
      );

      const hireTalent: any = await this.HireDAO.createHireDehixTalent({
        ...data,
        businessId: business_id,
      });

      return hireTalent;
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

  async getHireDehixTalentById(business_id: string) {
    this.logger.info(
      "HireService: getHireDehixTalent: get hire dehix talent: ",
      business_id,
    );

    const userExist = await this.businessDAO.findBusinessById(business_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }

    const data = await this.HireDAO.getHireDehixTalent(business_id);
    return data;
  }

  async updateHireDehixTalent(
    business_id: string,
    hireDehixTalent_id: string,
    update: any,
  ) {
    this.logger.info(
      "HireService: updateHireDehixTalent",
      business_id,
      hireDehixTalent_id,
    );
    const businessExist = await this.businessDAO.findBusinessById(business_id);
    if (!businessExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }
    const hireDehixTalent = await this.HireDAO.getHireDehixTalent(business_id);
    if (!hireDehixTalent) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.HIRE_DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.HIRE_DEHIX_TALENT_NOT_FOUND,
      );
    }
    const data = await this.HireDAO.updateStatusHireDehixTalent(
      business_id,
      hireDehixTalent_id,
      update,
    );
    return data;
  }

  async addDehixTalentIntoLobby(hireDehixTalent_id: string, data: any) {
    this.logger.info("HireService: updateHireDehixTalent", hireDehixTalent_id);

    const hireDehixTalent =
      await this.HireDAO.findHireDehixTalentById(hireDehixTalent_id);
    if (!hireDehixTalent) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.HIRE_DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.HIRE_DEHIX_TALENT_NOT_FOUND,
      );
    }

    const response = await this.HireDAO.addDehixTalentIntoLobby(
      hireDehixTalent_id,
      data,
    );

    return response;
  }
}
