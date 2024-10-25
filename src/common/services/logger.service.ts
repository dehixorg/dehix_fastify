import { pino } from "pino";
import { Service } from "fastify-decorators";
import { join } from "path";
import { fileURLToPath } from "url";

// ANSI escape codes for coloring
const colors = {
  service: "\x1b[34m", // Blue
  controller: "\x1b[35m", // Magenta
  constant: "\x1b[36m", // Cyan
  dao: "\x1b[33m", // Yellow
  unknown: "\x1b[37m", // White
  reset: "\x1b[0m", // Reset color
};

// Helper to extract the calling file, function name, and categorize file type
function getCallerInfo() {
  const originalFunc = Error.prepareStackTrace;
  let callerfile = "";
  let functionName = "";

  try {
    const err = new Error();

    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };

    const currentfile = err.stack?.shift()?.getFileName();

    while (err.stack.length) {
      const callSite = err.stack.shift();
      callerfile = callSite?.getFileName();
      functionName = callSite?.getFunctionName() || "anonymous";
      if (callerfile !== currentfile) break;
    }
  } catch (err) {
    console.error(err);
  }

  Error.prepareStackTrace = originalFunc;

  const fileName = callerfile ? fileURLToPath(callerfile) : "unknown";

  // Determine file type
  let fileType = "UNKNOWN";
  if (fileName.includes("service")) {
    fileType = "SERVICE";
  } else if (fileName.includes("controller")) {
    fileType = "CONTROLLER";
  } else if (fileName.includes("constant")) {
    fileType = "CONSTANT";
  } else if (fileName.includes("dao")) {
    fileType = "DAO";
  } else {
    const splitName = fileName.split("/");
    fileType = splitName[splitName.length - 1].split(".")[0].toUpperCase(); // Fallback to the filename without extension
  }

  return { fileName: join(fileName), functionName, fileType };
}

@Service()
export class Logger {
  logger: any;

  constructor() {
    this.logger = pino({
      name: "Dehix",
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard", // Format timestamp
          ignore: "pid,hostname,name",
        },
      },
      redact: ["req.headers.authorization"],
      serializers: {
        res(reply) {
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params,
            headers: request.headers,
          };
        },
      },
    });
  }

  // Helper to get the color for a specific file type
  getColorForFileType(fileType: string) {
    switch (fileType) {
      case "SERVICE":
        return colors.service;
      case "CONTROLLER":
        return colors.controller;
      case "CONSTANT":
        return colors.constant;
      case "DAO":
        return colors.dao;
      default:
        return colors.unknown;
    }
  }

  // Modify info to accept multiple arguments
  info(...messages: any[]) {
    const { fileName, functionName, fileType } = getCallerInfo();
    const color = this.getColorForFileType(fileType);
    this.logger.info(
      `${color}ℹ️  LOG [${fileName} -> ${fileType}: ${functionName}] ${messages.join(' ')}${colors.reset}`,
    );
  }

  // Modify error to accept multiple arguments
  error(...errors: any[]) {
    const { fileName, functionName, fileType } = getCallerInfo();
    const color = this.getColorForFileType(fileType);
    this.logger.error(
      `${color}❌ ERROR [${fileName} -> ${fileType}: ${functionName}] ${errors.join(' ')}${colors.reset}`,
    );
  }

  // Modify warn to accept multiple arguments
  warn(...messages: any[]) {
    const { fileName, functionName, fileType } = getCallerInfo();
    const color = this.getColorForFileType(fileType);
    this.logger.warn(
      `${color}⚠️  WARN [${fileName} -> ${fileType}: ${functionName}] ${messages.join(' ')}${colors.reset}`,
    );
  }
}

export const logger = new Logger().logger;
