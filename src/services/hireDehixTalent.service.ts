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

        const data: any = await this.HireDAO.createHireDehixTalent(hireDehixTalent);

        return data;
        } catch (error: any) {
            this.logger.error("Error in createHireDehixTalent:", error);
            throw error; // Pass the error to the parent for proper handling
        }
    }
}
