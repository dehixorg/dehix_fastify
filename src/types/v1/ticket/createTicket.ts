export interface createTicketBody {
  customerID: string;
  customerType: "business" | "freelancer";
  description: string;
  filesAttached: string;
  status: "created" | "closed" | "active";
  subject: string;
}
