export interface UpdateInterviewBody {
  interviewer: string;
  interviewee: string;
  skill: string;
  interviewDate: Date;
  rating: number;
  comments?: string;
}
