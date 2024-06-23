import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface for the Freelancer document
export interface IFreelancer extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
  refer?: {
    email?: string;
    name?: string;
    linkedin?: string;
  };
  verified_by?: {
    ref: 'freelancer_data';
  };
  isVerified: boolean;
  linkedin?: string;
  personalWebsite?: string;
  isFreelancer: boolean;
  connects: number;
  professional_info?: {
    Company?: string;
    Job_Title?: string;
    Work_Description?: string;
    Work_From?: Date;
    Work_To?: Date;
    Reference_Person_Name?: string;
    Reference_Person_Contact?: string;
    GitHub_Repo_Link?: string;
    Oracle_Assigned?: any;
    Verification_Status?: 'added' | 'verified' | 'rejected' | 'reapplied';
    Verification_Update_Time?: Date;
    Comments?: string;
  };
  projects?: {
    project_name: string;
    description: string;
    verified?: any;
    github_link: string;
    start?: Date;
    end?: Date;
    refer: string;
    tech_used: string[];
    role: string;
    project_type?: string;
    oracle_assigned?: any;
    verification_status?: 'added' | 'verified' | 'rejected' | 'reapplied';
    verification_update_time?: Date;
    comments?: string;
  }[];
  skills?: {
    skill_id: string;
    skill_label: string;
  }[];
}

// Define the Freelancer schema
const FreelancerSchema: Schema<IFreelancer> = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    required: true,
  },
  position: {
    type: String,
    required: false,
  },
  refer: {
    email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  verified_by: {
    ref: {
      type: String,
      enum: ['freelancer_data'],
      required: false,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  personalWebsite: {
    type: String,
    required: false,
  },
  isFreelancer: {
    type: Boolean,
    default: true,
    required: true,
  },
  connects: {
    type: Number,
    default: 0,
  },
  professional_info: {
    Company: {
      type: String,
      required: false,
    },
    Job_Title: {
      type: String,
      required: false,
    },
    Work_Description: {
      type: String,
      required: false,
    },
    Work_From: {
      type: Date,
      required: false,
    },
    Work_To: {
      type: Date,
      required: false,
    },
    Reference_Person_Name: {
      type: String,
      required: false,
    },
    Reference_Person_Contact: {
      type: String,
      required: false,
    },
    GitHub_Repo_Link: {
      type: String,
      required: false,
    },
    Oracle_Assigned: {
      type: Schema.Types.ObjectId,
      ref: 'FreelancerData', // Assuming the related model name is 'FreelancerData'
      required: false,
    },
    Verification_Status: {
      type: String,
      enum: ['added', 'verified', 'rejected', 'reapplied'],
      required: false,
    },
    Verification_Update_Time: {
      type: Date,
      required: false,
    },
    Comments: {
      type: String,
      required: false,
    },
  },
  projects: [
    {
      project_name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      verified: {
        type: Schema.Types.Mixed,
        required: false,
      },
      github_link: {
        type: String,
        required: true,
      },
      start: {
        type: Date,
        required: false,
      },
      end: {
        type: Date,
        required: false,
      },
      refer: {
        type: String,
        required: true,
      },
      tech_used: {
        type: [String],
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      project_type: {
        type: String,
        required: false,
      },
      oracle_assigned: {
        type: Schema.Types.ObjectId,
        ref: 'FreelancerData', // Assuming the related model name is 'FreelancerData'
        required: false,
      },
      verification_status: {
        type: String,
        default: 'added',
        enum: ['added', 'verified', 'rejected', 'reapplied'],
        required: false,
      },
      verification_update_time: {
        type: Date,
        required: false,
      },
      comments: {
        type: String,
        required: false,
      },
    },
  ],
  skills: [
    {
      skill_id: {
        type: String,
        required: true,
      },
      skill_label: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true, // Add createdAt and updatedAt fields
  versionKey: false, // Disable __v versioning field
});

// Create and export the Freelancer model
export const FreelancerModel: Model<IFreelancer> = mongoose.model<IFreelancer>('Freelancer', FreelancerSchema);

export default {
  FreelancerModel,
};
