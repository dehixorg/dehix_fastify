import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { businessDAO } from "../dao";
import { IBusiness } from "../models/business.entity";
import { firebaseClient } from "../common/services";
import { ConflictError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
@Service()
export class BusinessService extends BaseService {
  @Inject(businessDAO)
  private businessDao!: businessDAO;
  // @Inject(FreelancerDAO)
  // private FreelancerDAO!: FreelancerDAO;
  async createBusiness(business: IBusiness) {
    try {
      this.logger.info("Business Service: creating business profile");
      const business_id =
        await firebaseClient.createFireBaseUserWithCustomClaims(
          business.email,
          business.password,
          { type: "business" },
        );
      business._id = business_id;

      const data: any = await this.businessDao.createBusiness(business);
      return data;
    } catch (error: any) {
      if (error.code === "USER_ALREADY_EXISTS") {
        throw new ConflictError(
          RESPONSE_MESSAGE.USER_EXISTS,
          ERROR_CODES.USER_ALREADY_EXIST,
        );
      } else {
        this.logger.error("Error in createBusiness:", error);
        throw error; // Pass the error to the parent for proper handling
      }
    }
  }

  async updateBusiness(business_id: string, update: any) {
    this.logger.info(
      `Business Service: business id:${business_id}
        updating business profile`,
    );

    const data = await this.businessDao.updateBusinessData(business_id, update);
    return data;
  }

  async getAllBusinessInfo() {
    this.logger.info(
      `Business Service: 
        Fetching all business profile`,
    );
    const data = await this.businessDao.findAllBusiness();
    return data;
  }
  async getBusinessByEmail(email: string) {
    this.logger.info(
      `Business Service: 
        Fetching  business profile with Email`,
    );
    const data = await this.businessDao.findOneByEmail(email);
    return data;
  }
  async getBusinessById(id: string) {
    this.logger.info(
      `Business Service: 
        Fetching  business profile with Id `,
    );

    const data = await this.businessDao.getById(id);
    return data;
  }

  async createBusinessProject(business_id: string, data: any) {
    this.logger.info(
      `Business Service: 
        Creating business Project`,
    );
    await this.businessDao.getBusinessById(business_id);
    const Project = await this.businessDao.createProjectBusiness(data);
    const { _id } = Project;
    await this.businessDao.addProjectById(business_id, _id);
    return Project;
  }
  async getBusinessProjectById(id: string) {
    this.logger.info(
      `Business Service: 
        Fetching business project by id`,
    );
    await this.businessDao.findBusinessProject(id);
  }
  async getAllProjectsData() {
    this.logger.info(
      `Business Service: 
        Fetching business Projects`,
    );
    const data = await this.businessDao.findAllProjects();
    return data;
  }

  async updateBusinessProjectData(id: string, update: any) {
    this.logger.info(
      `Business Service: 
        updating business projects`,
    );
    const data = await this.businessDao.updateBusinessProject(id, update);
    return data;
  }
  async deleteBusinessProject(id: string) {
    this.logger.info(
      `Business Service: 
        deleting business projects`,
    );
    const data = await this.businessDao.deleteBusinessProject(id);
    return data;
  }
}
