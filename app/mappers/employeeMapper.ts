import { Employee } from "@/models/Employee";

export type CreateEmployeeMapperParam = {
  [key: string]: any;
};

export const mapNewEmployeeData = (
  data: CreateEmployeeMapperParam,
): Partial<Employee> => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    position: data.position,
    salary: data.salary,
    workEmail: data.workEmail,
    personalEmail: data.personalEmail,
    personalPhone: data.personalPhone,
    hireDate: new Date(),
    country: data.country,
    isActive: true,
  };
};
