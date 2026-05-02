import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface ProjectStatusAttributes {
  id: string;
  name: string;
  description?: string;
  is_default?: boolean;
}

type ProjectStatusCreationAttributes = Optional<ProjectStatusAttributes, "id">;


class ProjectStatus
  extends Model<ProjectStatusAttributes, ProjectStatusCreationAttributes>
  implements ProjectStatusAttributes {

  public id!: string;
  public name!: string;
  public description?: string;
  public is_default?: boolean;
}

ProjectStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: "project_status",
    timestamps: false
  }
);

export default ProjectStatus;