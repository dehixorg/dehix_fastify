import { Sequelize, DataTypes, Model } from 'sequelize';

export const ProjectModel = (sequelize: Sequelize) => {
  class Project extends Model {
    public id!: string;
    public projectName!: string;
    public Description!: string;
    public Email!: string;
    public verified?: any;
    public isVerified?: string;
    public CompanyName!: string;
    public Start?: Date;
    public End?: Date;
    public SkillsRequired!: string[];
    public experience?: string;
    public Role!: string;
    public projectType!: string;
    public TotalNeedOffreelancer?: {
      category?: string;
      needOfFreelancer?: number;
      appliedCandidates?: string[];
      rejected?: string[];
      accepted?: string[];
      status?: string;
    }[];
    public status?: string;
    public team?: string[];
  }

  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    End: {
      type: DataTypes.DATE,
      allowNull: true
    },
    SkillsRequired: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalNeedOffreelancer: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    },
    team: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: "project_list_by_company",
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  return Project;
}
