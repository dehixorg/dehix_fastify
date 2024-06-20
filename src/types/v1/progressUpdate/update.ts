interface ProgressUpdateParams {
  subscription_id: string;
  vendor_id: string;
}

interface ProgressUpdateBody {
  steps: [{ name: string; is_required: boolean; status: string }];
  is_basic_profile_completed: boolean;
}
export interface ProgressUpdate {
  Body: ProgressUpdateBody;
  Params: ProgressUpdateParams;
}
