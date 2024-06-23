import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import models, { DBModels } from "../models/index";
import { logger } from "../common/services/logger.service";

export namespace MongoClient {
  export async function init(fastify: FastifyInstance) {
    const mongoConnectionString = fastify.config["SERVER_MONGO_CONN"];

    await mongoose
      .connect(mongoConnectionString)
      .then(() => {
        fastify.log.info("Connected to MongoDB");
      })
      .catch((error) => {
        fastify.log.error("Unable to connect to MongoDB:" + error.message);
        throw error;
      });

    // Optionally, save the models object into Fastify instance for easy access
    fastify.decorate("mongoModels", models);

    console.log("mongo client -> init -> dbModels", models);
  }
}
