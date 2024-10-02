import { Service, Inject } from "fastify-decorators";

// import pkg from "jsonwebtoken";
// const {
//   sign: jwtSign,
//   verify: jwtVerify,
//   TokenExpiredError,
//   JsonWebTokenError,
// } = pkg;

import { BaseService } from "../common/base.service";
import { ConflictError, NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO } from "../dao/freelancer.dao";
import { firebaseClient } from "../common/services";
import { SESService } from "../common/services";
import { ProjectDAO } from "../dao/project.dao";
import { VerificationService } from "./verifications.service";
import { handleFileUpload } from "../common/services/s3.service";


@Service()
export class FreelancerService extends BaseService {
  @Inject(FreelancerDAO)
  private FreelancerDAO!: FreelancerDAO;

  @Inject(ProjectDAO)
  private ProjectDAO!: ProjectDAO;

  @Inject(SESService)
  private sesService!: SESService;

  @Inject(VerificationService)
  private VerificationService!: VerificationService;

  async getAllFreelancer(
    filters: {
      experience?: string[];
      jobType?: string[];
      domain?: string[];
      skills?: string[];
    },
    page: string,
    limit: string,
  ) {
    const { experience, jobType, domain, skills } = filters;

    this.logger.info(
      `FreelancerService: Fetching all freelancers with filters - Experience: ${experience}, Job Type: ${jobType}, Domain: ${domain}, Skills: ${skills}`,
    );

    const data = await this.FreelancerDAO.findAllFreelancers(
      {
        experience,
        jobType,
        domain,
        skills,
      },
      page,
      limit,
    );

    return data;
  }
  async deleteFreelancerSkill(freelancer_id: string, skill_id: string) {
    this.logger.info(
      `FreelancerService: deleteFreelancerSkill: Deleting skill for Freelancer ID:${freelancer_id} and Skill ID:${skill_id}`,
    );
    const freelancerExist = await this.FreelancerDAO.getById(freelancer_id);
    if (!freelancerExist) {
      this.logger.error(
        "FreelancerService: getFreelancerProfile: Freelancer not found with ID: ",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const checkSkill = await this.FreelancerDAO.findSkillExistInFreelancer(
      freelancer_id,
      skill_id,
    );
    if (!checkSkill) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const delete_skill = await this.FreelancerDAO.updateFreelancer(
      { _id: freelancer_id },
      { $pull: { skills: { _id: skill_id } } },
    );

    return delete_skill;
  }

  async getFreelancerProfile(freelancer_id: string) {
    this.logger.info(
      "FreelancerService: getFreelancerProfile: Fetching FREELANCER profile for ID: ",
      freelancer_id,
    );

    const freelancer: any =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);

    if (!freelancer) {
      this.logger.error(
        "FreelancerService: getFreelancerProfile: Freelancer not found with ID: ",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return freelancer;
  }

  async createFreelancerProfile(freelancer: any) {
    try {
      this.logger.info(
        "FreelancerService: createFreelancerProfile: Creating Freelancer: ",
        freelancer,
      );
      const freelancer_id =
        await firebaseClient.createFireBaseUserWithCustomClaims(
          freelancer.email,
          freelancer.password,
          { type: "freelancer" },
          freelancer.phone,
        );
      freelancer._id = freelancer_id;
      //uncomment when SES is up
      // const { SENDER, SUBJECT, TEXTBODY } = CREATE_PASSWORD_EMAIL_CONSTANTS;
      // await this.sesService.sendEmail({
      //   sender: SENDER!,
      //   recipient: [freelancer.email],
      //   subject: SUBJECT,
      //   textBody: TEXTBODY.replace(":passLink", reset_link),
      // });
      const userObj = { ...freelancer, password: "" };
      const data: any = await this.FreelancerDAO.createFreelancer(userObj);
      if (data.description && data.description.length > 500) {
        throw new Error("Description cannot exceed 500 characters.");
      }

      return data;
    } catch (error: any) {
      if (freelancer._id) {
        try {
          await firebaseClient.deleteFireBaseUser(freelancer._id);
          this.logger.info(
            `Rolled back Firebase user creation for ID: ${freelancer._id}`,
          );
        } catch (rollbackError) {
          this.logger.error(
            `Error rolling back Firebase user creation: ${rollbackError}`,
          );
        }
      }
      if (error.code === "USER_ALREADY_EXISTS") {
        throw new ConflictError(
          RESPONSE_MESSAGE.USER_EXISTS,
          ERROR_CODES.USER_ALREADY_EXIST,
        );
      } else {
        this.logger.error("Error in createFreelancer:", error);
        throw error; // Pass the error to the parent for proper handling
      }
    }
  }

  async addFreelancerSkills(freelancer_id: string, skills: string[]) {
    this.logger.info(
      `FreelancerService -> addFreelancerSkills -> Adding skills for freelancer ID: ${freelancer_id}`,
    );

    const freelancerExist = await this.FreelancerDAO.getById(freelancer_id);
    if (!freelancerExist) {
      this.logger.error(
        "FreelancerService: getFreelancerProfile: Freelancer not found with ID: ",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const { skillIds, skillsWithId: addSkills } =
      await this.FreelancerDAO.addFreelancerSkill(freelancer_id, skills);

    console.log(skillIds);

    await Promise.all(
      skillIds.map((skillId) =>
        this.VerificationService.requestVerification(
          skillId,
          "skill",
          freelancer_id,
        ),
      ),
    );

    return {
      addSkills,
      freelancer_id,
    };
  }

  async updateProfileFreelancer(
    freelancer_id: string,
    freelancer: any,
    file: any,
    filename: any,
  ) {
    this.logger.info(
      "FreelancerService: updateProfileFreelancer: Updating Freelancer: ",
      freelancer_id,
      freelancer,
    );

    let s3Result: any = null;

    if (file) {
      s3Result = await handleFileUpload(file, filename);
      freelancer.profilePicture = {
        key: s3Result.Key,
        fileFormat: filename,
      };
    }

    if (freelancer.description && freelancer.description.length > 500) {
      throw new Error("Description cannot exceed 500 characters.");
    }

    const updatedFreelancer = await this.FreelancerDAO.updateFreelancer(
      { _id: freelancer_id },
      freelancer,
    );

    //  if (updatedFreelancer && updatedFreelancer.description && updatedFreelancer.description.length > 500) {
    //   throw new Error("Description cannot exceed 500 characters.");
    // }

    return updatedFreelancer;
  }
  
  async updateFreelancerOracleStatus(
    freelancer_id: string,
    oracle_status: string,
  ) {
    this.logger.info(
      "FreelancerService: updateFreelancerOracleStatus: Updating Freelancer Oracle Status: ",
      freelancer_id,
      oracle_status,
    );

    const data: any = await this.FreelancerDAO.updateOracleStatusById(
      freelancer_id,
      oracle_status,
    );

    return data;
  }

  async freelancerInterviewsAligned(
    freelancer_id: string,
    interviews_aligned: string[],
  ) {
    this.logger.info(
      "FreelancerService: freelancerInterviewsAligned: Freelancer Interviews aligned: ",
      freelancer_id,
      interviews_aligned,
    );

    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      this.logger.error(
        `FreelancerService: getFreelancerProfile: Freelancer not found with ID: ${freelancer_id} `,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data: any = await this.FreelancerDAO.interviewsAlignedById(
      freelancer_id,
      interviews_aligned,
    );

    return data;
  }

  async putFreelancerExperience(
    freelancer_id: string,
    experience_id: string,
    update: any,
  ) {
    this.logger.info(
      "FreelancerService: freelancer experience put ",
      freelancer_id,
    );
    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const experinceExist = await this.FreelancerDAO.getExperienceById(
      freelancer_id,
      experience_id,
    );
    if (!experinceExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.EXPERIENCE_NOT_FOUND,
        ERROR_CODES.EXPERIENCE_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.putExperienceById(
      freelancer_id,
      experience_id,
      update,
    );
    this.logger.info(data, "in update experience");
    return data;
  }

  async deleteFreelancerExperience(freelancerId: string, experienceId: string) {
    this.logger.info(
      "FreelancerService: deleteFreelancerExperience",
      freelancerId,
    );

    const userExist = await this.FreelancerDAO.findFreelancerById(freelancerId);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const experienceExist = await this.FreelancerDAO.getExperienceById(
      freelancerId,
      experienceId,
    );
    if (!experienceExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.EXPERIENCE_NOT_FOUND,
        ERROR_CODES.EXPERIENCE_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.deleteExperienceById(
      freelancerId,
      experienceId,
    );
    return data;
  }
  async createFreelancerExperience(freelancer_id: string, experienceData: any) {
    try {
      this.logger.info(
        "FreelancerService: create freelancer experience ",
        freelancer_id,
      );

      // Check if freelancer exists
      const userExist =
        await this.FreelancerDAO.findFreelancerById(freelancer_id);
      if (!userExist) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
          ERROR_CODES.FREELANCER_NOT_FOUND,
        );
      }

      // Create new experience entry
      const { experienceId, result: createdExperience } =
        await this.FreelancerDAO.addExperienceById(
          freelancer_id,
          experienceData,
        );

      await this.VerificationService.requestVerification(
        experienceId,
        "experience",
        freelancer_id,
      );
      return createdExperience;
    } catch (error: any) {
      throw new Error(
        `Failed to create freelancer experience: ${error.message}`,
      );
    }
  }

  async createFreelancerEducation(freelancer_id: string, educationData: any) {
    try {
      this.logger.info(
        "FreelancerService: create freelancer education ",
        freelancer_id,
      );

      // Check if freelancer exists
      const userExist =
        await this.FreelancerDAO.findFreelancerById(freelancer_id);
      if (!userExist) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
          ERROR_CODES.FREELANCER_NOT_FOUND,
        );
      }

      // Create new education entry
      const { educationId, result: createdEducation } =
        await this.FreelancerDAO.addEducationById(freelancer_id, educationData);

      await this.VerificationService.requestVerification(
        educationId,
        "education",
        freelancer_id,
      );
      return createdEducation;
    } catch (error: any) {
      throw new Error(
        `Failed to create freelancer education: ${error.message}`,
      );
    }
  }

  async putFreelancerEducation(
    freelancer_id: string,
    education_id: string,
    update: any,
  ) {
    this.logger.info(
      "FreelancerService: freelancer education put ",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const educationExist = await this.FreelancerDAO.getEducationById(
      freelancer_id,
      education_id,
    );
    if (!educationExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.EDUCATION_NOT_FOUND,
        ERROR_CODES.EDUCATION_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.putEducationById(
      freelancer_id,
      education_id,
      update,
    );
    this.logger.info(data, "in update education");
    return data;
  }

  async getFreelancerProjects(
    freelancer_id: string,
    status?: "Active" | "Pending" | "Completed" | "Rejected",
  ) {
    this.logger.info(
      "FreelancerService: freelancer get projects",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data = await this.ProjectDAO.getFreelancerProjects(
      freelancer_id,
      status,
    );
    this.logger.info(data, "in get freelancer projects");
    return data;
  }

  async deleteFreelancerEducation(freelancer_id: string, education_id: string) {
    this.logger.info(
      "FreelancerService: deleteFreelancerEducation",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const educationExist = await this.FreelancerDAO.getEducationById(
      freelancer_id,
      education_id,
    );
    if (!educationExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.EDUCATION_NOT_FOUND,
        ERROR_CODES.EDUCATION_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.deleteEducationById(
      freelancer_id,
      education_id,
    );
    return data;
  }

  async createFreelancerProject(freelancer_id: string, projectData: any) {
    try {
      this.logger.info(
        "FreelancerService: create freelancer project ",
        freelancer_id,
      );

      // Check if freelancer exists
      const userExist =
        await this.FreelancerDAO.findFreelancerById(freelancer_id);
      if (!userExist) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
          ERROR_CODES.FREELANCER_NOT_FOUND,
        );
      }

      // Create new project entry
      const { projectId, result: createdProject } =
        await this.FreelancerDAO.addProjectById(freelancer_id, projectData);

      await this.VerificationService.requestVerification(
        projectId,
        "project",
        freelancer_id,
      );
      return createdProject;
    } catch (error: any) {
      throw new Error(`Failed to create freelancer project: ${error.message}`);
    }
  }

  async putFreelancerProject(
    freelancer_id: string,
    project_id: string,
    update: any,
  ) {
    this.logger.info(
      "FreelancerService: freelancer project put ",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const projectExist = await this.FreelancerDAO.getProjectById(
      freelancer_id,
      project_id,
    );
    if (!projectExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_PROJECT_NOT_FOUND,
        ERROR_CODES.FREELANCER_PROJECT_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.putProjectById(
      freelancer_id,
      project_id,
      update,
    );
    this.logger.info(data, "in update project");
    return data;
  }

  async deleteFreelancerProject(freelancer_id: string, project_id: string) {
    this.logger.info(
      `FreelancerService: deleteFreelancerProject: Deleting project using: Freelancer ID:${freelancer_id} and Project ID:${project_id}`,
    );
    const project_exist = this.FreelancerDAO.findProject(
      freelancer_id,
      project_id,
    );
    if (!project_exist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_PROJECT_NOT_FOUND,
        ERROR_CODES.FREELANCER_PROJECT_NOT_FOUND,
      );
    }
    const delete_project = this.FreelancerDAO.deleteProjectById(
      freelancer_id,
      project_id,
    );

    return delete_project;
  }

  async addFreelancerDomain(freelancer_id: string, domains: string[]) {
    this.logger.info(
      `FreelancerService -> addFreelancerDomain -> Adding domain for freelancer ID: ${freelancer_id}`,
    );

    const freelancerExist = await this.FreelancerDAO.getById(freelancer_id);
    if (!freelancerExist) {
      this.logger.error(
        "FreelancerService: getFreelancerProfile: Freelancer not found with ID: ",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const { domainIds, domainsWithId: addDomains } =
      await this.FreelancerDAO.addFreelancerDomain(freelancer_id, domains);

    console.log(domainIds);

    await Promise.all(
      domainIds.map((domainId) =>
        this.VerificationService.requestVerification(
          domainId,
          "domain",
          freelancer_id,
        ),
      ),
    );

    return {
      addDomains,
      freelancer_id,
    };
  }

  async deleteFreelancerDomain(freelancer_id: string, domain_id: string) {
    this.logger.info(
      `FreelancerService: deleteFreelancerDomain: Deleting domain for Freelancer ID:${freelancer_id} and Domain ID:${domain_id}`,
    );
    const freelancerExist = await this.FreelancerDAO.getById(freelancer_id);
    if (!freelancerExist) {
      this.logger.error(
        "FreelancerService: getFreelancerProfile: Freelancer not found with ID: ",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const checkDomain = await this.FreelancerDAO.findDomainExistInFreelancer(
      freelancer_id,
      domain_id,
    );
    if (!checkDomain) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const delete_domain = await this.FreelancerDAO.updateFreelancer(
      { _id: freelancer_id },
      { $pull: { domain: { _id: domain_id } } },
    );

    return delete_domain;
  }

  async getFreelancerOwnProjects(freelancer_id: string) {
    this.logger.info(
      "FreelancerService: freelancer get own projects",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data =
      await this.FreelancerDAO.getFreelancerOwnProjects(freelancer_id);
    this.logger.info(data, "in get freelancer projects");
    return data;
  }

  async getFreelancerSkills(freelancer_id: string) {
    this.logger.info("FreelancerService: freelancer get skills", freelancer_id);

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.getFreelancerSkills(freelancer_id);
    this.logger.info(data, "in get freelancer skills");
    return data;
  }

  async getFreelancerDomains(freelancer_id: string) {
    this.logger.info(
      "FreelancerService: freelancer get domains",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.getFreelancerDomains(freelancer_id);
    this.logger.info(data, "in get freelancer domains");
    return data;
  }

  async createFreelancerDehixTalent(
    freelancer_id: string,
    dehixTalentData: any,
  ) {
    try {
      this.logger.info(
        "FreelancerService: create freelancer dehix talent ",
        freelancer_id,
      );

      // Check if freelancer exists
      const userExist =
        await this.FreelancerDAO.findFreelancerById(freelancer_id);
      if (!userExist) {
        throw new NotFoundError(
          RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
          ERROR_CODES.FREELANCER_NOT_FOUND,
        );
      }

      // Create new dehix talent entry
      const createDehixTalent = await this.FreelancerDAO.addDehixTalentById(
        freelancer_id,
        dehixTalentData,
      );

      // Return the newly created talent data
      return createDehixTalent;
    } catch (error: any) {
      throw new Error(
        `Failed to create freelancer dehix talent: ${error.message}`,
      );
    }
  }

  async deleteFreelancerDehixTalent(
    freelancerId: string,
    dehixTalentId: string,
  ) {
    this.logger.info(
      "FreelancerService: deleteFreelancerDehixTalent",
      freelancerId,
    );

    const userExist = await this.FreelancerDAO.findFreelancerById(freelancerId);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const dehixTalentExist = await this.FreelancerDAO.getDehixTalentById(
      freelancerId,
      dehixTalentId,
    );
    if (!dehixTalentExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.DEHIX_TALENT_NOT_FOUND,
      );
    }

    const data = await this.FreelancerDAO.deleteDehixTalentById(
      freelancerId,
      dehixTalentId,
    );
    return data;
  }
  async createConsultant(freelancer_id: string, body: any) {
    this.logger.info("FreelancerService: createConsultant", freelancer_id);
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.addConsultant(freelancer_id, body);
    return data;
  }
  async updateConsultant(
    freelancer_id: string,
    consultant_id: string,
    update: any,
  ) {
    this.logger.info("FreelancerService: updateConsultant", freelancer_id);
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const consultantExist = await this.FreelancerDAO.getConsultantById(
      freelancer_id,
      consultant_id,
    );
    if (!consultantExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.CONSULTANT_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.updateConsultant(
      freelancer_id,
      consultant_id,
      update,
    );
    return data;
  }
  async getConsultantById(freelancer_id: string, consultant_id: string) {
    this.logger.info("FreelancerService:  getConsultantById", freelancer_id);
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.getConsultant(
      freelancer_id,
      consultant_id,
    );
    if (!data) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.CONSULTANT_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    return data;
  }

  async deleteConsultant(freelancer_id: string, consultant_id: string) {
    this.logger.info("FreelancerService: updateConsultant", freelancer_id);
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const consultantExist = await this.FreelancerDAO.getConsultantById(
      freelancer_id,
      consultant_id,
    );
    if (!consultantExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.CONSULTANT_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.deleteConsultant(
      freelancer_id,
      consultant_id,
    );
    return data;
  }
  async notInterestedProject(freelancer_id: string, project_id: string) {
    this.logger.info("services->freelancer.service->notInterestedProject");
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const projectExist = await this.ProjectDAO.getProjectById(project_id);
    if (!projectExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Project"),
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.updateNotInterestedProject(
      freelancer_id,
      project_id,
    );
    return data;
  }

  async getAllDehixTalent(limit: number, skip: number) {
    this.logger.info(
      "SkillsService: getAllDehixTalent: Fetching All dehix talent ",
    );

    const dehixTalent: any = await this.FreelancerDAO.getAllDehixTalent(
      limit,
      skip,
    );

    if (!dehixTalent || dehixTalent.length === 0) {
      this.logger.error(
        "FreelancerServices: getAllDehixTalent: Dehix talent not found ",
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.DEHIX_TALENT_NOT_FOUND,
      );
    }

    return dehixTalent;
  }

  async getFreelancerDehixTalent(freelancer_id: string) {
    this.logger.info(
      "FreelancerService: freelancer get dehix talent: ",
      freelancer_id,
    );

    const userExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!userExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    const data =
      await this.FreelancerDAO.getFreelancerDehixTalent(freelancer_id);
    this.logger.info(data, "in get freelancer projects");
    return data;
  }

  async updateDehixTalent(
    freelancer_id: string,
    dehixTalent_id: string,
    update: any,
  ) {
    this.logger.info("FreelancerService: updateDehixTalent", freelancer_id);
    const freelancerExist =
      await this.FreelancerDAO.findFreelancerById(freelancer_id);
    if (!freelancerExist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }
    const dehixTalent = await this.FreelancerDAO.getDehixTalentById(
      freelancer_id,
      dehixTalent_id,
    );
    if (!dehixTalent) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DEHIX_TALENT_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const data = await this.FreelancerDAO.updateDehixTalent(
      freelancer_id,
      dehixTalent_id,
      update,
    );
    return data;
  }
}
/**
 * Service method for FREELANCER login
 * @param body
 * @param em
 */
// async login(body: FreelancerLoginBody) {
//   const { email: workEmail, password } = body;
//   let FREELANCER: any = await this.freelancerDAO.findOneByEmail(workEmail);

//   if (!FREELANCER) {
//     throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
//   }

//   const passwordMatches = await bcrypt.compare(password, FREELANCER.password);
//   if (!passwordMatches) {
//     this.logger.error('FreelancerService: login : Password is incorrect');
//     throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
//   }

//   if (!FREELANCER.firebase_id) {
//     this.logger.error('FreelancerService: login : Freelancer is not verified');
//     throw new BadRequestError('Freelancer is not verified', ERROR_CODES.EMAIL_NOT_VERIFIED);
//   }

//   const [customToken] = await Promise.all([
//     firebaseClient.generateCustomToken(FREELANCER.firebase_id),
//     // this.userSubscriptionDAO.getSubscriptionByFreelancerId(FREELANCER.id),
//   ]);

//   return {
//     firebase_custom_token: customToken,
//     user_id: FREELANCER.id,
//     user_name: FREELANCER.full_name,
//     email: FREELANCER.email,
//     subscription: subscription?.entity_plan,
//   };
// }

// /**
//  * Service method to register a new FREELANCER
//  * @param body
//  * @param em
//  * @returns
//  */
// async register(body: FreelancerRegistrationBody) {
//   const { full_name: fullName, email: workEmail, password } = body;

//   let FREELANCER: any = await this.freelancerDAO.findOneByEmail(workEmail);

//   if (FREELANCER?.owner_id) {
//     this.logger.error('Staff members are not allowed to proceed');

//     throw new BadRequestError(
//       RESPONSE_MESSAGE.STAFF_REGISTERATION_NOT_ALLOWED,
//       ERROR_CODES.STAFF_REGISTERATION_NOT_ALLOWED,
//     );
//   } else if (FREELANCER?.is_email_verified) {
//     this.logger.error('Verified owners are not allowed to proceed');

//     throw new BadRequestError(RESPONSE_MESSAGE.VERIFIED_OWNERS_NOT_ALLOWED, ERROR_CODES.USER_ALREADY_REGISTERED);
//   }

//   if (!FREELANCER) {
//     const hashedPassword = await hashPassword(password);
//     FREELANCER = {
//       id: uuidv4(),
//       full_name: fullName,
//       email: workEmail,
//       password: hashedPassword,
//       is_email_verified: false
//     };

//     await this.freelancerDAO.create(this.freelancerDAO.model, FREELANCER)
//   }

//   const jwtToken = jwtSign({ id: FREELANCER!.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
//   const encryptedJwt = await encrypt(jwtToken, ENCRYPTION_SECRET_KEY);
//   const verificationLink = `${VERIFICATION_DOMAIN}?token=${encryptedJwt}`;

//   this.logger.info(`FreelancerService: register: id: ${FREELANCER!.id} and  Verification link: ${verificationLink}`);

//   const { SENDER, SUBJECT, TEXTBODY } = EMAIL_VERIFICATION_EMAIL_CONSTANTS;
//   await this.sesService.sendEmail({
//     sender: SENDER!,
//     recipient: [workEmail],
//     subject: SUBJECT,
//     textBody: TEXTBODY.replace(':verificationLink', verificationLink),
//   });

//   return verificationLink;
// }
// }
