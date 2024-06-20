export interface UserSubscriptionBody {
  user_id: string;
  subscription_id: string;
  status: string;
  meta_data: object;
  trial_end: string;
}
