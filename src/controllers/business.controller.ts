import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST, PUT } from "fastify-decorators";
import { AuthController } from "../common/auth.controller";
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants";
import {
  ALL_BUSINESS_END_POINT,
  ALL_PROJECT_ENDPOINT,
  BUSINESS_END_POINT,
  BUSINESS_ID_END_POINT,
  BUSINESS_UPDATE_END_POINT,
  CREATE_BUSINESS_PROJECT_END_POINT,
  DELETE_BUSINESS_PROJECT_END_POINT,
  DELETE_PROJECT_PROFILE_BY_ID,
  GET_ALL_BUSINESS_PROJECT_END_POINT,
  GET_BUSINESS_PROJECT_BY_ID,
  GET_BUSINESS_SINGLE_PROJECT_BY_ID,
  GET_BUSINESS_SINGLE_PROJECT_PROFILE_BY_ID,
  UPDATE_BUSINESS_PROJECT_PROFILE_BY_ID,
  GET_PROJECT_AND_BIDS_DATA_BY_PROJECT_ID,
  GET_BUSINESS_SINGLE_PROJECT_BY_ID_WITH_OUT_CHECK,
} from "../constants/business.constant";
import {
  getBusinessProjectSchema,
  getBusinessSchema,
} from "../schema/v1/business/business.get";
import { updateBusinessSchema } from "../schema/v1/business/business.update";
import { BusinessService } from "../services";
import { GetBusinessPathParams } from "../types/v1/business/getBusiness";
import {
  PutBusinessBody,
  PutBusinessPathParams,
} from "../types/v1/business/updateBusiness";
import { getProjectPathParams } from "../types/v1/project/postProject";
import { DeleteProjectPathParams } from "../types/v1/project/deleteProject";
import { IProject } from "../models/project.entity";
import {
  getAllProjectsSchema,
  getProjectSchema,
  getProjectsAndBidsSchema,
} from "../schema/v1/project/project.get";
import { createProjectSchema } from "../schema/v1/project/project.create";
import { deleteProjectSchema } from "../schema/v1/project/project.delete";
import { GetBusinessProjectQueryParams } from "../types/v1/business/getProjectStatus";
import { GetBusinessProjectForFreelancerPathParams } from "../types/v1/business/getBusinessProjectForFreelancer";
import { getProjectProfileByIdSchema } from "../schema/v1/projectProfile/profile.get";
import { GetProjectProfilePathParams } from "../types/v1/projectProfile/getProfile";
import { updateProjectProfileByIdSchema } from "../schema/v1/projectProfile/profile.update";
import {
  UpdateProjectProfileBody,
  UpdateProjectProfilePathParams,
} from "../types/v1/projectProfile/updateProfile";
import { deleteProjectProfileByIdSchema } from "../schema/v1/projectProfile/profile.delete";
import { DeleteProjectProfilePathParams } from "../types/v1/projectProfile/deleteProfile";

@Controller({ route: BUSINESS_END_POINT })
export default class BusinessController extends AuthController {
  @Inject(BusinessService)
  BusinessService!: BusinessService;

