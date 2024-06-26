/**
 * File: logger.service
 * Author: Akhil
 * Date: 03-05-2024
 * Description: Logger service
 */

import { pino } from "pino";
import { Service } from "fastify-decorators";

@Service()
export class Logger {
  logger: any;

  constructor() {
    this.logger = pino({
      name: "Dehix",
      level: "info",
      transport: {
        target: "pino/file",
        options: {
          ignore: "pid,hostname,name",
        },
      },
      redact: ["req.headers.authorization"],
      serializers: {
        res(reply) {
          // The default
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params, // Including the headers in the log could be in violation // of privacy laws, e.g. GDPR. using the "redact" option to // remove sensitive fields. It could also leak authentication data in // the logs.
            headers: request.headers,
          };
        },
      },
    });
  }

  info(...message: any) {
    this.logger.info(`ℹ️  INFO: ${message}`);
  }

  error(...error: any) {
    this.logger.error(`❌ ERROR: ${error}`);
  }

  warn(...message: any) {
    this.logger.warn(message);
  }
}

export const logger = new Logger().logger;
