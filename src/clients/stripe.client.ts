/**
 * File: stripe.client
 * Author: Unnayan K Bharadwaj
 * Date: 07-05-2024
 * Description: client for connect to stripe
 */

/* eslint-disable import/no-extraneous-dependencies */
import Stripe from 'stripe';
import { Service } from 'fastify-decorators';
import { BaseService } from '../common/base.service';
import { ServerError } from '../common/errors';
import { ERROR_CODES, RESPONSE_MESSAGE } from '../common/constants';

@Service()
export class StripeClient extends BaseService {
  static stripe: Stripe;

  static init() {
    // key will read from secret manager
    StripeClient.stripe = new Stripe(`${process.env.SERVER_STRIPE_KEY}`);
  }

  async getPrice(priceId) {
    this.logger.info(`StripeClient -> getPrice -> priceId :: ${priceId}`);
    const price = await StripeClient.stripe.prices.retrieve(priceId, { expand: ['tiers'] });
    return price;
  }

  async createSession(body) {
    try {
      this.logger.info(`createSession :: ${JSON.stringify(body)}`);
      return await StripeClient.stripe.checkout.sessions.create(body);
    } catch (error: any) {
      this.logger.error(`StripeClient --> createSession --> error while creating session   :: ${error}`);
      throw new ServerError(`RESPONSE_MESSAGE.BAD_REQUEST${error}`, ERROR_CODES.STRIPE_SERVER_ERROR);
    }
  }

  async createCustomer(body) {
    this.logger.info(`stripe create customer`, body);
    return StripeClient.stripe.customers.create(body);
  }

  async updateCustomer(customerId, body) {
    try {
      this.logger.info(`StripeClient --> updateCustomer :: ${JSON.stringify(body)}`);
      return await StripeClient.stripe.customers.update(customerId, body);
    } catch (error: any) {
      this.logger.error(`StripeClient --> updateCustomer --> error while updating customer  :: ${error}`);
      throw new ServerError(RESPONSE_MESSAGE.BAD_REQUEST, ERROR_CODES.STRIPE_SERVER_ERROR);
    }
  }

  async getTaxRate(taxRateId) {
    this.logger.info(`StripeClient -> getTaxRate -> taxRateId :: ${taxRateId}`);
    const taxRate = await StripeClient.stripe.taxRates.retrieve(taxRateId);
    return taxRate;
  }

  async deleteCustomerById(customerId: string) {
    this.logger.info(`StripeClient -> deleteCustomerById for customer :: ${customerId}`);
    return StripeClient.stripe.customers.del(customerId);
  }
}
