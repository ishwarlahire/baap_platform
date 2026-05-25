import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  status_id: string;
  start_date?: Date;
  end_date?: Date;
  created_by: string;
  project_type_id?:string;


}

type ProjectCreationAttributes = Optional<ProjectAttributes, "id">;

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes {

  public id!: string;
  public name!: string;
  public description?: string;
  public status_id!: string;
  public start_date?: Date;
  public end_date?: Date;
  public created_by!: string;
  public project_type_id?:string;


  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "project_status",
        key: "id"
      }
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    project_type_id: {
  type: DataTypes.UUID,
  allowNull: true,
  references: {
    model: "project_types",
    key: "id"
  }
}

  },
  {
    sequelize,
    tableName: "projects",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default Project;