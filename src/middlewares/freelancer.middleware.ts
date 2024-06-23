// import { BaseController } from '../common/base.controller';
// import { NotFoundError } from '../common/errors';
// import { ERROR_CODES, STATUS_CODES } from '../common/constants';
// import { logger } from '../common/services/logger.service';
// import { FreelancerDAO } from '../dao/freelancer.dao';

// export class FreelancerMiddleware extends BaseController {
//   static checkExistance = async (request) => {
//     const vendorId = request.decodedToken?.userId;
//     logger.info('FreelancerMiddleware::checkExistance for id', vendorId);

//     const freelancerDAO = new FreelancerDAO();

//     const vendor = await freelancerDAO.findById(freelancerDAO.model, vendorId);

//     if (!vendor) {
//       logger.error(`vendor not found with id: ${request.decodedToken?.userId}`);
//       throw new NotFoundError(ERROR_CODES.VENDOR_NOT_FOUND, `${STATUS_CODES.NOT_FOUND}`);
//     }

//     request.metadata = { vendor };
//   };
// }
