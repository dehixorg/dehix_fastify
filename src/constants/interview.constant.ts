// Base endpoint for interview-related operations
export const INTERVIEW = "/interview";

// Endpoint for creating a new interview for a specific interviewee by their ID
export const CREATE_INTERVIEW_END_POINT = "/:interviewee_id";

// Endpoint for updating an existing interview by its interview ID
export const UPDATE_INTERVIEW_END_POINT = "/:interview_id";

// Endpoint for fetching all interviews
export const GET_ALL_INTERVIEW = "/all_interview";

// Endpoint for fetching completed interviews for a specific interviewee by their ID
export const CompletedInterviewForInterviewee =
  "/:interviewee_id/completedinterview";

// Endpoint for fetching current (ongoing or upcoming) interviews for a specific interviewee by their ID
export const CurrentInterviewForInterviewee =
  "/:interviewee_id/currentinterview";
