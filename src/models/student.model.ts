import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface StudentAttributes {
  id: string;
  first_name: string;
  last_name: string;
  roll_number: number;
  standard: string;
  division: string;
  dob: Date;
}

type StudentCreationAttributes = Optional<StudentAttributes, "id">;

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public roll_number!: number;
  public standard!: string;
  public division!: string;
  public dob!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    roll_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    standard: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    division: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Student;