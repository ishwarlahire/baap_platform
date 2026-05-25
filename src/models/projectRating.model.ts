import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface ProjectRatingAttributes {
  id: string;
  project_id: string;
  client_id: string;
  user_id?: string;
  rating: number;
  comment?: string;
  is_deleted?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

type ProjectRatingCreationAttributes = Optional<ProjectRatingAttributes, "id">;

class ProjectRating
  extends Model<ProjectRatingAttributes, ProjectRatingCreationAttributes>
  implements ProjectRatingAttributes
{
  public id!: string;
  public project_id!: string;
  public client_id!: string;
  public user_id?: string;
  public rating!: number;
  public comment?: string;
  public is_deleted?: boolean;
  public created_by?: string;
  public updated_by?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProjectRating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    //   references: {
    //     model: "clients",
    //     key: "id",
    //   },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "project_ratings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ProjectRating;