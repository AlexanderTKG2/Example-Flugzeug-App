import createNewEmployeeRequest from "../mockData/createNewEmployeeValidRequest.mock.json";
import employeeService from "../../app/services/EmployeeService";
import { Request, Response } from "express";

// Mocks at top level because of dependency mock hoisting

jest.mock("@/libraries/Log");

jest.mock("@/models/Employee", () => {
  return {
    Employee: {
      create: jest.fn(() => {
        return Promise.resolve(null);
      }),
    },
  };
});

jest.mock("@/mappers/employeeMapper", () => {
  return {
    mapNewEmployeeData: jest.fn(() => {
      return {};
    }),
  };
});

jest.mock("@/libraries/Controller", () => {
  return {
    handleServerError: jest.fn(),
    Controller: {
      created: jest.fn(() => {
        return null;
      }),
    },
  };
});

describe("Employee service", () => {
  const mockExpressResponse: Partial<Response> | any = {
    status: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn(),
        json: jest.fn(),
      };
    }),
  };
  const mockCreateRequest: Partial<Request> | any = createNewEmployeeRequest;

  let mockMapNewEmployeeDataModule = {
    mapNewEmployeeData: () => null,
  };
  let mockEmployeeModelModule = {
    Employee: {
      create: () => void 0,
    },
  };
  let mockControllerModule = {
    Controller: {
      created: () => void 0,
      ok: () => void 0,
      conflict: () => void 0,
    },
    handleServerError: null,
  };

  beforeAll(() => {
    mockMapNewEmployeeDataModule = require("@/mappers/employeeMapper");
    mockEmployeeModelModule = require("@/models/Employee");
    mockControllerModule = require("@/libraries/Controller");
  });

  it("should successfully call the handleCreateEmployee service function with valid request params", async () => {
    expect(employeeService.handleCreateEmployee).toBeDefined();
    expect(employeeService.handleCreateEmployee).toBeTruthy();

    await employeeService.handleCreateEmployee(
      mockCreateRequest,
      mockExpressResponse,
    );

    expect(mockMapNewEmployeeDataModule.mapNewEmployeeData).toBeDefined();
    expect(
      mockMapNewEmployeeDataModule.mapNewEmployeeData,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockMapNewEmployeeDataModule.mapNewEmployeeData,
    ).toHaveBeenCalledWith(mockCreateRequest.body);

    expect(mockEmployeeModelModule.Employee.create).toHaveBeenCalledTimes(1);
    expect(mockControllerModule.Controller.created).toHaveBeenCalledTimes(1);
  });
});
