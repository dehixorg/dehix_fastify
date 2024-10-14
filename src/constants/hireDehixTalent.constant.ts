// Endpoint for hiring a Dehix Talent by a specific business ID
export const HIRE_CREATE_ENDPOINT = "/:business_id/hireDehixTalent";

// Endpoint for updating a hire record for Dehix Talent by its hire ID
export const HIRE_UPDATE_BY_ID_ENDPOINT =
  "/hireDehixTalent/:hireDehixTalent_id";

// Endpoint for deleting a hire record for Dehix Talent by its hire ID
export const HIRE_DELETE_BY_ID_ENDPOINT =
  "/hireDehixTalent/:hireDehixTalent_id";

// Endpoint for retrieving hire details of Dehix Talent for a specific business ID
export const GET_HIRE_BY_ID_ENDPOINT = "/:business_id/hireDehixTalent";

// Endpoint for updating a specific hire record for Dehix Talent by business ID and hire ID
export const HIRE_DEHIX_TALENT_UPDATE_BY_ID =
  "/:business_id/hireDehixTalent/:hireDehixTalent_id";

// Endpoint for add Dehix Talent into Hire Talent lobby by hireDehixTalent ID
export const ADD_TALENT_INTO_LOBBY_ENDPOINT =
  "/hireDehixTalent/:hireDehixTalent_id/addIntoLobby";