  @GET(BUSINESS_ID_END_POINT, { schema: getBusinessSchema })
  async getBusiness(
    request: FastifyRequest<{ Params: GetBusinessPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusiness -> Fetching Business profile for ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.getBusinessProfile(
        request.params.business_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error) {
      this.logger.info(error, "error in getBusiness");
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @PUT(BUSINESS_UPDATE_END_POINT, { schema: updateBusinessSchema })
  async updateBusinessProfile(
    request: FastifyRequest<{
      Params: PutBusinessPathParams;
      Body: PutBusinessBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> updateBusiness -> updating Business profile for ID: ${request.params.business_id}`,
      );

      const data = await this.BusinessService.updateBusiness(
        request.params.business_id,
        request.body,
      );
      if (!data) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }
    } catch (error) {
      this.logger.info(error, "error in PutBusinessProfile ");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(ALL_BUSINESS_END_POINT, { schema: getBusinessSchema })
  async getAllBusinessData(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(
        `BusinessController -> getBusinessData -> Fetching business profiles`,
      );

      const data = await this.BusinessService.getAllBusinessInfo();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      console.log("DATA:", data);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllBusiness: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(GET_ALL_BUSINESS_PROJECT_END_POINT, { schema: getProjectSchema })
  async getAllProjectBusiness(
    request: FastifyRequest<{
      Params: GetBusinessProjectForFreelancerPathParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { location, jobType, domain, skills } = request.query as {
        location: string;
        jobType: string;
        domain: string;
        skills: string;
      };

      // Split comma-separated values into arrays
      const locationArray = location ? location.split(",") : [];
      const jobTypeArray = jobType ? jobType.split(",") : [];
      const domainArray = domain ? domain.split(",") : [];
      const skillsArray = skills ? skills.split(",") : [];

      this.logger.info(
        `BusinessController -> getAllProjectBusiness -> Fetching Business all projects with filters: Location: ${locationArray}, Job Type: ${jobTypeArray}, Domain: ${domainArray}, Skills: ${skillsArray}`,
      );

      const data = await this.BusinessService.getAllProjectsData(
        {
          location: locationArray,
          jobType: jobTypeArray,
          domain: domainArray,
          skills: skillsArray,
        },
        request.params.freelancer_id,
      );

      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      this.logger.error(error, "error in getAllProjectBusiness");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @POST(CREATE_BUSINESS_PROJECT_END_POINT, { schema: createProjectSchema })
  async createBusinessProject(
    request: FastifyRequest<{ Params: getProjectPathParams; Body: IProject }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`BusinessController -> create business project`);
      const data = await this.BusinessService.createBusinessProject(
        request.params.business_id,
        request.body,
      );
      if (!data) {
        return reply.status(STATUS_CODES.NO_CONTENT).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.INVALID_DATA,
        });
      }
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getBusiness: ${error.message}`);
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
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

  @DELETE(DELETE_BUSINESS_PROJECT_END_POINT, { schema: deleteProjectSchema })
  async deleteBusinessProject(
    request: FastifyRequest<{ Params: DeleteProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> Delete ProjectBusiness -> Deleting Business All Project `,
      );

      const data = await this.BusinessService.deleteBusinessProject(
        request.params.project_id,
      );
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      this.logger.info(error, "error in Delete Business Project");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @GET(GET_BUSINESS_PROJECT_BY_ID, { schema: getBusinessProjectSchema })
  async getProjectById(
    request: FastifyRequest<{
      Params: GetBusinessPathParams;
      Querystring: GetBusinessProjectQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusinessProjects -> Fetching business projects for ID: ${request.params.business_id}`,
      );

      const { business_id } = request.params;
      const { status } = request.query;

      const data = await this.BusinessService.getBusinessProjectsById(
        business_id,
        status,
      );

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getBusiness: ${error.message}`);
      if (
        error.ERROR_CODES === "BUSINESS_NOT_FOUND" ||
        error.message.includes("Business with provided ID could not be found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
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
  @GET(GET_BUSINESS_SINGLE_PROJECT_BY_ID, { schema: getProjectSchema })
  async getSingleProjectWithVerify(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusinessSingleProjects -> Fetching business projects for ID: ${request.params.project_id}`,
      );
      const data =
        await this.BusinessService.getSingleProjectByIdWithVerification(
          request.params.project_id,
          request.params.freelancer_id,
        );
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getBusinessSingleProject: ${error.message}`);
      if (
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

  @GET(GET_BUSINESS_SINGLE_PROJECT_BY_ID_WITH_OUT_CHECK, {
    schema: getProjectSchema,
  })
  async getSingleProjectById(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getBusinessSingleProjects -> Fetching business projects for ID: ${request.params.project_id}`,
      );
      const data = await this.BusinessService.getSingleProjectById(
        request.params.project_id,
      );
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getBusinessSingleProject: ${error.message}`);
      if (
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

  @GET(ALL_PROJECT_ENDPOINT, { schema: getAllProjectsSchema })
  async getAllroject(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(
        `BusinessController -> getAllProject -> Fetching all projects`,
      );

      const data = await this.BusinessService.getAllProject();

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllroject: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
  @GET(GET_BUSINESS_SINGLE_PROJECT_PROFILE_BY_ID, {
    schema: getProjectProfileByIdSchema,
  })
  async getProjectProfileById(
    request: FastifyRequest<{ Params: GetProjectProfilePathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `Fetching project profile with ID ${request.params.profile_id}`,
      );

      const data = await this.BusinessService.getProjectProfileById(
        request.params.project_id,
        request.params.profile_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Profile"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error fetching profile: ${error.message}`);
      if (
        error.code === ERROR_CODES.NOT_FOUND ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
  @PUT(UPDATE_BUSINESS_PROJECT_PROFILE_BY_ID, {
    schema: updateProjectProfileByIdSchema,
  })
  async updateProjectProfileById(
    request: FastifyRequest<{
      Params: UpdateProjectProfilePathParams;
      Body: UpdateProjectProfileBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `Updating project profile with ID ${request.params.profile_id}`,
      );

      const data = await this.BusinessService.updateProjectProfileById(
        request.params.project_id,
        request.params.profile_id,
        request.body,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Profile"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ message: "update sucessfull" });
    } catch (error: any) {
      this.logger.error(`Error updating profile: ${error.message}`);
      if (
        error.code === ERROR_CODES.NOT_FOUND ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Profile by provided ID was not found.")
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
  @DELETE(DELETE_PROJECT_PROFILE_BY_ID, {
    schema: deleteProjectProfileByIdSchema,
  })
  async deleteProjectProfileById(
    request: FastifyRequest<{ Params: DeleteProjectProfilePathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `Deleting project profile with ID ${request.params.profile_id}`,
      );

      const deleted = await this.BusinessService.deleteProjectProfileById(
        request.params.project_id,
        request.params.profile_id,
      );

      if (!deleted) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Profile"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({
        message: "Profile deleted",
      });
    } catch (error: any) {
      this.logger.error(`Error deleting profile: ${error.message}`);
      if (
        error.code === ERROR_CODES.NOT_FOUND ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
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
      } else if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Profile by provided ID was not found.")
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

  @GET(GET_PROJECT_AND_BIDS_DATA_BY_PROJECT_ID, {
    schema: getProjectsAndBidsSchema,
  })
  async getProjectAndBidsDataByProjectId(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `BusinessController -> getProjectAndBidsDataByProjectId -> Fetching project and bids data for project ID: ${request.params.project_id}`,
      );

      const data = await this.BusinessService.getProjectAndBidsData(
        request.params.project_id,
      );

      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(
        `Error in getProjectAndBidsDataByProjectId: ${error.message}`,
      );
      console.log("Error codes->>>>>>>>>>>>>", error.ERROR_CODES);
      if (
        error.ERROR_CODES === "PROJECT_NOT_FOUND" ||
        error.message.includes("Project not found")
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
