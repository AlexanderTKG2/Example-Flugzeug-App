import { Table, Column, DataType } from "sequelize-typescript";
import { BaseModel } from "@/libraries/BaseModel";

@Table({
  tableName: "employee",
})
export class Employee extends BaseModel<Employee> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataType.DECIMAL(),
    allowNull: false,
    defaultValue: 0,
  })
  salary: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  workEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  personalEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  personalPhone: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  hireDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  country: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;
}
