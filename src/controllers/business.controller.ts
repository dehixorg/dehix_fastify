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
  GET_ALL_BUSINESS_PROJECT_END_POINT,
  GET_BUSINESS_PROJECT_BY_ID,
  GET_BUSINESS_SINGLE_PROJECT_BY_ID,
  GET_PROJECT_AND_BIDS_DATA_BY_PROJECT_ID,
  GET_BUSINESS_SINGLE_PROJECT_BY_ID_WITH_OUT_CHECK,
  UPDATE_STATUS_BY_PROJECT_ID,
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
import { updateProjectStatusSchema } from "../schema/v1/project/project.update";
import {
  PutProjectBody,
  PutProjectPathParams,
} from "../types/v1/project/updateProject";

// Define the controller with the main business endpoint
@Controller({ route: BUSINESS_END_POINT })
export default class BusinessController extends AuthController {
  // Inject BusinessService to handle business-related logic
  @Inject(BusinessService)
  BusinessService!: BusinessService;

  // Handler to get a business profile by its ID
  @GET(BUSINESS_ID_END_POINT, { schema: getBusinessSchema })
  async getBusiness(
    request: FastifyRequest<{ Params: GetBusinessPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch the business profile
      this.logger.info(
        `BusinessController -> getBusiness -> Fetching Business profile for ID: ${request.params.business_id}`,
      );

      // Fetch the business profile using the provided ID
      const data = await this.BusinessService.getBusinessProfile(
        request.params.business_id,
      );

      // Return a 404 error if no business profile is found
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      // Send the business profile data if found
      reply.status(STATUS_CODES.SUCCESS).send({ ...data._doc });
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.info(error, "error in getBusiness");
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to update a business profile by its ID
  @PUT(BUSINESS_UPDATE_END_POINT, { schema: updateBusinessSchema })
  async updateBusinessProfile(
    request: FastifyRequest<{
      Params: PutBusinessPathParams;
      Body: PutBusinessBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to update the business profile
      this.logger.info(
        `BusinessController -> updateBusiness -> updating Business profile for ID: ${request.params.business_id}`,
      );

      // Update the business profile using the provided ID and request body
      const data = await this.BusinessService.updateBusiness(
        request.params.business_id,
        request.body,
      );

      // Return a 400 error if the update fails
      if (!data) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.info(error, "error in PutBusinessProfile ");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to get all business profiles
  @GET(ALL_BUSINESS_END_POINT, { schema: getBusinessSchema })
  async getAllBusinessData(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Log the attempt to fetch all business profiles
      this.logger.info(
        `BusinessController -> getBusinessData -> Fetching business profiles`,
      );

      // Fetch all business profiles
      const data = await this.BusinessService.getAllBusinessInfo();

      // Return a 404 error if no profiles are found
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Business"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }
      console.log("DATA:", data);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log any errors encountered during the request
      this.logger.error(`Error in getAllBusiness: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to get all business projects with filters
  @GET(GET_ALL_BUSINESS_PROJECT_END_POINT, { schema: getProjectSchema })
  async getAllProjectBusiness(
    request: FastifyRequest<{
      Params: GetBusinessProjectForFreelancerPathParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      // Extract query parameters for filtering
      const { location, jobType, domain, skills, projectDomain } =
        request.query as {
          location: string;
          jobType: string;
          domain: string;
          skills: string;
          projectDomain: string;
        };

      // Split comma-separated values into arrays
      const locationArray = location ? location.split(",") : [];
      const jobTypeArray = jobType ? jobType.split(",") : [];
      const domainArray = domain ? domain.split(",") : [];
      const skillsArray = skills ? skills.split(",") : [];
      const projectDomainArray = projectDomain ? projectDomain.split(",") : [];

      // Log the filtering criteria
      this.logger.info(
        `BusinessController -> getAllProjectBusiness -> Fetching Business all projects with filters: Location: ${locationArray}, Job Type: ${jobTypeArray}, Domain: ${domainArray}, Skills: ${skillsArray}, ProjectDomain: ${projectDomainArray}`,
      );

      // Extract pagination details
      const { page, limit } = request.query as {
        page: string;
        limit: string;
      };

      // Fetch the filtered project data
      const data = await this.BusinessService.getAllProjectsData(
        {
          location: locationArray,
          jobType: jobTypeArray,
          domain: domainArray,
          skills: skillsArray,
          projectDomain: projectDomainArray,
        },
        request.params.freelancer_id,
        page,
        limit,
      );

      // Return the fetched data
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.error(error, "error in getAllProjectBusiness");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to create a new business project
  @POST(CREATE_BUSINESS_PROJECT_END_POINT, { schema: createProjectSchema })
  async createBusinessProject(
    request: FastifyRequest<{ Params: getProjectPathParams; Body: IProject }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to create a new project
      this.logger.info(`BusinessController -> create business project`);

      // Create a new project for the business
      const data = await this.BusinessService.createBusinessProject(
        request.params.business_id,
        request.body,
      );

      // Return a 204 error if the data is invalid
      if (!data) {
        return reply.status(STATUS_CODES.NO_CONTENT).send({
          message: RESPONSE_MESSAGE.REQUEST_DATA_INVALID,
          code: ERROR_CODES.INVALID_DATA,
        });
      }

      // Return the newly created project data
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log and handle different types of errors
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

  // Handler to delete a business project by its ID
  @DELETE(DELETE_BUSINESS_PROJECT_END_POINT, { schema: deleteProjectSchema })
  async deleteBusinessProject(
    request: FastifyRequest<{ Params: DeleteProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to delete the project
      this.logger.info(
        `BusinessController -> Delete ProjectBusiness -> Deleting Business All Project `,
      );

      // Delete the project by ID
      const data = await this.BusinessService.deleteBusinessProject(
        request.params.project_id,
      );

      // Return the deleted project data
      return reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error) {
      // Log any errors encountered during the request
      this.logger.info(error, "error in Delete Business Project");
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // Handler to get business project data by business ID and project status
  @GET(GET_BUSINESS_PROJECT_BY_ID, { schema: getBusinessProjectSchema })
  async getProjectById(
    request: FastifyRequest<{
      Params: GetBusinessPathParams;
      Querystring: GetBusinessProjectQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch projects for a business by ID
      this.logger.info(
        `BusinessController -> getBusinessProjects -> Fetching business projects for ID: ${request.params.business_id}`,
      );

      const { business_id } = request.params;
      const { status } = request.query;

      // Fetch the business project by its ID and status
      const data = await this.BusinessService.getBusinessProjectsById(
        business_id,
        status,
      );

      // Send the project data
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log and handle different types of errors
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

  // Handler to fetch a single business project for a freelancer by project ID
  @GET(GET_BUSINESS_SINGLE_PROJECT_BY_ID, { schema: getProjectSchema })
  async getSingleProjectForFreelancer(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch a single project for a freelancer
      this.logger.info(
        `BusinessController -> getBusinessSingleProjects -> Fetching business projects for ID: ${request.params.project_id}`,
      );

      // Fetch the single project by project ID
      const data =
        await this.BusinessService.getSingleProjectByIdWithVerification(
          request.params.project_id,
          request.params.freelancer_id,
        );

      // Send the project data
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log and handle different types of errors
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
  // Handler to get a single project by its ID without verification checks
  async getSingleProjectById(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch a project by its ID
      this.logger.info(
        `BusinessController -> getBusinessSingleProjects -> Fetching business projects for ID: ${request.params.project_id}`,
      );

      // Fetch the project data by ID from the service layer
      const data = await this.BusinessService.getSingleProjectById(
        request.params.project_id,
      );

      // Return the project data if found
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log the error if something goes wrong
      this.logger.error(`Error in getBusinessSingleProject: ${error.message}`);

      // Handle specific error cases, like project not being found
      if (
        error.ERROR_CODES === "PROJECT_NOT_FOUND" ||
        error.message.includes("Project by provided ID was not found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        // For any other errors, respond with a server error
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(ALL_PROJECT_ENDPOINT, { schema: getAllProjectsSchema })
  // Handler to get all projects
  async getAllroject(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Log the attempt to fetch all projects
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
      // Log any errors that occur during the request
      this.logger.error(`Error in getAllroject: ${error.message}`);

      // Handle specific cases, such as no data being found
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        // Return a server error for any other issues
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
  // Handler to fetch project and related bid data by project ID
  async getProjectAndBidsDataByProjectId(
    request: FastifyRequest<{ Params: getProjectPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to fetch project and bids data
      this.logger.info(
        `BusinessController -> getProjectAndBidsDataByProjectId -> Fetching project and bids data for project ID: ${request.params.project_id}`,
      );

      // Fetch the project and bids data by project ID
      const data = await this.BusinessService.getProjectAndBidsData(
        request.params.project_id,
      );

      // If no data is found, return a not found error
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      // Return the project and bids data
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      // Log any errors encountered
      this.logger.error(
        `Error in getProjectAndBidsDataByProjectId: ${error.message}`,
      );
      console.log("Error codes->>>>>>>>>>>>>", error.ERROR_CODES);

      // Handle specific cases where the project is not found
      if (
        error.ERROR_CODES === "PROJECT_NOT_FOUND" ||
        error.message.includes("Project not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        // Return a server error for any other issues
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @PUT(UPDATE_STATUS_BY_PROJECT_ID, {
    schema: updateProjectStatusSchema,
  })
  // Handler to update the status of a project by its ID
  async updateStatusByProject_Id(
    request: FastifyRequest<{
      Params: PutProjectPathParams;
      Body: PutProjectBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      // Log the attempt to update project status
      this.logger.info(
        `Updating status with Project_ID ${request.params.project_id}`,
      );

      // Update the project status by project ID and status body
      const data = await this.BusinessService.updateProjectStatusByProjectID(
        request.params.project_id,
        request.body.status,
      );

      // If the project is not found, return a not found error
      if (!data) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Profile"),
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ message: "update sucessfull" });
    } catch (error: any) {
      // Log any errors encountered during the update
      this.logger.error(`Error updating Status: ${error.message}`);

      // Handle specific cases such as data or project not being found
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
        error.message.includes("Project by provided ID was not found.")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Project"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        // Return a server error for any other issues
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
