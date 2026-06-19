import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
import {
  DESIGN_VERSION_STATUS,
  DesignVersionStatus,
} from "../constants/design-version.constant";

interface DesignVersionAttributes {
  id: string;
  design_record_id: string;
  version_number: string;
  version_seq: number;
  version_description?: string;
  status: DesignVersionStatus;
  is_rollback?: boolean;
  rolled_back_from?: string;
  parent_version_id?: string;
  rejection_reason?: string;
  created_by: string;
  updated_by?: string;
}

type DesignVersionCreationAttributes = Optional<
  DesignVersionAttributes,
  | "id"
  | "version_description"
  | "is_rollback"
  | "rolled_back_from"
  | "parent_version_id"
  | "rejection_reason"
  | "updated_by"
>;

class DesignVersion
  extends Model<
    DesignVersionAttributes,
    DesignVersionCreationAttributes
  >
  implements DesignVersionAttributes
{
  public id!: string;
  public design_record_id!: string;
  public version_number!: string;
  public version_seq!: number;
  public version_description?: string;
  public status!: DesignVersionStatus;
  public is_rollback?: boolean;
  public rolled_back_from?: string;
  public parent_version_id?: string;
  public rejection_reason?: string;
  public created_by!: string;
  public updated_by?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

DesignVersion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    design_record_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "design_records",
        key: "id",
      },
    },

    version_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    version_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    version_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(...DESIGN_VERSION_STATUS),
      allowNull: false,
      defaultValue: "draft",
    },

    is_rollback: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    rolled_back_from: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    parent_version_id: {
      type: DataTypes.UUID,
      allowNull: true
    //   references: {
    //     model: "design_versions",
    //     key: "id",
    //   },
    },

    rejection_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "design_versions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default DesignVersion;