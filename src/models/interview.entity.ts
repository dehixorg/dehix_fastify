import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface IInterview extends Document {
  _id: string;
  interviewer: string;
  interviewee: string;
  skill: string;
  interviewDate: Date;
  rating: number;
  comments?: string;
}

const InterviewSchema: Schema<IInterview> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    interviewer: {
      type: String,
      ref: "Freelancer",
      required: true,
    },
    interviewee: {
      type: String,
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
      type: Number,
      default: 0,
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
