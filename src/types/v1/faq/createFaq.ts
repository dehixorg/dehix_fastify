export interface createFaqBody {
  question: string;
  answer: string;
  type: "business" | "freelancer" | "both";
  status: "active" | "inactive";
  importantUrl?: {
    urlName: string;
    url: string;
  }[];
}
