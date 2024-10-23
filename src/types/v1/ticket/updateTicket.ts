export interface PutTicketBody {
    customerType?: string;
    description?: string;
    subject?: string;
  }

export interface PutTicketStatusBody {
    status?: string;
}