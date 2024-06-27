import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO, businessDAO } from "src/dao";
import BusinessModel from "src/models/business.entity";
import { string } from "zod";
@Service()
export class BusinessService extends BaseService {
  @Inject(businessDAO)
  private businessDao!: businessDAO;
  // @Inject(FreelancerDAO)
  // private FreelancerDAO!: FreelancerDAO;
  async getBusinessProfile(business_id: string) {
    this.logger.info(
      `Business Service: business id:${business_id}
           fetching business profile`,
    );

    const data = await this.businessDao.populateBusiness(business_id);

    return data;
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
  }
  async getBusinessById(id: string) {
    this.logger.info(
      `Business Service: 
        Fetching  business profile with Id `,
    );

    const data = await this.businessDao.getById(id);
  }

  async createBusinessProject(business_id: string, data: any) {
    this.logger.info(
      `Business Service: 
        Creating business Project`,
    );
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
    const data = await this.businessDao.findBusinessProject(id);
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
  // need testing
  //  async deleteBusinessProjectData(id:string,business_id:string){
  //     this.logger.info(
  //         `Business Service:
  //         deleting business projects`
  //        );

  //        const data= await this.businessDao.deleteBusinessProject(id)
  //        const {_id}=data;
  //        await BusinessModel.findByIdAndUpdate(business_id,{$pull:{
  //         ProjectList:
  //        }})
  //  }
  // TO-DO
  //  async getAllFreelancer(){
  //     this.logger.info(
  //         `Business Service:
  //         filtering freelancer for`
  //        );

  //        const data= await
  //  }

  //  need to add in bid service after completion
  // async acceptOrRejectBid(status:string,freelancer_id:string,business_id:string,project_id:string){
  //     this.logger.info(
  //         `Business Service:
  //         Action on aplication business projects`
  //        );
  //        if (status === "rejected") {
  //         await this.FreelancerDAO.updateProjectByIdToReject(
  //           freelancer_id,project_id
  //         );
  //       } else {
  //         await this.FreelancerDAO.updateProjectByIdToAccept(
  //                 freelancer_id,
  //               project_id
  //         );

  //       }
  // // write email sending logic

  // }
}
