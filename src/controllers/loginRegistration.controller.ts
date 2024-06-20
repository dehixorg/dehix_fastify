/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, Inject, POST } from 'fastify-decorators';
// import { CRUDController } from '../common/crud.controller';
import { FreelancerDAO } from '../dao';
import { FreelancerService } from '../services';
import { STATUS_CODES, RESPONSE_MESSAGE } from '../common/constants';
import { ForgotPasswordBody, ResetPasswordBody, FreelancerLoginBody, FreelancerRegistrationBody } from '../types/v1';
import {
  VENDORS_ENDPOINT,
  LOGIN_ENDPOINT,
  REGISTRATION_ENDPOINT,
  VERIFY_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
} from '../constants/freelancer.constant';
import {
  forgetPasswordSchema,
  registrationSchema,
  resetPasswordSchema,
  freelancerLoginSchema,
  registrationVerificationSchema,
} from '../schema/v1';
import { BaseController } from '../common/base.controller';

@Controller({ route: VENDORS_ENDPOINT })
export default class LoginRegistrationController extends BaseController {
  @Inject(FreelancerService)
  freelancerService!: FreelancerService;

  @POST(LOGIN_ENDPOINT, { schema: freelancerLoginSchema })
  async verifyLogin(request: FastifyRequest<{ Body: FreelancerLoginBody }>, reply: FastifyReply) {
    this.logger.info(`LoginRegistrationController -> verifyLogin -> Verifying login for: ${request.body.email}`);

    const data = await this.freelancerService.login(request.body);

    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }

  @POST(REGISTRATION_ENDPOINT, { schema: registrationSchema })
  async vendorRegistration(
    request: FastifyRequest<{ Body: FreelancerRegistrationBody }>,
    reply: FastifyReply,
  ): Promise<any> {
    this.logger.info(
      `LoginRegistrationController -> vendorRegistration -> Registering vendor: ${request.body.full_name}`,
    );

    await this.freelancerService.register(request.body);

    reply.send({
      statusCode: STATUS_CODES.CREATED,
      message: RESPONSE_MESSAGE.CREATED,
    });
  }

  @POST(VERIFY_ENDPOINT, { schema: registrationVerificationSchema })
  async verify(request: FastifyRequest, reply: FastifyReply) {
    this.logger.info(`LoginRegistrationController -> verify -> Verifying user's email`);

    const data = await this.freelancerService.verify(request);

    reply.status(STATUS_CODES.SUCCESS).send({
      data,
    });
  }

  @POST(FORGOT_PASSWORD_ENDPOINT, { schema: forgetPasswordSchema })
  async forgetPassword(request: FastifyRequest<{ Body: ForgotPasswordBody }>, reply: FastifyReply) {
    this.logger.info(
      `LoginRegistrationController -> forgetPassword -> Sending reset password link for: ${request.body.email}`,
    );

    await this.freelancerService.sendResetPasswordLink(request.body);

    reply.status(STATUS_CODES.SUCCESS).send({
      status: RESPONSE_MESSAGE.SUCCESS,
    });
  }

  @POST(RESET_PASSWORD_ENDPOINT, { schema: resetPasswordSchema })
  async resetPassword(request: FastifyRequest<{ Body: ResetPasswordBody }>, reply: FastifyReply) {
    this.logger.info(`LoginRegistrationController -> resetPassword -> Resetting password`);

    await this.freelancerService.resetPassword(request);

    reply.status(STATUS_CODES.SUCCESS).send({
      status: RESPONSE_MESSAGE.SUCCESS,
    });
  }
}
