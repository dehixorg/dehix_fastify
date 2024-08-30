export interface createNotificationBody {
  heading: string;
  description: string;
  type: "business" | "freelancer" | "both";
  status: "active" | "inactive";
  background_img: string;
  importantUrl?: {
    urlName: string;
    url: string;
  }[];
}
