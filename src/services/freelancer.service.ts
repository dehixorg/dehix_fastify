/* eslint-disable import/no-extraneous-dependencies */
import { Service, Inject } from 'fastify-decorators';
import { FastifyRequest } from 'fastify/types/request';
import * as bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

import pkg from 'jsonwebtoken';
const { sign: jwtSign, verify: jwtVerify, TokenExpiredError, JsonWebTokenError } = pkg;

import { BaseService } from '../common/base.service';
import { firebaseClient, SESService } from '../common/services';
// import { FreelancerDAO, UserSubscriptionDAO } from '../dao';

import { decrypt, encrypt, hashPassword } from '../common/utils';
import { NotFoundError, BadRequestError, UnAuthorisedError, BadTokenError } from '../common/errors';
import {
  ENCRYPTION_SECRET_KEY,
  JWT_SECRET_KEY,
  ERROR_CODES,
  ROLES,
  RESPONSE_MESSAGE,
  RESET_PASSWORD_EMAIL_CONSTANTS,
  EMAIL_VERIFICATION_EMAIL_CONSTANTS,
  FIREBASE_USER_TYPE,
} from '../common/constants';
import { ForgotPasswordBody, ResetPasswordBody, FreelancerLoginBody, FreelancerRegistrationBody } from '../types/v1';
import { RESET_PASSWORD_DOMAIN, VERIFICATION_DOMAIN } from '../constants/freelancer.constant';

@Service()
export class FreelancerService extends BaseService {

  @Inject(SESService)
  private sesService!: SESService;

