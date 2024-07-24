import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IInterview, InterviewModel } from "../models/interview.entity";

@Service()
export class InterviewDao extends BaseDAO{
model:Model<IInterview>;
constructor(){
    super()
    this.model=InterviewModel;
}

async createInterview(data:string){
    return this.model.create(data);
}
async getInterviewById(id:string){
    return this.model.findById(id);
}
async getAllInterviews(){
    return this.model.find();
}
async updateInterviewById(interview_id:string,update:any){
return this.model.findOneAndUpdate({_id:interview_id},update,{new:true});
}
async getInterviewByRating(rating:Number){
return this.model.find({rating:rating})
}
async getInterviewByInterviewerId(interviwer_id:string){
    return this.model.find({interviewer:interviwer_id})
}
}