/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { FreelancerService } from "../services";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import {
  CreateFreelancerEducationBody,
  CreateFreelancerExperienceBody,
  CreateFreelancerProjectBody,
  GetFreelancerPathParams,
} from "../types/v1";
import {
  FREELANCER_ENDPOINT,
  FREELANCER_ID_ENDPOINT,
  FREELANCER_PROJECT_ADD_BY_ID,
  FREELANCER_CREATE_ENDPOINT,
  FREELANCER_PROJECT_DELETE_BY_ID,
  FREELANCER_SKILLS_ADD_BY_ID,
  FREELANCER_SKILL_DELETE_BY_ID,
  FREELANCER_ORACLE_STATUS_BY_ID,
  FREELANCER_INTERVIEWS_ALIGNED_BY_ID,
  FREELANCER_UPDATE_EXPERIENCE_BY_ID,
  FREELANCER_EXPERINCE_DELETE_BY_ID,
  FREELANCER_CREATE_EXPERIENCE_BY_ID,
  FREELANCER_CREATE_EDUCATION_BY_ID,
  FREELANCER_UPDATE_EDUCATION_BY_ID,
  FREELANCER_DELETE_EDUCATION_BY_ID,
  FREELANCER_PROJECT_ID_ENDPOINT,
  FREELANCER_UPDATE_PROJECT_BY_ID,
} from "../constants/freelancer.constant";
import {
  getFreelancerSchema,
} from "../schema/v1/freelancer/get";
import { AuthController } from "../common/auth.controller";
import {
  experinceInProfessionalInfo,
  interviewsAlignedSchema,
  oracleStatusSchema,
  updateEducationSchema,
  updateFreelancerSchema,
  updateProjectSchema,
} from "../schema/v1/freelancer/update";
import {
  PutFreelancerPathParams,
  PutFreelancerBody,
  PutFreelancerSkillsBody,
  PutFreelancerOracleStatusBody,
  PutFreelancerInterviewsAlignedBody,
  PutExperincePathParams,
  PutFreelancerExperinceBody,
  PutEducationPathParams,
  PutFreelancerEducationBody,
  PutProjectPathParams,
} from "../types/v1/freelancer/updateProfile";
import {
  deleteEducationSchema,
  deleteFreelancerProjectSchema,
  deleteFreelancerSkillSchema,
  deleteProfessionalInfoSchema,
} from "../schema/v1/freelancer/delete";
import {
  DeleteFreelancerEducationPathParams,
  DeleteFreelancerExperiencePathParams,
  DeleteFreelancerProjectPathParams,
  DeleteFreelancerSkillPathParams,
} from "../types/v1/freelancer/delete";
import { PutFreelancerProjectBody } from "../types/v1/freelancer/updateProject";

import { addFreelancerSkillsSchema } from "../schema/v1/freelancer/update";
import { IFreelancer } from "../models/freelancer.entity";
import {
  createEducationSchema,
  createProfessionalInfoSchema,
  createProjectSchema,
} from "../schema/v1/freelancer/create";
import { GetFreelancerProjectQueryParams } from "src/types/v1/freelancer/getProject";

