import { Inject, Service } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { NotFoundError } from "../common/errors";
import { FreelancerDAO } from "../dao";
import { InterviewDao } from "../dao/interview.dao";

@Service()
export class InterviewService extends BaseService {
  @Inject(InterviewDao)
  private interviewDao!: InterviewDao;

  @Inject(FreelancerDAO)
  private freelancerDao!: FreelancerDAO;

  async createInterview(interviewee_id: string, interview_data: any) {
    this.logger.info("service->interview.service->createInterview");

    const userExist = await this.freelancerDao.findFreelancerById(interviewee_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND
      );
    }

    const findFreelancer = await this.freelancerDao.getInterviewee(interviewee_id);
    if (!findFreelancer || findFreelancer.length === 0) {
      throw new NotFoundError(RESPONSE_MESSAGE.DATA_NOT_FOUND, ERROR_CODES.NOT_FOUND);
    }

    const { _id } = findFreelancer[0];

    const data = await this.interviewDao.createInterview({
      ...interview_data,
      interviewer: _id,
      interviewee: interviewee_id,
    });

    const id = data._id;
    await this.freelancerDao.interviewsAlignedById(_id, [`${id}`]);

    return data;
  }

  async updateInterview(interview_id: string, update: any) {
    this.logger.info("service->interview.service->updateInterview");

    const interviewExist = await this.interviewDao.getInterviewById(interview_id);
    if (!interviewExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.INTERVIEW_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    const data = await this.interviewDao.updateInterviewById(interview_id, update);
    return data;
  }

  async getAllInterview(){
    this.logger.info("service->interview.service->getAllInterview");
    const data= await this.getAllInterview();
    return data;
  }
  async getSingleInterview(interview_id:string){
    this.logger.info("service->interview.service->getSingleInterview");
    const data= await this.interviewDao.getInterviewById(interview_id);
    if (!data) {
        throw new NotFoundError(
            RESPONSE_MESSAGE.INTERVIEW_NOT_FOUND,
            ERROR_CODES.NOT_FOUND
        )
    }
    return data
  }
  async getInterviewWithInterviewerId(interviewer_id:string){
    this.logger.info("service->interview.service->getInterviewWithInterviewerId");
    const data= await this.interviewDao.getInterviewByInterviewerId(interviewer_id);
    if (!data) {
      throw new NotFoundError(
          RESPONSE_MESSAGE.INTERVIEW_NOT_FOUND,
          ERROR_CODES.NOT_FOUND
      )
  }
  return data
  }
}
