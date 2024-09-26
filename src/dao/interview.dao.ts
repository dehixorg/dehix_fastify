import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IInterview, InterviewModel } from "../models/interview.entity";

@Service()
export class InterviewDao extends BaseDAO {
  model: Model<IInterview>;
  constructor() {
    super();
    this.model = InterviewModel;
  }

  async createInterview(data: string) {
    return this.model.create(data);
  }
  async getInterviewById(interviewee_id: string) {
    return this.model.findOne({ interviewee: interviewee_id });
  }
  async getAllInterviews(page:string,limit:string) {
    const pages= parseInt(page)-1;
    const pageSize= parseInt(limit);
    const pageIndex= pages * pageSize;
    return this.model.find().skip(pageIndex).limit(pageSize);
  }
  async updateInterviewById(interview_id: string, update: any) {
    return this.model.findOneAndUpdate({ _id: interview_id }, update, {
      new: true,
    });
  }
  async getInterviewByRating(rating: number) {
    return this.model.find({ rating: rating });
  }
  async getInterviewByInterviewerId(interviwer_id: string) {
    return this.model.find({ interviewer: interviwer_id });
  }
}
