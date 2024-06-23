/* eslint-disable import/no-extraneous-dependencies */
import { Service, Inject } from "fastify-decorators";

import pkg from "jsonwebtoken";
const {
  sign: jwtSign,
  verify: jwtVerify,
  TokenExpiredError,
  JsonWebTokenError,
} = pkg;

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { FreelancerDAO } from "../dao/freelancer.dao";

@Service()
export class FreelancerService extends BaseService {
  @Inject(FreelancerDAO)
  private FreelancerDAO!: FreelancerDAO;

  async getFreelancerProfile(freelancer_id: string) {
    this.logger.info(
      "FreelancerService: getFreelancerProfile: Fetching vendor profile for ID: ",
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
        RESPONSE_MESSAGE.VENDOR_NOT_FOUND,
        ERROR_CODES.VENDOR_NOT_FOUND,
      );
    }

    return freelancer;
  }

  /**
   * Service method for vendor login
   * @param body
   * @param em
   */
  // async login(body: FreelancerLoginBody) {
  //   const { email: workEmail, password } = body;
  //   let vendor: any = await this.freelancerDAO.findOneByEmail(workEmail);

  //   if (!vendor) {
  //     throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
  //   }

  //   const passwordMatches = await bcrypt.compare(password, vendor.password);
  //   if (!passwordMatches) {
  //     this.logger.error('FreelancerService: login : Password is incorrect');
  //     throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
  //   }

  //   if (!vendor.firebase_id) {
  //     this.logger.error('FreelancerService: login : Freelancer is not verified');
  //     throw new BadRequestError('Freelancer is not verified', ERROR_CODES.EMAIL_NOT_VERIFIED);
  //   }

  //   const [customToken] = await Promise.all([
  //     firebaseClient.generateCustomToken(vendor.firebase_id),
  //     // this.userSubscriptionDAO.getSubscriptionByFreelancerId(vendor.id),
  //   ]);

  //   return {
  //     firebase_custom_token: customToken,
  //     user_id: vendor.id,
  //     user_name: vendor.full_name,
  //     email: vendor.email,
  //     subscription: subscription?.entity_plan,
  //   };
  // }

  // /**
  //  * Service method to register a new vendor
  //  * @param body
  //  * @param em
  //  * @returns
  //  */
  // async register(body: FreelancerRegistrationBody) {
  //   const { full_name: fullName, email: workEmail, password } = body;

  //   let vendor: any = await this.freelancerDAO.findOneByEmail(workEmail);

  //   if (vendor?.owner_id) {
  //     this.logger.error('Staff members are not allowed to proceed');

  //     throw new BadRequestError(
  //       RESPONSE_MESSAGE.STAFF_REGISTERATION_NOT_ALLOWED,
  //       ERROR_CODES.STAFF_REGISTERATION_NOT_ALLOWED,
  //     );
  //   } else if (vendor?.is_email_verified) {
  //     this.logger.error('Verified owners are not allowed to proceed');

  //     throw new BadRequestError(RESPONSE_MESSAGE.VERIFIED_OWNERS_NOT_ALLOWED, ERROR_CODES.USER_ALREADY_REGISTERED);
  //   }

  //   if (!vendor) {
  //     const hashedPassword = await hashPassword(password);
  //     vendor = {
  //       id: uuidv4(),
  //       full_name: fullName,
  //       email: workEmail,
  //       password: hashedPassword,
  //       is_email_verified: false
  //     };

  //     await this.freelancerDAO.create(this.freelancerDAO.model, vendor)
  //   }

  //   const jwtToken = jwtSign({ id: vendor!.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
  //   const encryptedJwt = await encrypt(jwtToken, ENCRYPTION_SECRET_KEY);
  //   const verificationLink = `${VERIFICATION_DOMAIN}?token=${encryptedJwt}`;

  //   this.logger.info(`FreelancerService: register: id: ${vendor!.id} and  Verification link: ${verificationLink}`);

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
