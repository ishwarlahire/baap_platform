import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  age?: number;
  is_active?: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;


class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  public id!: string;
  public firstname!: string;
  public middlename?: string;
  public lastname!: string;
  public email!: string;
  public age?: number;
  public is_active?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middlename: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true
  }
);

export default User;