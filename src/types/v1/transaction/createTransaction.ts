export interface createTransactionBody {
  from: string;
  to: string;
  amount: number;
  type: "payment" | "referral" | "rewards" | "system generated";
  reference: string;
  from_type: "system" | "freelancer" | "business" | "admin";
  reference_id: string;
}