  /**
   * Service method for vendor login
   * @param body
   * @param em
   */
  async login(body: FreelancerLoginBody) {
    const { email: workEmail, password } = body;
    let vendor: any = await this.freelancerDAO.findOneByEmail(workEmail);

    if (!vendor) {
      throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
    }

    const passwordMatches = await bcrypt.compare(password, vendor.password);
    if (!passwordMatches) {
      this.logger.error('FreelancerService: login : Password is incorrect');
      throw new BadRequestError('Invalid email or password', ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
    }

    if (!vendor.firebase_id) {
      this.logger.error('FreelancerService: login : Freelancer is not verified');
      throw new BadRequestError('Freelancer is not verified', ERROR_CODES.EMAIL_NOT_VERIFIED);
    }

    const [customToken] = await Promise.all([
      firebaseClient.generateCustomToken(vendor.firebase_id),
      // this.userSubscriptionDAO.getSubscriptionByFreelancerId(vendor.id),
    ]);

    return {
      firebase_custom_token: customToken,
      user_id: vendor.id,
      user_name: vendor.full_name,
      email: vendor.email,
      subscription: subscription?.entity_plan,
    };
  }

  /**
   * Service method to register a new vendor
   * @param body
   * @param em
   * @returns
   */
  async register(body: FreelancerRegistrationBody) {
    const { full_name: fullName, email: workEmail, password } = body;

    let vendor: any = await this.freelancerDAO.findOneByEmail(workEmail);

    if (vendor?.owner_id) {
      this.logger.error('Staff members are not allowed to proceed');

      throw new BadRequestError(
        RESPONSE_MESSAGE.STAFF_REGISTERATION_NOT_ALLOWED,
        ERROR_CODES.STAFF_REGISTERATION_NOT_ALLOWED,
      );
    } else if (vendor?.is_email_verified) {
      this.logger.error('Verified owners are not allowed to proceed');

      throw new BadRequestError(RESPONSE_MESSAGE.VERIFIED_OWNERS_NOT_ALLOWED, ERROR_CODES.USER_ALREADY_REGISTERED);
    }

    if (!vendor) {
      const hashedPassword = await hashPassword(password);
      vendor = {
        id: uuidv4(),
        full_name: fullName,
        email: workEmail,
        password: hashedPassword,
        is_email_verified: false
      };

      await this.freelancerDAO.create(this.freelancerDAO.model, vendor)
    }

    const jwtToken = jwtSign({ id: vendor!.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
    const encryptedJwt = await encrypt(jwtToken, ENCRYPTION_SECRET_KEY);
    const verificationLink = `${VERIFICATION_DOMAIN}?token=${encryptedJwt}`;

    this.logger.info(`FreelancerService: register: id: ${vendor!.id} and  Verification link: ${verificationLink}`);

    const { SENDER, SUBJECT, TEXTBODY } = EMAIL_VERIFICATION_EMAIL_CONSTANTS;
    await this.sesService.sendEmail({
      sender: SENDER!,
      recipient: [workEmail],
      subject: SUBJECT,
      textBody: TEXTBODY.replace(':verificationLink', verificationLink),
    });

    return verificationLink;
  }

  async verify(request: FastifyRequest) {
    const token = this.extractTokenFromRequest(request);

    let customToken: string,
      updatedFreelancer: any,
      firebaseId: null | string = null,
      subscription: any;

    if (!token) {
      throw new UnAuthorisedError(RESPONSE_MESSAGE.UNAUTHORISED, ERROR_CODES.UNAUTHORIZED);
    }

    try {
      let userId: string = await this.getUserIdFromToken(token);
      const vendorUser: any = await this.getFreelancerUserById(userId);

      if (vendorUser.firebase_id) {
        this.logger.info(
          `FreelancerService: verify: vendorUser found with user id: ${userId} and firebase id: ${vendorUser.firebase_id}`,
        );

        [customToken] = await Promise.all([
          firebaseClient.generateCustomToken(vendorUser.firebase_id),
          // this.userSubscriptionDAO.getSubscriptionByFreelancerId(vendorUser.id),
        ]);
      } else {
        this.logger.info(
          `FreelancerService: verify: vendorUser found with user id: ${userId} and firebase id doesnot exist`,
        );

        const { generatedToken, updateResult, userSubscription } = await this.createFirebaseUserAndMarkVerified(
          firebaseId,
          vendorUser,
        );
        customToken = generatedToken;
        updatedFreelancer = updateResult;
        subscription = userSubscription;
      }

      return {
        firebase_custom_token: customToken,
        user_id: userId,
        user_name: vendorUser.full_name,
        email: vendorUser.email,
        subscription: subscription?.entity_plan,
      };
    } catch (err: any) {
      await this.handleRegistrationVerificationError(firebaseId, updatedFreelancer, err);
    }
  }

  /**
   * Helper method: Creates a Firebase user and sets the user as verified in the database if the user is unverified. Additionally, it generates a custom token for the user.
   * @param firebaseId
   * @param vendorUser
   * @param em
   * @returns
   */
  private async createFirebaseUserAndMarkVerified(firebaseId: string | null, vendorUser: any) {
    firebaseId = await firebaseClient.createFireBaseUserWithCustomClaims(vendorUser.email, {
      userType: FIREBASE_USER_TYPE.VENDOR,
      role: vendorUser.owner_id ? ROLES.MANAGER : ROLES.OWNER,
      userId: vendorUser.id,
    });

    const [updateResult, generatedToken, userSubscription] = await Promise.all([
      // this.freelancerDAO.updateFreelancer({
      //   condition: { id: vendorUser.id },
      //   newData: { is_email_verified: true, firebase_id: firebaseId },
      // }),
      firebaseClient.generateCustomToken(firebaseId),
      // this.userSubscriptionDAO.getSubscriptionByFreelancerId(vendorUser.id),
    ]);
    return { updateResult, generatedToken, userSubscription };
  }

  private async handleRegistrationVerificationError(firebaseId: string | null, updatedFreelancer: any, err: any) {
    /* If firebase user gets created, but updation in db failed */
    if (firebaseId && !updatedFreelancer) {
      await firebaseClient.deleteFireBaseUser(firebaseId);
    }

    if (err instanceof TokenExpiredError) {
      throw new UnAuthorisedError(RESPONSE_MESSAGE.EXPIRED_TOKEN, ERROR_CODES.TOKEN_EXPIRED);
    }

    if (err instanceof JsonWebTokenError || err?.code === 'ERR_CRYPTO_INVALID_IV') {
      throw new UnAuthorisedError(RESPONSE_MESSAGE.AUTHENTICATION_FAILED, ERROR_CODES.INVALID_TOKEN);
    }

    this.logger.error('FreelancerService: verify :Error in user verification process', err);
    throw err;
  }

  private async getFreelancerUserById(userId: string) {
    this.logger.info(`FreelancerService -> getFreelancerUserById : ${userId}`);
    const vendorUser: any = await this.freelancerDAO.getById(userId);

    if (!vendorUser) {
      this.logger.error('FreelancerService: verify: vendorUser not found with id', userId);
      throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
    }
    return vendorUser;
  }

  /**
   * Method to decrypt and then decode an encrypted Jwt token
   * @param token
   * @returns
   */
  private async getUserIdFromToken(token: any) {
    const decryptedToken = await decrypt(token, ENCRYPTION_SECRET_KEY);
    let decodedToken = jwtVerify(decryptedToken, JWT_SECRET_KEY);

    let userId: string;
    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      this.logger.info('FreelancerService: verify: decodedToken ', decodedToken);

      userId = decodedToken.id;
    } else {
      throw new BadTokenError('Invalid token', ERROR_CODES.INVALID_TOKEN);
    }
    return userId;
  }

  private extractTokenFromRequest(request) {
    const auth = request.headers.authorization;
    const token = auth?.split(' ')[1];
    return token;
  }

  async sendResetPasswordLink(body: ForgotPasswordBody) {
    const { email: workEmail } = body;
    const vendor: any = await this.freelancerDAO.getFreelancerByEmail(workEmail);

    if (!vendor) {
      throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
    }

    const jwtToken = jwtSign({ id: vendor.id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    const encryptedJwt = await encrypt(jwtToken, ENCRYPTION_SECRET_KEY);

    const verificationLink = `${RESET_PASSWORD_DOMAIN}?token=${encryptedJwt}`;
    this.logger.info('FreelancerService: sendResetPasswordLink: verificationLink: ', verificationLink);

    await this.freelancerDAO.updateFreelancerData(vendor.id, { reset_password_token: encryptedJwt });

    const { SENDER, SUBJECT, TEXTBODY } = RESET_PASSWORD_EMAIL_CONSTANTS;
    await this.sesService.sendEmail({
      sender: SENDER!,
      recipient: [workEmail],
      subject: SUBJECT,
      textBody: TEXTBODY.replace(':verificationLink', verificationLink),
    });
  }

  async resetPassword(request: FastifyRequest) {
    const { password } = request.body as ResetPasswordBody;
    const auth = request.headers.authorization;
    const token = auth?.split(' ')[1];

    if (!token) {
      throw new UnAuthorisedError('No token provided.', ERROR_CODES.INVALID_TOKEN);
    }

    let decodedToken: null | { id: string };

    try {
      const decryptedToken = await decrypt(token, ENCRYPTION_SECRET_KEY);

      // decodedToken = await this.verifyLatestResetToken(decryptedToken, token);
    } catch (err: any) {
      this.logger.error(`Something went wrong with token`, err);

      if (err?.statusCode) {
        throw err;
      }

      if (err instanceof TokenExpiredError) {
        throw new BadRequestError(RESPONSE_MESSAGE.EXPIRED_TOKEN, ERROR_CODES.TOKEN_EXPIRED);
      }

      if (err instanceof JsonWebTokenError) {
        throw new BadRequestError(RESPONSE_MESSAGE.AUTHENTICATION_FAILED, ERROR_CODES.INVALID_TOKEN);
      }

      throw new BadRequestError(RESPONSE_MESSAGE.TOKEN_VERIFICATION_FAILED, ERROR_CODES.TOKEN_VERIFICATION_FAILED);
    }

    const decodedTokenId = decodedToken?.id;
    if (!decodedTokenId) {
      throw new BadRequestError('Id not found in token', ERROR_CODES.NOT_FOUND);
    }
    // const vendor = await this.freelancerDAO.findFreelancerById(decodedTokenId);

    const hashedPassword = await hashPassword(password);

    this.logger.info(`FreelancerService -> resetPassword -> hashedPassword: ${hashedPassword}, password: ${password}`);

    // await this.freelancerDAO.updateFreelancerData(vendor.id, { password: hashedPassword, reset_password_token: null });
  }

  private async verifyLatestResetToken(decryptedToken: string, token: string) {
    const decodedToken: any = jwtVerify(decryptedToken, JWT_SECRET_KEY);

    // const vendor = null await this.freelancerDAO.findFreelancerById(decodedToken.id);

    // if (vendor && vendor.reset_password_token !== token) {
    //   this.logger.error('The token in the request is invalid or already used.');
    //   throw new BadRequestError(RESPONSE_MESSAGE.BAD_TOKEN, ERROR_CODES.INVALID_TOKEN);
    // }

    // this.logger.info(`FreelancerService: verifyLatestResetToken: vendorId retrieved from JWT: ${decodedToken.id}`);

    // return decodedToken;
  }

  async getFreelancerProfile(vendorId: string) {
    this.logger.info('FreelancerService: getFreelancerProfile: Fetching vendor profile for ID: ', vendorId);

    const [vendor, subscription]: any = await Promise.all([
      // this.freelancerDAO.findFreelancerById(vendorId),
      // this.userSubscriptionDAO.getSubscriptionByFreelancerId(vendorId),
    ]);

    if (!vendor) {
      this.logger.error('FreelancerService: getFreelancerProfile: Freelancer not found with ID: ', vendorId);
      throw new NotFoundError(RESPONSE_MESSAGE.VENDOR_NOT_FOUND, ERROR_CODES.VENDOR_NOT_FOUND);
    }

    this.logger.info('FreelancerService: getFreelancerProfile: Freelancer found.');
    this.logger.info(
      `FreelancerService: getFreelancerProfile: Successfully fetched subscription details: Subscription ID ${subscription?.subscription_id}, for Freelancer ID: ${vendor.id}`,
    );

    let entityPlan = null,
      entityType = null,
      subscriptionId,
      isBasicProfileComplete = false;

    if (subscription) {
      const { entity_plan: ePlan, entity_type: eType, subscription_id: sId, is_basic_profile_complete: bpComplete } = subscription;
      entityPlan = ePlan || null;
      entityType = eType || null;
      subscriptionId = sId ? String(sId) : null;
      isBasicProfileComplete = bpComplete;
    }

    return {
      ...vendor,
      subscription_plan: entityPlan,
      entity_type: entityType,
      subscription_id: subscriptionId,
      is_basic_profile_complete: isBasicProfileComplete
    };
  }
}
