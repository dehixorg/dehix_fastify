import { Sequelize, DataTypes, Model } from 'sequelize';

export const BusinessModel = (sequelize: Sequelize) => {
  class Business extends Model {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public companyName!: string;
    public companySize!: string;
    public password!: string;
    public Email!: string;
    public phone!: string;
    public Position?: string;
    public Refer?: string;
    public verified?: any;
    public isVerified!: boolean;
    public Linkdin?: string;
    public personalWebsite?: string;
    public isBusiness!: boolean;
    public connects!: number;
    public otp?: string;
    public otpverified?: string;
  }

  Business.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companySize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Refer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Linkdin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personalWebsite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isBusiness: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    connects: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otpverified: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: "business_data",
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  return Business;
}
