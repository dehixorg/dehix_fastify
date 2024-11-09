export interface GetTicketPathParams {
  ticket_id: string;
}

export interface GetTicketByCustomerTypeQueryParams {
  customerType: "business" | "freelancer";
}
export interface GetTicketByStatusQueryParams {
  status: "created" | "closed" | "active";
}
export interface GetTicketBySubjectQueryParams {
  subject: string;
}
export interface GetTicketByCustomerIDQueryParams {
  customerID: string;
}
