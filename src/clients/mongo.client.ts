import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import models from "../models/index";
import { logger } from "../common/services/logger.service";
import skills from "./skills.json" assert { type: "json" };
import domains from "./domains.json" assert { type: "json" };

import { SkillDAO } from "../dao/skills.dao";
import { DomainDAO } from "../dao/domain.dao";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MongoClient {
  export async function init(fastify: FastifyInstance) {
    const mongoConnectionString = fastify.config["SERVER_MONGO_CONN"];

    await mongoose
      .connect(mongoConnectionString)
      .then(() => {
        logger.info("Connected to MongoDB");
      })
      .catch((error) => {
        logger.error("Unable to connect to MongoDB:" + error.message);
        throw error;
      });

    // Optionally, save the models object into Fastify instance for easy access
    fastify.decorate("mongoModels", models);

    logger.info("mongo client -> init -> dbModels", models);

    // Seed skills and domains when its a new DB
    // await seedSkills();
    // await seedDomains();
  }
}

export async function seedSkills() {
  const skillDAO = new SkillDAO();
  try {
    const insertedSkills = await skillDAO.addSkills(skills);
    logger.info(`Successfully inserted ${insertedSkills.length} skills.`);
  } catch (error: any) {
    logger.error(`Failed to insert skills: ${error.message}`);
    // Handle error appropriately
  }
}

export async function seedDomains() {
  const domainDAO = new DomainDAO();
  try {
    const insertedDomains = await domainDAO.addDomain(domains);
    logger.info(`Successfully inserted ${insertedDomains.length} domains.`);
  } catch (error: any) {
    logger.error(`Failed to insert skills: ${error.message}`);
    // Handle error appropriately
  }
}
