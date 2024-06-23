import { BaseController } from "../common/base.controller";
import { UserSubscriptionDAO } from "../dao";
import { logger } from "../common/services/logger.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";

export class SubscriptionMiddleware extends BaseController {
  static verifySubscriptionExists = async (request) => {
    const subscriptionId = request.params?.subscription_id;

    logger.info(
      "UserSubscriptionMiddleware::checkExistance for id",
      subscriptionId,
    );

    const userSubscriptionDAO = new UserSubscriptionDAO();
    const userSubscription =
      await userSubscriptionDAO.getSubscriptionById(subscriptionId);

    if (!userSubscription) {
      logger.error(
        `Failed to find a subscription with the following user ID: ${subscriptionId}`,
      );
      throw new NotFoundError(
        RESPONSE_MESSAGE.SUBSCRIPTION_NOT_FOUND,
        ERROR_CODES.SUBSCRIPTION_NOT_FOUND,
      );
    }

    if (!request.metadata) {
      request.metadata = {};
    }

    request.metadata.userSubscription = userSubscription;
  };
}
