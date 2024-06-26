import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ISkill extends Document {
  _id: string;
  name: string;
  level: string;
  experience: string;
  interviewStatus?: "pending" | "accepted" | "rejected" | "reapplied";
  interviewInfo?: mongoose.Types.ObjectId;
  interviewerRating?: number;
}
export interface IFreelancer extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  dob?: Date;
  professionalInfo?: {
    company?: string;
    jobTitle?: string;
    workDescription?: string;
    workFrom?: Date;
    workTo?: Date;
    referencePersonName?: string;
    referencePersonContact?: string;
    githubRepoLink?: string;
    oracleAssigned?: mongoose.Types.ObjectId;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
  }[];
  skills?: ISkill[];
  education?: {
    degree?: string;
    universityName?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
    grade?: string;
    oracleAssigned?: mongoose.Types.ObjectId;
    verificationStatus?: "added" | "verified" | "rejected" | "reapplied";
    verificationUpdateTime?: Date;
    comments?: string;
  }[];
  role?: string;
  projects?: {
    [key: string]: {
      _id?: string;
      projectName: string;
      description: string;
      verified: boolean;
      githubLink: string;
      start: Date;
      end: Date;
      refer: string;
      techUsed: string[];
      role: string;
      projectType: string;
      oracleAssigned: string;
      verificationStatus: "added" | "verified" | "rejected" | "reapplied";
      verificationUpdateTime: Date;
      comments: string;
    };
  };
  refer?: {
    name?: string;
    contact?: string;
  };
  githubLink?: string;
  linkedin?: string;
  personalWebsite?: string;
  perHourPrice?: number;
  connects?: number;
  resume?: Buffer;
  workExperience?: number;
  isFreelancer?: boolean;
  oracleStatus?:
    | "notApplied"
    | "applied"
    | "approved"
    | "failed"
    | "stopped"
    | "reapplied";
  consultant?: {
    status:
      | "notApplied"
      | "applied"
      | "approved"
      | "failed"
      | "stopped"
      | "reapplied";
  };
  pendingProject?: mongoose.Types.ObjectId[];
  rejectedProject?: mongoose.Types.ObjectId[];
  acceptedProject?: mongoose.Types.ObjectId[];
  oracleProject?: mongoose.Types.ObjectId[];
  userDataForVerification?: mongoose.Types.ObjectId[];
  interviewsAligned?: mongoose.Types.ObjectId[];
}

const FreelancerSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    professionalInfo: [
      {
        company: { type: String, required: false },
        jobTitle: { type: String, required: false },
        workDescription: { type: String, required: false },
        workFrom: { type: Date, required: false },
        workTo: { type: Date, required: false },
        referencePersonName: { type: String, required: false },
        referencePersonContact: { type: String, required: false },
        githubRepoLink: { type: String, required: false },
        oracleAssigned: {
          type: Schema.Types.ObjectId,
          ref: "FreelancerData",
          required: false,
        },
        verificationStatus: {
          type: String,
          enum: ["added", "verified", "rejected", "reapplied"],
          required: false,
        },
        verificationUpdateTime: { type: Date, required: false },
        comments: { type: String, required: false },
      },
    ],
    skills: [
      {
        _id: {
          type: String,
          default: uuidv4,
          required: true,
        },
        name: { type: String, required: false },
        level: { type: String, required: false },
        experience: { type: String, required: false },
        interviewStatus: {
          type: String,
          enum: ["pending", "accepted", "rejected", "reapplied"],
          default: "pending",
          required: false,
        },
        interviewInfo: {
          type: Schema.Types.ObjectId,
          ref: "Interview",
          required: false,
        },
        interviewerRating: { type: Number, required: false },
      },
    ],
    education: [
      {
        degree: { type: String, required: false },
        universityName: { type: String, required: false },
        fieldOfStudy: { type: String, required: false },
        startDate: { type: Date, required: false },
        endDate: { type: Date, required: false },
        grade: { type: String, required: false },
        oracleAssigned: {
          type: Schema.Types.ObjectId,
          ref: "FreelancerData",
          required: false,
        },
        verificationStatus: {
          type: String,
          enum: ["added", "verified", "rejected", "reapplied"],
          required: false,
        },
        verificationUpdateTime: { type: Date, required: false },
        comments: { type: String, required: false },
      },
    ],
    role: {
      type: String,
      required: false,
    },
    projects: {
      type: Map,
      of: new Schema(
        {
          _id: { type: String, required: true },
          projectName: { type: String, required: true },
          description: { type: String, required: true },
          verified: { type: Schema.Types.Mixed },
          githubLink: { type: String, required: true },
          start: { type: Date },
          end: { type: Date },
          refer: { type: String, required: true },
          techUsed: [{ type: String, required: true }],
          role: { type: String, required: true },
          projectType: { type: String },
          oracleAssigned: {
            type: String,
            ref: "Freelancer",
          },
          verificationStatus: {
            type: String,
            enum: ["added", "verified", "rejected", "reapplied"],
            default: "added",
          },
          verificationUpdateTime: { type: Date },
          comments: { type: String },
        },
        { _id: false },
      ),
    },
    refer: {
      name: { type: String, required: false },
      contact: { type: String, required: false },
    },
    githubLink: { type: String, required: false },
    linkedin: { type: String, required: false },
    personalWebsite: { type: String, required: false },
    perHourPrice: { type: Number, required: false },
    connects: { type: Number, default: 100 },
    resume: { type: Buffer, required: false },
    workExperience: { type: Number, required: false },
    isFreelancer: { type: Boolean, default: true, required: true },
    oracleStatus: {
      type: String,
      enum: [
        "notApplied",
        "applied",
        "approved",
        "failed",
        "stopped",
        "reapplied",
      ],
      required: false,
    },
    consultant: {
      status: {
        type: String,
        enum: [
          "notApplied",
          "applied",
          "approved",
          "failed",
          "stopped",
          "reapplied",
        ],
        default: "notApplied",
        required: false,
      },
    },
    pendingProject: [
      { type: Schema.Types.ObjectId, ref: "Project", required: false },
    ],
    rejectedProject: [
      { type: Schema.Types.ObjectId, ref: "Project", required: false },
    ],
    acceptedProject: [
      { type: Schema.Types.ObjectId, ref: "Project", required: false },
    ],
    oracleProject: [
      { type: Schema.Types.ObjectId, ref: "Project", required: false },
    ],
    userDataForVerification: [
      { type: Schema.Types.ObjectId, ref: "Verification", required: false },
    ],
    interviewsAligned: [
      { type: Schema.Types.ObjectId, ref: "Verification", required: false },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FreelancerModel: Model<IFreelancer> = mongoose.model<IFreelancer>(
  "Freelancer",
  FreelancerSchema,
);

export default {
  FreelancerModel,
};
