import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BaseModel } from "@/libraries/BaseModel";

@Table({
  tableName: "employee",
})
export class Employee extends BaseModel<Employee> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name: string;
}
