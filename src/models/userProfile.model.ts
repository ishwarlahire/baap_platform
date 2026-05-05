import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },

    bio: {
      type: DataTypes.TEXT
    },

    avatar_url: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: "user_profiles",
    timestamps: true
  }
);

export default UserProfile;