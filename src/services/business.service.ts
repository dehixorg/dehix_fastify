import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { BidDAO, businessDAO, FreelancerDAO } from "../dao";
import { firebaseClient } from "../common/services";
import { ConflictError, NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { ProjectDAO } from "../dao/project.dao";
import { VerificationService } from "./verifications.service";
@Service()
export class BusinessService extends BaseService {
  @Inject(businessDAO)
  private businessDao!: businessDAO;
  @Inject(ProjectDAO)
  private ProjectDAO!: ProjectDAO;
  @Inject(VerificationService)
  private VerificationService!: VerificationService;
  @Inject(FreelancerDAO)
  private FreelancerDAO!: FreelancerDAO;
  @Inject(BidDAO)
  private BidDAO!: BidDAO;
  async createBusiness(business: any) {
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
      const userObj = { ...business, password: "" };
      const data: any = await this.businessDao.createBusiness(userObj);

      // Request for profile verification
      await this.VerificationService.requestBusinessVerification(
        business_id,
        "business",
      );

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
    const data = await this.businessDao.findOneByEmail(email);
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
    const BusinessExist = await this.businessDao.getBusinessById(business_id);
    if (!BusinessExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.BUSINESS_NOT_FOUND,
        ERROR_CODES.BUSINESS_NOT_FOUND,
      );
    }
    const companyData = BusinessExist;
    const Project = await this.businessDao.createProjectBusiness({
      ...data,
      companyName: companyData.companyName,
      companyId: companyData._id,
    });
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
  async getAllProjectsData(
    filters: {
      location?: string[];
      jobType?: string[];
      domain?: string[];
      skills?: string[];
    },
    freelancer_id: string,
  ) {
    const { location, jobType, domain, skills } = filters;

    this.logger.info(
      `Business Service: Fetching all business projects with filters - Location: ${location}, Job Type: ${jobType}, Domain: ${domain}, Skills: ${skills}`,
    );

    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    // Ensure notInterestedProject is defined
    const notInterestedProjects = freelancerExist.notInterestedProject || [];

    const dataSet = await this.businessDao.findAllProjects({
      location,
      jobType,
      domain,
      skills,
    });

    const data = dataSet.filter(
      (project) => !notInterestedProjects.includes(project._id.toString()),
    );

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
  async getSingleProjectById(project_id: string, freelancer_id: string) {
    try {
      this.logger.info(
        "BusinessService: business get projects by id",
        project_id,
      );
  
      const data = await this.businessDao.getProjectById(project_id);
  
      if (!data) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.PROJECT_NOT_FOUND,
          ERROR_CODES.BUSINESS_PROJECT_NOT_FOUND,
        );
      }
  
      const projectData = data.toObject();
  
      
      if (!data.profiles || !Array.isArray(data.profiles)) {
        throw new Error('Profiles data is missing or not in the expected format');
      }
      const alreadyApplied = data.profiles.some((profile: any) =>
        profile.totalBid?.some((id: string) => id === freelancer_id)
      );
  
      if (alreadyApplied) {
        return {
          data: projectData,
          message: "Already Applied",
        };
      }
  
      return { data: projectData };
    } catch (error) {
      this.logger.error("Error in getSingleProjectById:", error);
      throw error;
    }
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

  async getAllProject() {
    this.logger.info("BusinessService: getAllProject: Fetching All Projects ");

    const projects: any = await this.ProjectDAO.getAllProject();

    if (!projects) {
      this.logger.error("BusinessService: getAllProject: project not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Project"),
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return projects;
  }
}
