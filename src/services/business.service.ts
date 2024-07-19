import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { businessDAO } from "../dao";
import { IBusiness } from "../models/business.entity";
import { firebaseClient } from "../common/services";
import { ConflictError, NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { ProjectDAO } from "../dao/project.dao";
@Service()
export class BusinessService extends BaseService {
  @Inject(businessDAO)
  private businessDao!: businessDAO;
  @Inject(ProjectDAO)
  private ProjectDAO!: ProjectDAO;
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
          business.phone,
        );
      business._id = business_id;

      const data: any = await this.businessDao.createBusiness(business);
      return data;
    } catch (error: any) {
      if (business._id) {
        try {
          await firebaseClient.deleteFireBaseUser(business._id);
          this.logger.info(
            `Rolled back Firebase user creation for ID: ${business._id}`,
          );
        } catch (rollbackError) {
          this.logger.error(
            `Error rolling back Firebase user creation: ${rollbackError}`,
          );
        }
      }
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
    const data = await this.businessDao.findBusinessProjectByEmail(email);
    return data;
  }
  async getBusinessProfile(id: string) {
    this.logger.info(
      `Business Service: 
        Fetching  business profile with Id `,
      id,
    );

    const business: any = await this.businessDao.getById(id);
    return business;
  }

  async createBusinessProject(business_id: string, data: any) {
    this.logger.info(
      `Business Service: 
        Creating business Project`,
    );
    const businessExist = await this.businessDao.getBusinessById(business_id);
    if (!businessExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }
    const Project = await this.businessDao.createProjectBusiness(data);
    const { _id } = Project;
    await this.businessDao.addProjectById(business_id, _id);
    return Project;
  }
  async getBusinessProjectByEmail(email: string) {
    this.logger.info(
      `Business Service: 
        Fetching business project by email`,
    );
    const data = await this.businessDao.getBusinessByEmail(email);
    if (!data) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.PROJECT_NOT_FOUND,
        ERROR_CODES.PROJECT_NOT_FOUND,
      );
    }
    return data;
  }
  async getAllProjectsData() {
    this.logger.info(
      `Business Service: 
        Fetching all business project`,
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
  async updateEmailAndPhone(business_id: string, update: any) {
    this.logger.info(`Business Service: 
       Updating business email and phone `);
    const businessExist = await this.businessDao.getBusinessById(business_id);
    if (!businessExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }
    let data: any;
    if (update.email != "") {
      data = await this.businessDao.updateEmailAndPhone(business_id, {
        email: update.email,
      });
    } else {
      data = await this.businessDao.updateEmailAndPhone(business_id, {
        phone: update.phone,
      });
    }
    return data;
  }

  async getBusinessProjectsById(
    business_id: string,
    status?: "Active" | "Pending" | "Completed" | "Rejected",
  ) {
    this.logger.info("BusinessService: business get projects", business_id);

    const businessExist = await this.businessDao.findBusinessById(business_id);
    if (!businessExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }

    const data = await this.ProjectDAO.getBusinessProjectsById(
      business_id,
      status,
    );
    this.logger.info(data, "in get business projects");
    return data;
  }
}
