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
  CreateDehixTalentBody,
  CreateFreelancerEducationBody,
  CreateFreelancerExperienceBody,
  CreateFreelancerProjectBody,
  GetFreelancerPathParams,
} from "../types/v1";
import {
  FREELANCER_ENDPOINT,
  FREELANCER_ID_ENDPOINT,
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
  ALL_FREELANCER,
  FREELANCER_DOMAIN_ADD_BY_ID,
  FREELANCER_DOMAIN_DELETE_BY_ID,
  FREELANCER_OWN_PROJECT_ID_ENDPOINT,
  FREELANCER_SKILLS_ENDPOINT,
  FREELANCER_DOMAIN_ENDPOINT,
  FREELANCER_DEHIX_TALENT_ADD_BY_ID,
  FREELANCER_DEHIX_TALENT_DELETE_BY_ID,
} from "../constants/freelancer.constant";
import {
  getFreelancerDomainSchema,
  getFreelancerOwnProjectSchema,
  getFreelancerProjectSchema,
  getFreelancerSchema,
  getFreelancerSkillsSchema,
} from "../schema/v1/freelancer/get";
import { AuthController } from "../common/auth.controller";
import {
  addFreelancerDomainSchema,
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
  PutFreelancerDomainBody,
} from "../types/v1/freelancer/updateProfile";
import {
  deleteDehixTalentFreelancerSchema,
  deleteEducationSchema,
  deleteFreelancerDomainSchema,
  deleteFreelancerProjectSchema,
  deleteFreelancerSkillSchema,
  deleteProfessionalInfoSchema,
} from "../schema/v1/freelancer/delete";
import {
  DeleteFreelancerDehixTalentPathParams,
  DeleteFreelancerDomainPathParams,
  DeleteFreelancerEducationPathParams,
  DeleteFreelancerExperiencePathParams,
  DeleteFreelancerProjectPathParams,
  DeleteFreelancerSkillPathParams,
} from "../types/v1/freelancer/delete";
import { PutFreelancerProjectBody } from "../types/v1/freelancer/updateProject";

import { addFreelancerSkillsSchema } from "../schema/v1/freelancer/update";
import { IFreelancer } from "../models/freelancer.entity";
import {
  createDehixTalentSchema,
  createEducationSchema,
  createProfessionalInfoSchema,
  createProjectSchema,
} from "../schema/v1/freelancer/create";
import { GetFreelancerProjectQueryParams } from "../types/v1/freelancer/getProject";

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
        error.message.includes("Project by provided ID was not found.")
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
        error.message.includes("Project by provided ID was not found.")
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

  @GET(ALL_FREELANCER, { schema: getFreelancerSchema })
  async getAllFreelancer(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { experience, jobType, domain, skills } = request.query as {
        experience: string;
        jobType: string;
        domain: string;
        skills: string;
      };

      // Split comma-separated values into arrays
      const experienceArray = experience ? experience.split(",") : [];
      const jobTypeArray = jobType ? jobType.split(",") : [];
      const domainArray = domain ? domain.split(",") : [];
      const skillsArray = skills ? skills.split(",") : [];

      this.logger.info(
        `FreelancerController -> getAllFreelancer -> Fetching freelancers with filters: Experiance: ${experienceArray}, Job Type: ${jobTypeArray}, Domain: ${domainArray}, Skills: ${skillsArray}`,
      );

      const data = await this.freelancerService.getAllFreelancer({
        experience: experienceArray,
        jobType: jobTypeArray,
        domain: domainArray,
        skills: skillsArray,
      });

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancers"),
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

  @PUT(FREELANCER_DOMAIN_ADD_BY_ID, { schema: addFreelancerDomainSchema })
  async addDomainById(
    request: FastifyRequest<{
      Params: PutFreelancerPathParams;
      Body: PutFreelancerDomainBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> addDomainById -> Adding domain for freelancer using ID: ${request.params.freelancer_id}`,
      );

      const updatedFreelancer =
        await this.freelancerService.addFreelancerDomain(
          request.params.freelancer_id,
          request.body.domain,
        );

      reply.status(STATUS_CODES.SUCCESS).send({ data: updatedFreelancer });
    } catch (error: any) {
      this.logger.error(`Error in addDomainById: ${error.message}`);

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

  @DELETE(FREELANCER_DOMAIN_DELETE_BY_ID, {
    schema: deleteFreelancerDomainSchema,
  })
  async deleteDomainById(
    request: FastifyRequest<{ Params: DeleteFreelancerDomainPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteDomainById -> Deleting domain using: ${request.params}`,
      );
      const data = await this.freelancerService.deleteFreelancerDomain(
        request.params.freelancer_id,
        request.params.domain_id,
      );

      if (data.modifiedCount == 0) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Domain"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in deleteDomainById: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @GET(FREELANCER_OWN_PROJECT_ID_ENDPOINT, {
    schema: getFreelancerOwnProjectSchema,
  })
  async getFreelancerOwnProjects(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerOwnProjects -> Fetching freelancer own projects for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerOwnProjects(
        request.params.freelancer_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancerOwnProjects: ${error.message}`);
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

  @GET(FREELANCER_SKILLS_ENDPOINT, { schema: getFreelancerSkillsSchema })
  async getFreelancerSkills(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerSkills -> Fetching freelancer skills for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerSkills(
        request.params.freelancer_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancerSkills: ${error.message}`);
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

  @GET(FREELANCER_DOMAIN_ENDPOINT, { schema: getFreelancerDomainSchema })
  async getFreelancerDomains(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerDomain -> Fetching freelancer domains for ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.getFreelancerDomains(
        request.params.freelancer_id,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getFreelancerDomains: ${error.message}`);
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

  @POST(FREELANCER_DEHIX_TALENT_ADD_BY_ID, {
    schema: createDehixTalentSchema,
  })
  async createDehixTalent(
    request: FastifyRequest<{
      Params: GetFreelancerPathParams;
      Body: CreateDehixTalentBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> createDehixTalent -> Create Dehix Talent using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.createFreelancerDehixTalent(
        request.params.freelancer_id,
        request.body,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(
        `Error in createFreelancerDehixTalent: ${error.message}`,
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

  @DELETE(FREELANCER_DEHIX_TALENT_DELETE_BY_ID, {
    schema: deleteDehixTalentFreelancerSchema,
  })
  async deleteDehixTalentFreelancer(
    request: FastifyRequest<{ Params: DeleteFreelancerDehixTalentPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FreelancerController -> deleteDehixTalentFreelancer -> Deleting dehixTalent using ID: ${request.params.freelancer_id}`,
      );

      const data = await this.freelancerService.deleteFreelancerDehixTalent(
        request.params.freelancer_id,
        request.params.dehixTalent_id,
      );

      reply
        .status(STATUS_CODES.SUCCESS)
        .send({ message: "dehixTalent deleted" });
    } catch (error: any) {
      this.logger.error(
        `Error in deleteDehixTalentFreelancer: ${error.message}`,
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
        error.ERROR_CODES === "DEHIX_TALENT_NOT_FOUND" ||
        error.message.includes("Dehix Talent not found by id")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Dehix Talent"),
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
