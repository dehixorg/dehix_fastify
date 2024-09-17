export interface DehicTalentPathParams {
  freelancer_id: string;
  dehixTalent_id: string;
}

export interface PutDehixTalentBody {
  status?: "pending" | "verified" | "rejected";
  activeStatus?: boolean;
}
