import { BaseController } from '../common/base.controller';
import { NotFoundError } from '../common/errors';
import { ERROR_CODES, STATUS_CODES } from '../common/constants';
import { logger } from '../common/services/logger.service';
import { businessDAO } from '../dao';
import { FastifyRequest } from 'fastify';
import { getProjectPathParams } from '../types/v1/project/post';


export class BusinessMiddleware extends BaseController {
  static checkExistance = async (request:any) => {
    const businessId = request.decodedToken?.userId;
    logger.info('BusinessMiddleware::checkExistance for id', businessId);

    const BusinessDAO = new businessDAO();

    const Business = await BusinessDAO.findById(BusinessDAO.model, businessId);

    if (!Business) {
      logger.error(`Business not  found with id: ${request.decodedToken?.userId}`);
      throw new NotFoundError(ERROR_CODES.USER_NOT_FOUND, `${STATUS_CODES.NOT_FOUND}`);
    }

    request.metadata = { Business };
  };
  static checkProjectExistance= async(request:FastifyRequest<{Params:getProjectPathParams}>)=>{
    const projectId= request.params.project_id;
    logger.info("Business Middleware->checkProjectExistence for id",projectId);
    const BusinessDao= new businessDAO();
    const project= await BusinessDao.findBusinessProject(projectId)
    if (!project) {
        logger.error(`project not found with id:${projectId}`);
      throw new NotFoundError(ERROR_CODES.NOT_FOUND, `${STATUS_CODES.NOT_FOUND}`);
    }
    request.metadata={project}
  }
}
