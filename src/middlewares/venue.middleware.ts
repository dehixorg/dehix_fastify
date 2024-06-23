import { BaseController } from "../common/base.controller";
import { VenueDAO } from "../dao/venue.dao";
import { logger } from "../common/services/logger.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, STATUS_CODES } from "../common/constants";

export class VenueMiddleware extends BaseController {
  static checkVenueExistance = async (request) => {
    const venueId = request.params.venue_id;
    logger.info("VenueMiddleware::checkVenueExistance for id", venueId);

    const venueDAO = new VenueDAO();
    const venue = await venueDAO.findById(venueDAO.model, venueId);

    if (!venue) {
      logger.error(`Venue not found with id: ${venueId}`);
      throw new NotFoundError(
        ERROR_CODES.VENUE_NOT_FOUND,
        `${STATUS_CODES.NOT_FOUND}`,
      );
    }
  };
}
