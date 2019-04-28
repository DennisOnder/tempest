// tslint:disable
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { Database } from "../db/Database";

@Table({ timestamps: true })
export class Post extends Model<Post> {
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  handle: string;

  @Column(DataType.STRING(5000))
  body: string;
}

Database.addModels([Post]);
