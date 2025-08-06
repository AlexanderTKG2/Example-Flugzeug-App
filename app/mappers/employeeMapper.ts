import { Employee } from "@/models/Employee";

export type CreateEmployeeMapperParam = {
  [key: string]: any;
};

export const mapNewEmployeeData = (
  data: CreateEmployeeMapperParam,
): Partial<Employee> => {
  const hireDate = new Date();
  hireDate.setHours(0);
  hireDate.setMinutes(0);
  hireDate.setSeconds(0);
  hireDate.setMilliseconds(0);
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    position: data.position,
    salary: data.salary,
    workEmail: data.workEmail,
    personalEmail: data.personalEmail,
    personalPhone: data.personalPhone,
    hireDate: hireDate, // date only
    country: data.country,
    isActive: true,
  };
};
