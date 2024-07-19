/* eslint-disable @typescript-eslint/return-await */
import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import mongoose, {
  Model,
  Document,
  Types,
  ClientSession,
  FilterQuery,
  ProjectionType,
  QueryOptions,
} from "mongoose";
import { logger } from "./services/logger.service";

@Service()
export abstract class BaseDAO {
  @Inject(FastifyInstanceToken) fastifyInstance!: FastifyInstance;

  /**
   * Generic function to create data for the model reference provided
   * @param model
   * @param data
   * @returns
   */
  async create<T extends Document>(model: Model<T>, data: any): Promise<T> {
    const result = new model(data);
    await result.save();
    return result;
  }

  /**
   * Method to update by id
   * @param model
   * @param id
   * @param data
   * @returns
   */
  async updateById<T extends Document>(
    model: Model<T>,
    id: Types.ObjectId | string,
    data: any,
  ): Promise<T | null> {
    return await model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Method to delete by id
   * @param model
   * @param id
   * @returns
   */
  async delete<T extends Document>(
    model: Model<T>,
    id: Types.ObjectId | string,
  ): Promise<T | null> {
    logger.info(
      `Deleting in collection ${model.collection.name} for id : ${id}`,
    );
    return await model.findByIdAndDelete(id).exec();
  }

  /**
   * Generic function to upsert data for the model reference
   * @param model
   * @param data
   * @param condition
   * @returns
   */
  async upsert<T extends Document>(
    model: Model<T>,
    data: any,
    condition: FilterQuery<T>,
  ): Promise<T | null> {
    return await model
      .findOneAndUpdate(condition, data, { upsert: true, new: true })
      .exec();
  }

  /**
   * Generic method to get resources by Id
   * @param model
   * @param ids
   * @returns
   */
  async findByIdsAndDateDeletedIsNull<T extends Document>(
    model: Model<T>,
    ids: (Types.ObjectId | string)[],
  ): Promise<T[]> {
    return model
      .find({
        _id: { $in: ids },
        deletedAt: { $exists: false },
      })
      .exec();
  }

  /**
   * Method to update a model row by id
   * @param model
   * @param data
   * @param id
   * @returns
   */
  async update<T extends Document>(
    model: Model<T>,
    data: any,
    id: Types.ObjectId | string,
  ): Promise<T | null> {
    logger.info(
      `BaseDAO -> update :: updating the details on collection ${model.collection.name} with row id = ${id} `,
    );
    return await model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Method to find model element by id
   * @param model
   * @param id
   * @returns
   */
  async findById<T extends Document>(
    model: Model<T>,
    id: Types.ObjectId | string,
  ): Promise<T | null> {
    logger.info(
      `BaseDAO -> findById :: finding in collection ${model.collection.name} , id = ${id} `,
    );
    return await model.findById(id).exec();
  }

  /**
   * Method to find one result that matches a condition
   * @param model
   * @param condition
   * @param attributes
   * @returns
   */
  async findOne<T extends Document>(
    model: Model<T>,
    condition: FilterQuery<T>,
    attributes?: string[],
  ): Promise<T | null> {
    logger.info(condition);
    const projection = attributes
      ? attributes.reduce((acc, attr) => {
          acc[attr] = 1;
          return acc;
        }, {} as ProjectionType<T>)
      : {};
    const result = await model.findOne(condition, projection).exec();
    logger.info(result);
    return result;
  }

  /**
   * Method to get transaction object
   * @returns ClientSession obj
   */
  async getTransaction(): Promise<ClientSession> {
    return mongoose.startSession();
  }

  /**
   * Method to find all result that matches a condition
   * @param model
   * @param condition
   * @param attributes
   * @param paginationOptions
   * @returns
   */
  async findAll<T extends Document>(
    model: Model<T>,
    condition: FilterQuery<T>,
    attributes?: string[],
    paginationOptions?: QueryOptions<T>,
  ): Promise<T[]> {
    const projection = attributes
      ? attributes.reduce((acc, attr) => {
          acc[attr] = 1;
          return acc;
        }, {} as ProjectionType<T>)
      : {};
    return await model.find(condition, projection, paginationOptions).exec();
  }

  /**
   * Method to bulk update by ids
   * @param model
   * @param data
   * @param ids
   * @returns
   */
  async bulkUpdate<T extends Document>(
    model: Model<T>,
    data: any,
    ids: (Types.ObjectId | string)[],
  ): Promise<any> {
    logger.info(
      `BaseDAO -> bulkUpdate :: updating in collection ${model.collection.name} with data = ${data}, ids = ${ids} `,
    );
    return await model.updateMany({ _id: { $in: ids } }, data).exec();
  }

  /**
   * Method to bulk delete records for the given collection
   * @param model
   * @param ids
   * @returns
   */
  async bulkDelete<T extends Document>(
    model: Model<T>,
    ids: (Types.ObjectId | string)[],
  ): Promise<any> {
    logger.info(
      `BaseDAO -> bulkDelete :: deleting in collection ${model.collection.name} where ids = ${ids} `,
    );
    return await model.deleteMany({ _id: { $in: ids } }).exec();
  }

  /**
   * Method to bulk delete records by conditions for the given collection
   * @param model
   * @param conditions
   * @returns
   */
  async bulkDeleteByConditions<T extends Document>(
    model: Model<T>,
    conditions: FilterQuery<T>[],
  ): Promise<any> {
    logger.info(
      `BaseDAO -> bulkDeleteByConditions :: deleting in collection ${model.collection.name} by conditions: ${conditions} `,
    );
    return await model.deleteMany({ $or: conditions }).exec();
  }

  /**
   * Method to insert records in bulk for the given collection
   * @param model
   * @param data
   * @returns
   */
  async bulkCreate<T extends Document>(
    model: Model<T>,
    data: any[],
  ): Promise<any> {
    logger.info(
      `BaseDAO -> bulkCreate :: bulk create in collection ${model.collection.name} with data = ${JSON.stringify(data, null, 2)}`,
    );
    return await model.insertMany(data);
  }

  /**
   * Method to soft delete a record for the given collection
   * @param model
   * @param whereCondition
   * @returns
   */
  async softDelete<T extends Document>(
    model: Model<T>,
    whereCondition: FilterQuery<T>,
  ): Promise<any> {
    logger.info(
      `BaseDAO -> softDelete :: soft delete in collection ${model.collection.name}`,
    );
    return await model
      .updateMany(whereCondition, { deletedAt: new Date() })
      .exec();
  }

  /**
   * Method to get all records excluding those with the given IDs
   * @param model
   * @param primaryKeyField
   * @param excludedIds
   * @param conditions
   * @returns
   */
  async findAllExcept<T extends Document>(
    model: Model<T>,
    primaryKeyField: string,
    excludedIds: (Types.ObjectId | string)[],
    conditions: FilterQuery<T>,
  ): Promise<T[]> {
    const whereCondition: FilterQuery<T> = {
      [primaryKeyField]: { $nin: excludedIds },
      ...conditions,
    };

    return model.find(whereCondition).exec();
  }
}
