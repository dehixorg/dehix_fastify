import { FastifyInstance } from "fastify";
import mongoose from 'mongoose';
import dbModels, { DBModels } from "../models/index";
import { logger } from "../common/services/logger.service";

export namespace MongoClient {
  export let models: DBModels = {}; // Declare a models object to hold all MongoDB models

  export async function init(fastify: FastifyInstance) {
    const mongoConnectionString = fastify.config["SERVER_MONGO_CONN"];

    await mongoose.connect(mongoConnectionString).then(() => {
      fastify.log.info('Connected to MongoDB');
    }).catch((error) => {
      fastify.log.error('Unable to connect to MongoDB:' + error.message);
      throw error;
    });

    // Iterate over Sequelize models and create corresponding Mongoose models
    Object.keys(dbModels).forEach((dbModel) => {
      const mongooseSchema = new mongoose.Schema(dbModels[dbModel]);
      models[dbModel] = mongoose.model(dbModel, mongooseSchema);
    });

    // Optionally, save the models object into Fastify instance for easy access
    fastify.decorate('mongoModels', models);

    console.log('mongo client -> init -> dbModels', models);
  }
}
