import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IFreelancer, FreelancerModel } from "../models/freelancer.entity";
import { v4 as uuidv4 } from "uuid";
import ApplicationForWorkModel, { IApplicationForWork } from "src/models/applyforwork.entity";
import { string } from "zod";

@Service()
export class FreelancerDAO extends BaseDAO {
  model: Model<IFreelancer>;
applicationmodel:Model<IApplicationForWork>
  constructor() {
    super();
    this.model = FreelancerModel;
    this.applicationmodel=ApplicationForWorkModel
  }

  async getFreelancerByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findOneByEmail(email: string) {
    return this.model.findOne(
      { email },
      "id password firebase_id full_name email is_email_verified owner_id",
    );
  }

  async getById(id: string) {
    return this.model.findById(
      id,
      "id firebase_id full_name email is_email_verified owner_id",
    );
  }

  async updateFreelancer(condition: any, newData: any) {
    return this.model.updateOne(condition, newData);
  }

  async findFreelancerById(id: string) {
    return this.model.findById(id);
  }

  async updateFreelancerData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update);
  }
  async findAllFreelancer(data) {
    return this.model.find(data);
  }

  async addFreelancerSkill(id: string, skills: any) {
    return this.model.updateOne(
      { _id: id },
      { $addToSet: { skills: { $each: skills } } },
    );
  }
  async sendFreelancerInfo(id: string) {
    return this.model
      .findById(id, "id firebase_id full_name email is_email_verified owner_id")
      .populate("project")
      .populate("pendingProject")
      .populate("rejectedProject")
      .populate("acceptedProject");
  }
  async addExperienceById(id: string, update: any, experinceid: string) {
    return this.model.findByIdAndUpdate(id, {
      $addToSet: {
        professional_info: { _id: experinceid, ...update },
      },
    });
  }
  async deleteExperienceById(id: string, experinceid: string) {
    return this.model.findByIdAndDelete(id, {
      $pull: {
        professionalInfo: { _id: experinceid },
      },
    });
  }

  async deleteProjectById(id: string, project_id: string) {
    return this.model.findByIdAndUpdate(
      id,
      { $unset: { [`projects.${project_id}`]: "" } },
      { new: true },
    );
  }

  async createProjectById(id: string, project) {
    project._id = uuidv4();
    try {
      const result = await this.model.findByIdAndUpdate(
        id,
        { $set: { [`projects.${project._id}`]: project } },
        { new: true, upsert: true },
      );
      return result;
    } catch (error: any) {
      throw new Error(`Failed to add project to freelancer: ${error.message}`);
    }
  }

  async createFreelancer(freelancer: IFreelancer) {
    try {
      const createdFreelancer = await this.model.create(freelancer);
      return createdFreelancer;
    } catch (error: any) {
      throw new Error(`Failed to add freelancer: ${error.message}`);
    }
  }
   async updatePendingProjectById(freelancer_id:string,project_id:string){
return this.model.findByIdAndUpdate(
  freelancer_id,
  { $addToSet: { pendingProject: project_id } },
  { new: true }
);

   }
   async updateProjectByIdToAccept(freelancer_id:string,project_id:string){
    return this.model.findByIdAndUpdate(
      freelancer_id,
      {
        $pull: { pendingProject: project_id},
        $addToSet: { acceptedProject: project_id }
      },
      { new: true }
    );
       }
       async updateProjectByIdToReject(freelancer_id:string,project_id:string){
        return this.model.findByIdAndUpdate(
          freelancer_id,
          {
            $pull: { pendingProject: project_id },
            $addToSet: { rejectedProject:project_id }
          },
          { new: true }
        );
        
           }
   async creatJobApplication(data:any){
    return this.applicationmodel.create(data)
   }
   async findJobApplicationById(application_id:string){
    return this.applicationmodel.findById(application_id);
   }
   async updateJobApplicationStatusById(application_id:string,status:string){
    return this.applicationmodel.findByIdAndUpdate(application_id,
      { status:status },
      { new: true })
   }

}
