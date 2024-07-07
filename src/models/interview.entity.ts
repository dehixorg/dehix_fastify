import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInterview extends Document {
  interviewer: string;
  interviewee: string;
  skill: string;
  interviewDate: Date;
  rating: number | string;
  comments?: string;
}

const InterviewSchema: Schema<IInterview> = new Schema(
  {
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },
    interviewee: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: Schema.Types.Date,
      required: true,
    },
    rating: {
      type: Schema.Types.Mixed,
      default: "pending",
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const InterviewModel: Model<IInterview> = mongoose.model<IInterview>(
  "Interview",
  InterviewSchema,
);

export default {
  InterviewModel,
};
