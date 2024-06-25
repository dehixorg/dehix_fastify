import { Service, Inject } from "fastify-decorators";

// import pkg from "jsonwebtoken";
// const {
//   sign: jwtSign,
//   verify: jwtVerify,
//   TokenExpiredError,
//   JsonWebTokenError,
// } = pkg;

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO } from "../dao/freelancer.dao";
import { IFreelancer } from "../models/freelancer.entity";

@Service()
export class FreelancerService extends BaseService {
  @Inject(FreelancerDAO)
  private FreelancerDAO!: FreelancerDAO;

  async deleteFreelancerProject(freelancer_id: string, project_id: string) {
    this.logger.info(
      `FreelancerService: deleteFreelancerProject: Deleting project using: Freelancer ID:${freelancer_id} and Project ID:${project_id}`,
    );

    const delete_project = this.FreelancerDAO.deleteProjectById(
      freelancer_id,
      project_id,
    );
    if (!delete_project) {
      this.logger.error(
        "FreelancerService: deleteFreelancerProject: Project not found",
        freelancer_id,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.FREELANCER_NOT_FOUND,
        ERROR_CODES.FREELANCER_NOT_FOUND,
      );
    }

    return { success: true };
  }

  async deleteFreelancerSkill(freelancer_id: string, skill_id: string) {
    this.logger.info(
      `FreelancerService: deleteFreelancerSkill: Deleting skill for Freelancer ID:${freelancer_id} and Skill ID:${skill_id}`,
    );

    const updateResult = await this.FreelancerDAO.updateFreelancer(
      { _id: freelancer_id },
      { $pull: { skills: { _id: skill_id } } },
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error("Skill not found or already deleted");
    }

    return { success: true };
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

  async createFreelancerProfile(freelancer: IFreelancer) {
    this.logger.info(
      "FreelancerService: createFreelancerProfile: Creating Freelancer: ",
      freelancer,
    );

    const data: any = await this.FreelancerDAO.createFreelancer(freelancer);

    return data;
  }

  async addFreelancerProject(freelancer_id: string, project) {
    this.logger.info(
      "FreelancerService: addFreelancerProject: Creating Freelancer Project: ",
      freelancer_id,
      project,
    );

    const data: any = await this.FreelancerDAO.createProjectById(
      freelancer_id,
      project,
    );

    return data;
  }

  async addFreelancerSkills(freelancer_id: string, skills: string[]) {
    this.logger.info(
      `FreelancerService -> addFreelancerSkills -> Adding skills for freelancer ID: ${freelancer_id}`,
    );

    const updatedFreelancer = await this.FreelancerDAO.addFreelancerSkill(
      freelancer_id,
      skills,
    );
    if (!updatedFreelancer) {
      throw new Error("Freelancer not found or skills could not be added");
    }
    return updatedFreelancer;
  }

  async updateProfileFreelancer(freelancer_id: string, freelancer) {
    this.logger.info(
      "FreelancerService: updateProfileFreelancer: Updating Freelancer: ",
      freelancer_id,
      freelancer,
    );

    const data: any = await this.FreelancerDAO.updateFreelancer(
      { _id: freelancer_id },
      freelancer,
    );

    return data;
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
}
