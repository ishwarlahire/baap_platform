import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface StudentMarkAttributes {
  id: string;
  student_id: string;
  subject: string;
  marks: number;
}

type StudentMarkCreationAttributes = Optional<StudentMarkAttributes, "id">;

class StudentMark
  extends Model<StudentMarkAttributes, StudentMarkCreationAttributes>
  implements StudentMarkAttributes
{
  public id!: string;
  public student_id!: string;
  public subject!: string;
  public marks!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

StudentMark.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    sequelize,
    tableName: "student_marks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default StudentMark;