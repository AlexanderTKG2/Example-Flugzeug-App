import { ModelController } from "@/libraries/ModelController";
import { Employee } from "@/models/Employee";
import { Router } from "express";
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
    this.router.get("/", (req, res) => this.handleFindAll(req, res));
    this.router.get("/:id", (req, res) => this.handleFindOne(req, res));
    this.router.post("/", stripNestedObjects(), (req, res) =>
      this.handleCreate(req, res),
    );
    this.router.put("/:id", stripNestedObjects(), (req, res) =>
      this.handleUpdate(req, res),
    );
    this.router.delete("/:id", (req, res) => this.handleDelete(req, res));

    return this.router;
  }
}

const employee = new EmployeeController();
export default employee;
