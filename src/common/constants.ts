export const STATUS_CODES = {
  SUCCESS: 200,
  UNAUTHORISED: 401,
  BAD_REQUEST: 400,
  METHOD_NOT_FOUND: 405,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  UN_PROCESSABLE: 422,
  NO_CONTENT: 204,
  CREATED: 201,
  SPECIAL_STATUS: 600,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

export const RESPONSE_MESSAGE = {
  SUCCESS: "Success",
  CREATED: "Created",
  BAD_REQUEST: "Bad request",
  CUSTOM_TOKEN_GENERATION_FAILED: "Error generating custom token from Firebase",
  REQUEST_DATA_INVALID: "Invalid data in the request body",
  DATA_NOT_FOUND: "Data not found",
  BAD_TOKEN: "Invalid token",
  INVALID_EMAIL_OR_PASSWORD: "Email or password is invalid",
  UNAUTHORISED: "UNAUTHORISED",
  DATABASE_REQUEST_ERROR: "Database request error",
  EXPIRED_TOKEN: "This token is expired",
  AUTHENTICATION_FAILED: "Failed to authenticate token.",
  SERVER_ERROR: "Internal server Error",
  TOKEN_VERIFICATION_FAILED:
    "Something went wrong with the token verification.",
  NOT_FOUND: (entity: string = "User") => `${entity} not found`,
  USER_NOT_FOUND: "User not found",
  USER_EXISTS: "User already exists",
  PROJECT_NOT_FOUND: "Subscription by provided ID was not found.",
  DRAFT_SUB_NOT_FOUND: "No subscription found for this draft owner",
  FREELANCER_NOT_FOUND: "Freelancer with provided ID could not be found.",

  EXPERIENCE_NOT_FOUND: "Freelancer experience  not found by id",
  EDUCATION_NOT_FOUND: "Freelancer education not found by id",
  DRAFT_NOT_FOUND: "Draft with provided ID could not be found.",
  DRAFT_IS_INCOMPLETE:
    "This draft is incomplete and cannot be submitted for review",
  HOTEL_LIMIT_REACHED: "The limit for adding new hotels has been reached",
  RESTAURANT_LIMIT_REACHED:
    "The limit for adding new restaurants has been reached",
  ALREADY_UNDER_APPROVAL: "This draft is already under approval process",
  VERIFIED_OWNERS_NOT_ALLOWED: "Verified owners are not allowed to proceed",
  STAFF_REGISTERATION_NOT_ALLOWED: "Staff members are not allowed to proceed",
  STRIPE_CREATE_CUSTOMER_ERROR: "stripe create customer error",
  STRIPE_CREATE_SESSION_ERROR: "stripe create session error",
  INVALID_TAX_ID_CODE: "Invalid tax id country code",
  INVALID_TAX_ID: "Invalid tax id",
  NOT_VENUE_TYPE: "NOT_VENUE_TYPE",
  NOT_HOTEL_TYPE: "NOT_HOTEL_TYPE",
};

export const RESET_PASSWORD_EMAIL_CONSTANTS = {
  SENDER: process.env.SENDER_EMAIL_ID,
  SUBJECT: "Reset your password",
  TEXTBODY: "Click on this link to reset your password: :verificationLink",
};

export const CREATE_PASSWORD_EMAIL_CONSTANTS = {
  SENDER: process.env.SENDER_EMAIL_ID,
  SUBJECT: "Create your password",
  TEXTBODY: "Click on this link to create your password: :passLink",
};

export const PRICE_CONFIG_NAME = "PRICE_CONFIG";

export const EMAIL_VERIFICATION_EMAIL_CONSTANTS = {
  SENDER: process.env.SENDER_EMAIL_ID,
  SUBJECT: "Please verify your email",
  TEXTBODY: "Click on this link to verify your email: :verificationLink",
};

export const ERROR_CODES = {
  USER_ALREADY_EXIST: "USER ALREADY EXIST",
  PASSWORDS_DO_NOT_MATCH: "PASSWORDS_DO_NOT_MATCH",
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  FREELANCER_NOT_FOUND: "FREELANCER_NOT_FOUND",
  EXPERIENCE_NOT_FOUND: "EXPERIENCE_NOT_FOUND",
  EDUCATION_NOT_FOUND: "EDUCATION_NOT_FOUND",
  OFFERS_NOT_FOUND: "OFFERS_NOT_FOUND",
  OTP_MISMATCH: "OTP_MISMATCH",
  OTP_EXPIRED: "OTP_EXPIRED",
  FST_ERR_VALIDATION: "FST_ERR_VALIDATION",
  PLAN_NOT_FOUND: "No plan configuration found",
  CUSTOM_TOKEN_GENERATION_FAILED: "CUSTOM_TOKEN_GENERATION_FAILED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  SUBSCRIPTION_NOT_FOUND: "SUBSCRIPTION_NOT_FOUND",
  DRAFT_IS_INCOMPLETE: "DRAFT_IS_INCOMPLETE",
  HOTEL_LIMIT_REACHED: "HOTEL_LIMIT_REACHED",
  RESTAURANT_LIMIT_REACHED: "RESTAURANT_LIMIT_REACHED",
  ALREADY_UNDER_APPROVAL: "ALREADY_UNDER_APPROVAL",
  INVALID_EMAIL_OR_PASSWORD: "INVALID_EMAIL_OR_PASSWORD",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  STAFF_REGISTERATION_NOT_ALLOWED: "STAFF_REGISTERATION_NOT_ALLOWED",
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_VERIFICATION_FAILED: "TOKEN_VERIFICATION_FAILED",
  STRIPE_SERVER_ERROR: "STRIPE_SERVER_ERROR",
  INVALID_DATA: "INVALID_DATA",
  STRIPE_ERROR: "STRIPE_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR",
  INVALID_TAX_ID_CODE: "INVALID_TAX_ID_CODE",
  INVALID_TAX_ID: "INVALID_TAX_ID",
  CONFIG_NOT_FOUND: "CONFIG_NOT_FOUND",
  DRAFT_NOT_FOUND: "DRAFT_NOT_FOUND",
  NOT_FOUND: "NOT_FOUND",
  PRICING_NOT_FOUND: "PRICING_NOT_FOUND",
  VENUE_NOT_FOUND: "VENUE_NOT_FOUND",
  NOT_VENUE_TYPE: "NOT_VENUE_TYPE",
  NOT_HOTEL_TYPE: "NOT_HOTEL_TYPE",
};

export enum QUERY_TYPES {
  SELECT = "SELECT",
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  BULKUPDATE = "BULKUPDATE",
  BULKDELETE = "BULKDELETE",
  DELETE = "DELETE",
  UPSERT = "UPSERT",
  VERSION = "VERSION",
  SHOWTABLES = "SHOWTABLES",
  SHOWINDEXES = "SHOWINDEXES",
  DESCRIBE = "DESCRIBE",
  RAW = "RAW",
  FOREIGNKEYS = "FOREIGNKEYS",
  SHOWCONSTRAINTS = "SHOWCONSTRAINTS",
}

export const ENTITY_TYPE = {
  HOTEL: "HOTEL",
  INDIVIDUAL_VENUE: "INDIVIDUAL_VENUE",
  MULTI_VENUE: "MULTI_VENUE",
  KIDS_SPACE: "KIDS_SPACE",
};

export enum AmenityCategory {
  RECREATIONAL = "RECREATIONAL",
  BUSINESS = "BUSINESS",
  ROOM = "ROOM",
  EQUIPMENTS = "EQUIPMENTS",
  NONE = "NONE",
  ALL = "ALL",
}

export const ROLES = {
  MANAGER: "MANAGER",
  OWNER: "OWNER",
};

export const JWT_SECRET_KEY = "Secret key";
export const ENCRYPTION_SECRET_KEY = "Secret key";

export const PASSWORD_SALT_ROUNDS = 10;

export const FIREBASE_USER_TYPE = {
  FREELANCER: "FREELANCER",
  CUSTOMER: "CUSTOMER",
  FMV_ADMIN: "FMV_ADMIN",
};

export enum EntityType {
  HOTEL = "HOTEL",
  VENUE = "VENUE",
  INDIVIDUAL_VENUE = "INDIVIDUAL_VENUE",
  MULTI_VENUE = "MULTI_VENUE",
  KIDS_SPACE = "KIDS_SPACE",
}

export const AmenityCategoryMappings = {
  HOTEL: ["ROOM", "BUSINESS", "RECREATIONAL"],
  VENUE: ["EQUIPMENTS", "NONE"],
};
export const STRIPE_WEBHOOK_ENDPOINT = "v1/stripe-webhook";
