// Base endpoint for all freelancer-related operations
export const FREELANCER_ENDPOINT = "/freelancer";

// Endpoint for creating a new freelancer
export const FREELANCER_CREATE_ENDPOINT = "/create";

// Endpoint for fetching or modifying a specific freelancer by their ID
export const FREELANCER_ID_ENDPOINT = "/:freelancer_id";

// Endpoint for getting a specific freelancer details/profile by their ID
export const FREELANCER_ID_DETAILS_ENDPOINT = "/:freelancer_id/details";

// Endpoint for retrieving all freelancers in the system
export const ALL_FREELANCER = "/allfreelancer";
// Project related endpoints for freelancers
export const FREELANCER_PROJECT_ID_ENDPOINT = "/:freelancer_id/project";

// Endpoint for retrieving the freelancer's own projects
export const FREELANCER_OWN_PROJECT_ID_ENDPOINT = "/:freelancer_id/myproject";

// Endpoint for updating a specific freelancer's project by project ID
export const FREELANCER_UPDATE_PROJECT_BY_ID =
  "/:freelancer_id/project/:project_id";

// Endpoint for deleting a specific freelancer's project by project ID
export const FREELANCER_PROJECT_DELETE_BY_ID =
  "/:freelancer_id/project/:project_id";

// Experience-related endpoints for freelancers

// Endpoint for adding experience for a specific freelancer
export const FREELANCER_CREATE_EXPERIENCE_BY_ID = "/:freelancer_id/experience";

// Endpoint for updating a specific experience entry by experience ID
export const FREELANCER_UPDATE_EXPERIENCE_BY_ID =
  "/:freelancer_id/experience/:experience_id";

// Endpoint for deleting a specific experience entry by experience ID
export const FREELANCER_EXPERINCE_DELETE_BY_ID =
  "/:freelancer_id/experience/:experience_id";

// Education-related endpoints for freelancers

// Endpoint for adding education for a specific freelancer
export const FREELANCER_CREATE_EDUCATION_BY_ID = "/:freelancer_id/education";

// Endpoint for updating a specific education entry by education ID
export const FREELANCER_UPDATE_EDUCATION_BY_ID =
  "/:freelancer_id/education/:education_id";

// Endpoint for deleting a specific education entry by education ID
export const FREELANCER_DELETE_EDUCATION_BY_ID =
  "/:freelancer_id/education/:education_id";

// Skills-related endpoints for freelancers

// Base endpoint for freelancer skills
export const FREELANCER_SKILLS_ENDPOINT = "/:freelancer_id/skill";

// Endpoint for adding a skill for a specific freelancer
export const FREELANCER_SKILLS_ADD_BY_ID = "/:freelancer_id/skill";

// Endpoint for deleting a specific skill entry by skill ID
export const FREELANCER_SKILL_DELETE_BY_ID = "/:freelancer_id/skill/:skill_id";

// Domain-related endpoints for freelancers

// Base endpoint for freelancer domains
export const FREELANCER_DOMAIN_ENDPOINT = "/:freelancer_id/domain";

// Endpoint for adding a domain for a specific freelancer
export const FREELANCER_DOMAIN_ADD_BY_ID = "/:freelancer_id/domain";

// Endpoint for deleting a specific domain entry by domain ID
export const FREELANCER_DOMAIN_DELETE_BY_ID =
  "/:freelancer_id/domain/:domain_id";

// Dehix Talent-related endpoints for freelancers

// Endpoint for adding a freelancer to Dehix Talent
export const FREELANCER_DEHIX_TALENT_ADD_BY_ID = "/:freelancer_id/dehix-talent";

// Endpoint for retrieving Dehix Talent details for a specific freelancer
export const FREELANCER_DEHIX_TALENT_BY_ID = "/:freelancer_id/dehix-talent";

// Endpoint for deleting a freelancer from Dehix Talent by Dehix Talent ID
export const FREELANCER_DEHIX_TALENT_DELETE_BY_ID =
  "/:freelancer_id/dehix-talent/:dehixTalent_id";

// Endpoint for updating Dehix Talent information for a specific freelancer by Dehix Talent ID
export const FREELANCER_DEHIX_TALENT_UPDATE_BY_ID =
  "/:freelancer_id/dehix-talent/:dehixTalent_id";

// Endpoint for retrieving all Dehix Talent entries
export const ALL_DEHIX_TALENT_ENDPOINT = "/dehixTalent";

// Dehix Talent
// export const FREELANCER_DEHIX_TALENT_ADD_BY_ID = "/:freelancer_id/dehix-talent";
// export const FREELANCER_DEHIX_TALENT_DELETE_BY_ID =
//   "/:freelancer_id/dehix-talent/:dehixTalent_id";

// Endpoint for checking freelancer's oracle status
export const FREELANCER_ORACLE_STATUS_BY_ID = "/:freelancer_id/oracle-status";

// Endpoint for retrieving interviews aligned with a freelancer
export const FREELANCER_INTERVIEWS_ALIGNED_BY_ID =
  "/:freelancer_id/interviews-aligned";

// Registration and authentication endpoints

// Endpoint for freelancer registration
export const REGISTRATION_ENDPOINT = "/register";

// Endpoint for verifying freelancer registration
export const VERIFY_ENDPOINT = "/verify";

// Endpoint for freelancer login
export const LOGIN_ENDPOINT = "/login";

// Endpoint for password recovery - forgot password flow
export const FORGOT_PASSWORD_ENDPOINT = "/forgot-password";

// Endpoint for resetting password
export const RESET_PASSWORD_ENDPOINT = "/reset-password";

// Endpoint for submitting freelancer profile for review
export const SUBMIT_FOR_REVIEW_ENDPOINT = "/submit-for-review";

// (Not in use) Endpoint for creating a project
export const CREATE_PROJECT = "/create_project"; //not used

// Endpoint for retrieving freelancer information
export const FREELANCER_INFO = "/freelancer_info";

// Domain for verification process
export const VERIFICATION_DOMAIN = "https://dev.findmyvenue.com/verify";

// Domain for resetting passwords
export const RESET_PASSWORD_DOMAIN =
  "https://dev.findmyvenue.com/reset-password";

// Consultant-related endpoints for freelancers

// Endpoint for adding a consultant to a freelancer profile
export const FREELANCER_ADD_CONSULTANT_BY_ID = "/:freelancer_id/consultant";

// Endpoint for updating a consultant entry by consultant ID
export const FREELANCER_UPDATE_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";

// Endpoint for retrieving a consultant entry by consultant ID
export const FREELANCER_GET_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";

// Endpoint for deleting a consultant entry by consultant ID
export const FREELANCER_DELETE_CONSULTANT_BY_ID =
  "/:freelancer_id/consultant/:consultant_id";

// Oracle-related endpoints

// Base Oracle endpoint
export const ORACLE_ENDPOINT = "/oracle";

// Endpoint for retrieving or modifying Oracle details for a specific verifier
export const ORACLE_ID_ENDPOINT = "/:verifier_id/oracle";

// Endpoint for retrieving all Oracle entries
export const GET_ALL_ORACLE_ENDPOINT = "/oracles";

// Endpoint for updating an Oracle entry by document ID
export const ORACLE_UPDATE_END_POINT = "/:document_id/oracle";

// Not interested project

// Endpoint for marking a freelancer as "not interested" in a project
export const NOT_INTERESTED_PROJECT =
  "/:freelancer_id/:project_id/not_interested_project";

//Endpoint for retrieving consultant details for a specific freelancer
export const FREELANCER_CONSULTANT_BY_ID = "/:freelancer_id/consultant";