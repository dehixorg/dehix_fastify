import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO, businessDAO } from "../dao";
import { string } from 'zod';
import { IBusiness } from "src/models/business.entity";
import { firebaseClient } from "../common/services";
import { SESService } from "../common/services";
@Service()

export class BusinessService extends BaseService{
    @Inject(businessDAO)
    private  businessDao!: businessDAO;
// @Inject(FreelancerDAO)
// private FreelancerDAO!: FreelancerDAO;
async createBusiness(business:IBusiness){
    this.logger.info(
        `Business Service:  creating business profile
       `
       );
       const [business_id, reset_link] = await firebaseClient.createUserByEmail(
        business.email,
      );
      business._id = business_id;
      const data: any= await this.businessDao.createBusiness(business)
       return data
}
    async getBusinessProfile(business_id:string){
        this.logger.info(
           `Business Service: business id:${business_id}
           fetching business profile`
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
        Creating business Project`
       );
       const business= await this.businessDao.getBusinessById(business_id)
       const {email}= business;
       const Project= await this.businessDao.createProjectBusiness(data);
       const {_id}=Project;
       await this.businessDao.addProjectById(business_id,_id);
       return Project
}
 async getBusinessProjectById(id:string){
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
        updating business projects`
       );
       const data= await this.businessDao.updateBusinessProject(id,update)
       return data;

 }
 async deleteBusinessProject(id:string){
    this.logger.info(
        `Business Service: 
        deleting business projects`
       );
       const data= await this.businessDao.deleteBusinessProject(id)
       return data
 }


}