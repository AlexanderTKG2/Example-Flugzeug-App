import { ModelController } from "@/libraries/ModelController";
import { validateBody } from "@/libraries/Validator";
import { CreateEmployeeSchema } from "@/validators/Employee";
import { Employee } from "@/models/Employee";
import employeeService from "@/services/EmployeeService";
import { Router, Request, Response } from "express";
import {
  validateJWT,
  filterOwner,
  appendUser,
  stripNestedObjects,
} from "@/policies/General";

export class EmployeeController extends ModelController<Employee> {
  constructor() {
    super();
    this.name = "employee";
    this.model = Employee;
  }

  routes(): Router {
    this.router.get("/", (req: Request, res: Response) =>
      this.handleFindAll(req, res),
    );
    this.router.get("/:id", (req: Request, res: Response) =>
      this.handleFindOne(req, res),
    );
    // update this
    // stripNestedObjects(),
    this.router.post(
      "/",
      validateBody(CreateEmployeeSchema),
      (req: Request, res: Response) =>
        employeeService.handleCreateEmployee(req, res),
    );
    // update thus
    this.router.put(
      "/:id",
      stripNestedObjects(),
      (req: Request, res: Response) => this.handleUpdate(req, res),
    );
    this.router.delete("/:id", (req: Request, res: Response) =>
      this.handleDelete(req, res),
    );

    return this.router;
  }
}

const employee = new EmployeeController();
export default employee;
