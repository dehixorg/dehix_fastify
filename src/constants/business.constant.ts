// Base endpoint for all business-related operations
export const BUSINESS_END_POINT = "/business";

// Base endpoint for all project-related operations
export const PROJECT_END_POINT = "/project";
// Endpoint for creating a new business profile
export const BUSINESS_PROFILE_END_POINT = "/profiles";

// Endpoint to retrieve, update, or delete a specific business using its unique business ID
export const BUSINESS_ID_END_POINT = "/:business_id";

// Endpoint for updating business information by its unique business ID
export const BUSINESS_UPDATE_END_POINT = "/:business_id";

// Endpoint for retrieving all businesses in the system
export const ALL_BUSINESS_END_POINT = "/all";

// Endpoint for creating/registering a new business
export const CREATE_BUSINESS_END_POINT = "/register";

// Endpoint to create a new project under a specific business by its business ID
export const CREATE_BUSINESS_PROJECT_END_POINT = "/:business_id/project";

// Endpoint for freelancers to retrieve all projects associated with them using their freelancer ID
export const GET_ALL_BUSINESS_PROJECT_END_POINT = "/:freelancer_id/all_project";

// Endpoint to delete a specific project under a business using the business ID and project ID
export const DELETE_BUSINESS_PROJECT_END_POINT =
  "/:business_id/project/:project_id";

// Endpoint to retrieve all projects associated with a specific business by its business ID
export const GET_BUSINESS_PROJECT_BY_ID = "/:business_id/projects";

// Endpoint to retrieve a single project by its project ID and the freelancer's ID
export const GET_BUSINESS_SINGLE_PROJECT_BY_ID =
  "/:project_id/:freelancer_id/project";

// Endpoint to retrieve a single project by its project ID without verifying additional data (e.g., freelancer ID)
export const GET_BUSINESS_SINGLE_PROJECT_BY_ID_WITH_OUT_CHECK =
  "/:project_id/project";

// Endpoint for retrieving all projects in the system
export const ALL_PROJECT_ENDPOINT = "/all_projects";

// Endpoint to update the status of a specific project using its project ID
export const UPDATE_STATUS_BY_PROJECT_ID = "/:project_id/updateStatus";

// Endpoint to update the project profile for a specific project and profile using project ID and profile ID
export const UPDATE_BUSINESS_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";

// Endpoint to retrieve a single project profile using the project ID and profile ID
export const GET_BUSINESS_SINGLE_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";

// Endpoint to delete a project profile by the project ID and profile ID
export const DELETE_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";

// Endpoint to retrieve a project's details and its related bids using the project ID
export const GET_PROJECT_AND_BIDS_DATA_BY_PROJECT_ID = "/project/:project_id";
