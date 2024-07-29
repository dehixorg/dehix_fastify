export const FREELANCER_ENDPOINT = "/freelancer";
export const FREELANCER_CREATE_ENDPOINT = "/create";
export const FREELANCER_ID_ENDPOINT = "/:freelancer_id";
export const ALL_FREELANCER = "/allfreelancer";
// project endpoint
export const FREELANCER_PROJECT_ID_ENDPOINT = "/:freelancer_id/project";
export const FREELANCER_OWN_PROJECT_ID_ENDPOINT = "/:freelancer_id/myproject";
export const FREELANCER_UPDATE_PROJECT_BY_ID =
  "/:freelancer_id/project/:project_id";
export const FREELANCER_PROJECT_DELETE_BY_ID =
  "/:freelancer_id/project/:project_id";

// experience endpoint
export const FREELANCER_CREATE_EXPERIENCE_BY_ID = "/:freelancer_id/experience";
export const FREELANCER_UPDATE_EXPERIENCE_BY_ID =
  "/:freelancer_id/experience/:experience_id";
export const FREELANCER_EXPERINCE_DELETE_BY_ID =
  "/:freelancer_id/experience/:experience_id";

// education endpoint
export const FREELANCER_CREATE_EDUCATION_BY_ID = "/:freelancer_id/education";
export const FREELANCER_UPDATE_EDUCATION_BY_ID =
  "/:freelancer_id/education/:education_id";
export const FREELANCER_DELETE_EDUCATION_BY_ID =
  "/:freelancer_id/education/:education_id";

// skills endpoint
export const FREELANCER_SKILLS_ENDPOINT = "/:freelancer_id/skill";
export const FREELANCER_SKILLS_ADD_BY_ID = "/:freelancer_id/skill";
export const FREELANCER_SKILL_DELETE_BY_ID = "/:freelancer_id/skill/:skill_id";

// domian endpoint
export const FREELANCER_DOMAIN_ENDPOINT = "/:freelancer_id/domain";
export const FREELANCER_DOMAIN_ADD_BY_ID = "/:freelancer_id/domain";
export const FREELANCER_DOMAIN_DELETE_BY_ID =
  "/:freelancer_id/domain/:domain_id";

// Dehix Talent
export const FREELANCER_DEHIX_TALENT_ADD_BY_ID = "/:freelancer_id/dehix-talent";
export const FREELANCER_DEHIX_TALENT_DELETE_BY_ID =
  "/:freelancer_id/dehix-talent/:dehixTalent_id";

export const FREELANCER_ORACLE_STATUS_BY_ID = "/:freelancer_id/oracle-status";
export const FREELANCER_INTERVIEWS_ALIGNED_BY_ID =
  "/:freelancer_id/interviews-aligned";
export const REGISTRATION_ENDPOINT = "/register";
export const VERIFY_ENDPOINT = "/verify";
export const LOGIN_ENDPOINT = "/login";
export const FORGOT_PASSWORD_ENDPOINT = "/forgot-password";
export const RESET_PASSWORD_ENDPOINT = "/reset-password";

export const SUBMIT_FOR_REVIEW_ENDPOINT = "/submit-for-review";
export const CREATE_PROJECT = "/create_project"; //not used
export const FREELANCER_INFO = "/freelancer_info";
export const VERIFICATION_DOMAIN = "https://dev.findmyvenue.com/verify";
export const RESET_PASSWORD_DOMAIN =
  "https://dev.findmyvenue.com/reset-password";

// Consultant endpoints
export const FREELANCER_ADD_CONSULTANT_BY_ID = "/:freelancer_id/consultant";
export const FREELANCER_UPDATE_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";
export const FREELANCER_GET_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";
export const FREELANCER_DELETE_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";
