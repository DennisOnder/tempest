// tslint:disable
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { Database } from "../db/Database";

@Table({ timestamps: true })
export class User extends Model<User> {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;
}

Database.addModels([User]);
