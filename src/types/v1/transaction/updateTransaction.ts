export interface PutTransactionBody {
  type: "payment" | "referral" | "rewards" | "system generated";
  reference: string;
  status: "system" | "freelancer" | "business" | "admin";
  reference_id: string;
}
