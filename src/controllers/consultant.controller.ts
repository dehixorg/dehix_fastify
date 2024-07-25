import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { AuthController } from "../common/auth.controller";
import { ERROR_CODES, RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";
import { CONSULTANT_END_POINT, CREATE_CONSULTANT_END_POINT, DELETE_CONSULTANT_END_POINT, GET_ALL_CONSULTANT_END_POINT, GET_CONSULTANT_BY_ID_END_POINT, UPDATE_CONSULTANT_END_POINT } from "../constants/consultant.constant";
import { updateBidSchema } from "../schema/v1/bid/update";
import { createConsultantSchema } from "../schema/v1/consultant/create";
import { getAllConsultantSchema, getConsultantSchema } from "../schema/v1/consultant/get";
import { ConsultantService } from "../services/consultant.service";
import { GetconsultantPathParams } from "../types/v1/consultant/get";
import { PostConsultantBody } from "../types/v1/consultant/post";
import { PutConsultantBody, PutconsultantPathParams } from "../types/v1/consultant/put";
import { deleteConsultantSchema } from "../schema/v1/consultant/delete";
import { DeleteconsultantPathParams } from "../types/v1/consultant/delete";
import { updateConsultantSchema } from "../schema/v1/consultant/update";

@Controller({ route: CONSULTANT_END_POINT })
export default class ConsultantController extends AuthController {
    @Inject(ConsultantService)
   ConsultantService!: ConsultantService

    @POST(CREATE_CONSULTANT_END_POINT, { schema: createConsultantSchema })
    async createConsultant(request: FastifyRequest<{ Body: PostConsultantBody }>, reply: FastifyReply) {
        this.logger.info("Controllers->consultant.controller-> createConsultant");
        try {
            const data = await this.ConsultantService.createConsultant(request.body)
            reply.status(STATUS_CODES.CREATED).send({ data })

        } catch (error: any) {

            reply.status(STATUS_CODES.SERVER_ERROR).send({
                message: RESPONSE_MESSAGE.SERVER_ERROR,
                code: ERROR_CODES.SERVER_ERROR
            })

        }

    }
    @PUT(UPDATE_CONSULTANT_END_POINT, { schema: updateConsultantSchema })
    async updateConsultant(request: FastifyRequest<{ Params: PutconsultantPathParams, Body: PutConsultantBody }>, reply: FastifyReply) {
        try {
            this.logger.info("Controllers->consultant.controller-> updateConsultant");
            const data = await this.ConsultantService.updateConsultantById(request.params.consultant_id, request.body)
            reply.status(STATUS_CODES.SUCCESS).send({ data })
        } catch (error: any) {
            if (error.ERROR_CODES == "NOT_FOUND" || error.message.includes("Consultant with provided ID could not be found.")) {
                reply.status(STATUS_CODES.NOT_FOUND).send({
                    message: RESPONSE_MESSAGE.NOT_FOUND("Consultant"),
                    code: ERROR_CODES.NOT_FOUND
                })
            }
            else {
                reply.status(STATUS_CODES.SERVER_ERROR).send({
                    message: RESPONSE_MESSAGE.SERVER_ERROR,
                    code: ERROR_CODES.SERVER_ERROR
                })
            }
        }
    }
    @GET(GET_ALL_CONSULTANT_END_POINT, { schema: getAllConsultantSchema })
    async getAllConsultant(request: FastifyRequest, reply: FastifyReply) {
        try {
            this.logger.info("Controllers->consultant.controller-> getAllConsultant");
            const data = await this.ConsultantService.getAllConsultant();
            reply.status(STATUS_CODES.SUCCESS).send({ data });
        } catch (error: any) {
            return reply.status(STATUS_CODES.SERVER_ERROR).send({
                message: RESPONSE_MESSAGE.SERVER_ERROR,
                code: ERROR_CODES.SERVER_ERROR
            });
        }
    }
    
    @GET(GET_CONSULTANT_BY_ID_END_POINT,{schema:getConsultantSchema})
    async getConsultantById(request:FastifyRequest<{Params:GetconsultantPathParams}>,reply:FastifyReply){
        this.logger.info("Controllers->consultant.controller-> getConsultantById");
        try {
            const data= await this.ConsultantService.getConsultantById(request.params.consultant_id)
            reply.status(STATUS_CODES.SUCCESS).send({data})
        }  catch (error: any) {
            if (error.ERROR_CODES == "NOT_FOUND" || error.message.includes("Consultant with provided ID could not be found.")) {
                reply.status(STATUS_CODES.NOT_FOUND).send({
                    message: RESPONSE_MESSAGE.NOT_FOUND("Consultant"),
                    code: ERROR_CODES.NOT_FOUND
                })
            }
            else {
                reply.status(STATUS_CODES.SERVER_ERROR).send({
                    message: RESPONSE_MESSAGE.SERVER_ERROR,
                    code: ERROR_CODES.SERVER_ERROR
                })
            }
        }
       
    }
    @DELETE(DELETE_CONSULTANT_END_POINT,{schema:deleteConsultantSchema})
    async deleteConsultantById(request:FastifyRequest<{Params:DeleteconsultantPathParams}>,reply:FastifyReply){
        this.logger.info("Controllers->consultant.controller-> deleteConsultantById");
        try {
            const data= await this.ConsultantService.deleteConsultantById(request.params.consultant_id);
            reply.status(STATUS_CODES.SUCCESS).send({message:"Consultant deleted"})
        } catch (error: any) {
            if (error.ERROR_CODES == "NOT_FOUND" || error.message.includes("Consultant with provided ID could not be found.")) {
                reply.status(STATUS_CODES.NOT_FOUND).send({
                    message: RESPONSE_MESSAGE.NOT_FOUND("Consultant"),
                    code: ERROR_CODES.NOT_FOUND
                })
            }
            else {
                reply.status(STATUS_CODES.SERVER_ERROR).send({
                    message: RESPONSE_MESSAGE.SERVER_ERROR,
                    code: ERROR_CODES.SERVER_ERROR
                })
            }
        }

    }
}