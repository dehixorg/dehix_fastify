export interface DehixTalentPathParams {
  freelancer_id: string;
  dehixTalent_id: string;
}

export interface PutDehixTalentBody {
  status?: "pending" | "verified" | "rejected";
  activeStatus?: boolean;
}
