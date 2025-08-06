import { mapNewEmployeeData } from "../../app/mappers/employeeMapper";
import createEmployeeMockData from "../mockData/createEmployeeData.mock.json";

describe("Map new employee data", () => {
  const hireDate = new Date();
  hireDate.setHours(0);
  hireDate.setMinutes(0);
  hireDate.setSeconds(0);
  hireDate.setMilliseconds(0);

  const mappedEmployeeMockData = {
    firstName: createEmployeeMockData.firstName,
    lastName: createEmployeeMockData.lastName,
    fullName: `${createEmployeeMockData.firstName} ${createEmployeeMockData.lastName}`,
    position: createEmployeeMockData.position,
    salary: createEmployeeMockData.salary,
    workEmail: createEmployeeMockData.workEmail,
    personalEmail: createEmployeeMockData.personalEmail,
    personalPhone: createEmployeeMockData.personalPhone,
    hireDate: hireDate,
    country: createEmployeeMockData.country,
    isActive: true,
  };

  it("should return mapped object containing the valid data to create a new employee", () => {
    expect(mapNewEmployeeData).toBeDefined();
    const mappedEmployee = mapNewEmployeeData(createEmployeeMockData);
    expect(mappedEmployee).toBeTruthy();
    expect(mappedEmployee).toEqual(mappedEmployeeMockData);
  });
});
