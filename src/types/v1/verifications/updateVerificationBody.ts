export interface PatchOracleBody {
  verification_status: "Pending" | "Approved" | "Denied";
  comments: string;
}
export interface PutCommentBody {
  comment: string;
  verifiedAt: Date;
}
