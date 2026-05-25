import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface ProjectTypeAttributes {
  id: string;
  name: string;
  description?: string;
  is_default?: boolean;
  created_by?: string;
  updated_by?: string;
}

type ProjectTypeCreationAttributes = Optional<ProjectTypeAttributes, "id">;

class ProjectType
  extends Model<ProjectTypeAttributes, ProjectTypeCreationAttributes>
  implements ProjectTypeAttributes {

  public id!: string;
  public name!: string;
  public description?: string;
  public is_default?: boolean;
  public created_by?: string;
  public updated_by?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProjectType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true 
    },
    description: {
      type: DataTypes.TEXT
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_by: {
      type: DataTypes.UUID
    },
    updated_by: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize,
    tableName: "project_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default ProjectType;