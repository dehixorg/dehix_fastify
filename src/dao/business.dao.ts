import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IBusiness, BusinessModel } from "../models/business.entity";
import { IProject, ProjectModel } from "src/models/project.entity";
import { ProjectConfig } from "firebase-admin/lib/auth/project-config";

@Service()
export class businessDAO extends BaseDAO {
  model: Model<IBusiness>;
  projectmodel:Model<IProject>
  constructor() {
    super();
    this.model = BusinessModel;
     this.projectmodel= ProjectModel;
  }

  async getBusinessByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async populateBusiness(business_id:string){
return this.model.findById(business_id).populate("ProjectList").populate({
  path: 'hirefreelancer.freelancer', 
  model: 'Freelancer'
})
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

  async updateBusiness(condition: any, newData: any) {
    return this.model.updateOne(condition, newData);
  }

  async findBusinessById(id: string) {
    return this.model.findById(id);
  }

  async updateBusinessData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update);
  }
  async findAllBusiness() {
    return this.model.find();
  }
  async createProjectBusiness(data:any){
    return this.projectmodel.create(data)
  }
async findBusinessProject(id:string){
  return this.projectmodel.findById(id)
}
async updateBusinessProject(id:string,update:any){
  return this.projectmodel.findByIdAndUpdate(id,update)
}
  async deleteBusinessProject(id:string){
    return this.projectmodel.findByIdAndDelete(id)
  }
  
  async addAppliedCandidateById(business_id:string,candidate_id:string){
    return this.model.findByIdAndUpdate(business_id,{$addToSet:{
      Appliedcandidates:candidate_id
    }})
  }
  async addCandidateByCategory(project_id:string,category:string,candidate_id:string){
this.projectmodel.findOneAndUpdate({_id: project_id, "TotalNeedOffreelancer.category": category},{ $addToSet: { "TotalNeedOffreelancer.$.appliedCandidates": candidate_id } },
  { new: true })
  }
  async updateProjectStatus(project_id:string,category:string){
    return this.projectmodel.updateOne(
      { _id: project_id, "TotalNeedOffreelancer.category": category },
      { $set: { "TotalNeedOffreelancer.$.status": "not assigned" } }
    );
  }
}
