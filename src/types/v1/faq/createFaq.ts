export interface CreateFaqBody {
  question: string;
  answer: string;
  type: "business" | "freelancer" | "both";
  status: "active" | "inactive";
  importantUrl?: {
    urlName: string;
    url: string;
  }[];
}
