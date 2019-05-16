// tslint:disable
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { Database } from "../config/Database";

@Table({ timestamps: true })
export class Profile extends Model<Profile> {
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  handle: string;

  @Column(DataType.STRING)
  biography: string;
}

Database.addModels([Profile]);