@Controller({ route: FREELANCER_ENDPOINT })
export default class FreelancerController extends AuthController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @GET(FREELANCER_ID_ENDPOINT, { schema: getFreelancerSchema })
  async getFreelancer(
    request: FastifyRequest<{ Params: GetFreelancerPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancer -> Fetching freelancer profile for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerProfile(
        request.params.freelancer_id,
      );
      console.log("DATA:", data);

      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(FREELANCER_PROJECT_ID_ENDPOINT, { schema: getFreelancerProjectSchema })
  async getFreelancerProjects(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
      Querystring: GetFreelancerProjectQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerProjects -> Fetching freelancer projects for ID: ${request.params.freelancer_id}`,
      );

      const { freelancer_id } = request.params;
      const { status } = request.query;

      const data = await this.freelancerService.getFreelancerProjects(
        freelancer_id,
        status,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(FREELANCER_ID_ENDPOINT, { schema: updateFreelancerSchema })
  async updateFreelancer(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateFreelancer -> Updating profile for ID: ${request.params.freelancer_id}`,
      );
      const data = await this.freelancerService.updateProfileFreelancer(
        request.params.freelancer_id,
        request.body,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateFreelancer: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(FREELANCER_SKILL_DELETE_BY_ID, {
    schema: deleteFreelancerSkillSchema,
  })
  async deleteSkillById(
    request: FastifyRequest<{ Params: DeleteFreelancerSkillPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteSkillById -> Deleting skill using: ${request.params}`,
      );
      const data = await this.freelancerService.deleteFreelancerSkill(
        request.params.freelancer_id,
        request.params.skill_id,
      );

      if (data.modifiedCount == 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Skill"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in deleteSkillById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(FREELANCER_SKILLS_ADD_BY_ID, { schema: addFreelancerSkillsSchema })
  async addSkillsById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerSkillsBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> addSkillsById -> Adding skills for freelancer using ID: ${request.params.freelancer_id}`,
      );

      const updatedFreelancer =
        await this.freelancerService.addFreelancerSkills(
          request.params.freelancer_id,
          request.body.skills,
        );

      reply.status(STATUS_CODES.SUCCESS).send({ data: updatedFreelancer });
    } catch (error: any) {
      this.logger.error(`Error in addSkillsById: ${error.message}`);

      if (error.message.includes(RESPONSE_MESSAGE.FREELANCER_NOT_FOUND)) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
          code: ERROR_CODES.FREELANCER_NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(FREELANCER_ORACLE_STATUS_BY_ID, { schema: oracleStatusSchema })
  async updateOracleStatusById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerOracleStatusBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateOracleStatusById -> Updating oracle status of freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.updateFreelancerOracleStatus(
        request.params.freelancer_id,
        request.body.oracleStatus,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in updateOracleStatusById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @PUT(FREELANCER_INTERVIEWS_ALIGNED_BY_ID, { schema: interviewsAlignedSchema })
  async interviewsAlignedById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerInterviewsAlignedBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> interviewsAlignedById -> Interviews aligned of freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.freelancerInterviewsAligned(
        request.params.freelancer_id,
        request.body.interviewsAligned,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in aligned interviews: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
  @PUT(FREELANCER_UPDATE_EXPERIENCE_BY_ID, {
    schema: experinceInProfessionalInfo,
  })
  async putExperienceFreelancer(
    request: FastifyRequest<{
      Params: PutExperincePathParams;
      Body: PutFreelancerExperinceBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> putExperienceFreelancer-> update experince freelancer  using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.putFreelancerExperience(
        request.params.freelancer_id,
        request.params.experience_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in experince add: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "EXPERIENCE_NOT_FOUND" ||
        error.message.includes("Freelancer experience  not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Experience"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
  @DELETE(FREELANCER_EXPERINCE_DELETE_BY_ID, {
    schema: deleteProfessionalInfoSchema,
  })
  async deleteExperienceFreelancer(
    request: FastifyRequest<{ Params: DeleteFreelancerExperiencePathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteExperienceFreelancer -> Deleting experience using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.deleteFreelancerExperience(
        request.params.freelancer_id,
        request.params.experience_id,
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "Experience deleted" });
    } catch (error: any) {
      this.logger.error(
        `Error in deleteExperienceFreelancer: ${error.message}`,
      );
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "EXPERIENCE_NOT_FOUND" ||
        error.message.includes("Freelancer experience not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Experience"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
  @POST(FREELANCER_CREATE_EXPERIENCE_BY_ID, {
    schema: createProfessionalInfoSchema,
  })
  async createExperience(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
      Body: CreateFreelancerExperienceBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteExperienceFreelancer -> Deleting experience using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.createFreelancerExperience(
        request.params.freelancer_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(
        `Error in CreateExperienceFreelancer: ${error.message}`,
      );
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @POST(FREELANCER_CREATE_EDUCATION_BY_ID, { schema: createEducationSchema })
  async createEducation(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
      Body: CreateFreelancerEducationBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> createEducation -> Create education using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.createFreelancerEducation(
        request.params.freelancer_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateEducation: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(FREELANCER_UPDATE_EDUCATION_BY_ID, { schema: updateEducationSchema })
  async updateEducationFreelancer(
    request: FastifyRequest<{
      Params: PutEducationPathParams;
      Body: PutFreelancerEducationBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateEducationFreelancer-> update education freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.putFreelancerEducation(
        request.params.freelancer_id,
        request.params.education_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in education add: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "EDUCATION_NOT_FOUND" ||
        error.message.includes("Freelancer education not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Education"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @DELETE(FREELANCER_DELETE_EDUCATION_BY_ID, { schema: deleteEducationSchema })
  async deleteEducationFreelancer(
    request: FastifyRequest<{ Params: DeleteFreelancerEducationPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteEducationFreelancer -> Deleting education using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.deleteFreelancerEducation(
        request.params.freelancer_id,
        request.params.education_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Education deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteEducationFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "EDUCATION_NOT_FOUND" ||
        error.message.includes("Freelancer education not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Education"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @POST(FREELANCER_PROJECT_ID_ENDPOINT, { schema: createProjectSchema })
  async createProject(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
      Body: CreateFreelancerProjectBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> createProject -> Create project using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.createFreelancerProject(
        request.params.freelancer_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateProject: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(FREELANCER_UPDATE_PROJECT_BY_ID, { schema: updateProjectSchema })
  async updateProjectFreelancer(
    request: FastifyRequest<{
      Params: PutProjectPathParams;
      Body: PutFreelancerProjectBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> updateProjectFreelancer-> update project freelancer using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.putFreelancerProject(
        request.params.freelancer_id,
        request.params.project_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in project update: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "PROJECT_NOT_FOUND" ||
        error.message.includes("Freelancer project not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @DELETE(FREELANCER_PROJECT_DELETE_BY_ID, {
    schema: deleteFreelancerProjectSchema,
  })
  async deleteProjectById(
    request: FastifyRequest<{ Params: DeleteFreelancerProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteProjectById -> Deleting project using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.deleteFreelancerProject(
        request.params.freelancer_id,
        request.params.project_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Project deleted" });
    } catch (error: any) {
      this.logger.error(`Error in deleteProjectFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found.",
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else if (
        error.ERROR_CODES === "FREELANCER_PROJECT_NOT_FOUND" ||
        error.message.includes("Freelancer project not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
