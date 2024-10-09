// Define the base endpoint for admin-related operations
export const ADMIN_ENDPOINT = "/admin";

// Endpoint for creating a new admin
export const ADMIN_ID_ENDPOINT = "/create";

// Endpoint for deleting an admin by their unique ID
export const DELETE_ADMIN_BY_ID_ENDPOINT = "/:admin_id";

// Endpoint for fetching all admins
export const ADMIN_ALL_ENDPOINT = "/all";

// Endpoint for fetching a specific admin by their unique ID
export const ADMIN_BY_ID_ENDPOINT = "/:admin_id";
export const GET_ALL_ADMIN_ENDPOINT = "/all/admin";
export const ADMIN_ALL_SKILL_ENDPOINT="/admin/all/domains"