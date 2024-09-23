export const BUSINESS_END_POINT = "/business";
export const BUSINESS_ID_END_POINT = "/:business_id";
export const BUSINESS_UPDATE_END_POINT = "/:business_id";
export const ALL_BUSINESS_END_POINT = "/all";
export const CREATE_BUSINESS_END_POINT = "/register";
export const CREATE_BUSINESS_PROJECT_END_POINT = "/:business_id/project";
export const GET_ALL_BUSINESS_PROJECT_END_POINT = "/:freelancer_id/all_project";
export const DELETE_BUSINESS_PROJECT_END_POINT =
  "/:business_id/project/:project_id";
export const GET_BUSINESS_PROJECT_BY_ID = "/:business_id/projects";
export const GET_BUSINESS_SINGLE_PROJECT_BY_ID =
  "/:project_id/:freelancer_id/project";
export const GET_BUSINESS_SINGLE_PROJECT_BY_ID_WITH_OUT_CHECK =
  "/:project_id/project";
export const ALL_PROJECT_ENDPOINT = "/all_projects";
export const UPDATE_STATUS_BY_PROJECT_ID = "/:project_id/updateStatus"

// project profile
export const UPDATE_BUSINESS_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";
export const GET_BUSINESS_SINGLE_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";
export const DELETE_PROJECT_PROFILE_BY_ID =
  "/:project_id/:profile_id/project/profile";
export const GET_PROJECT_AND_BIDS_DATA_BY_PROJECT_ID = "/project/:project_id";
