import { log } from "@/libraries/Log";
import { Employee } from "@/models/Employee";
import { mapNewEmployeeData } from "@/mappers/employeeMapper";
import { handleCommonServerErrors, Controller } from "@/libraries/Controller";
import { Request, Response } from "express";

export class EmployeeService {
  public async handleCreateEmployee(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      const newEmployeeData = mapNewEmployeeData(requestBody);
      const newEmployee = await Employee.create(newEmployeeData);
      return Controller.created(res, newEmployee);
    } catch (error) {
      log.error("An errror occurred when creating a new employee");
      log.error(error.message);
      return handleCommonServerErrors(error, res);
    }
  }
}

const employeeService: EmployeeService = new EmployeeService();
export default employeeService;
