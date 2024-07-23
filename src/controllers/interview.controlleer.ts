import { Controller, Inject, POST, Service } from "fastify-decorators";
import { AuthController } from "src/common/auth.controller";
import { CREATE_INTERVIEW_END_POINT, INTERVIEW } from "src/constants/interview.constant";
import { InterviewService } from "src/services/interview.service";


   @Controller({route:INTERVIEW})
   export  default class InterviewController extends AuthController{
@Inject(InterviewService)
private InterviewService!:InterviewService

   }