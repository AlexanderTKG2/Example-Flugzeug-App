import { CreateEmployeeSchema } from "../../app/validators/Employee";

describe("Employee object validators", () => {
  const validatorOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
    convert: false,
    errors: {
      escapeHtml: true,
    },
  };

  describe("Create employee schema validator", () => {
    const validCreateEmployeeDataMinParamsMockData = {
      firstName: "firstName",
      lastName: "lastName",
      position: "position",
      salary: 100,
      workEmail: "email@example.com",
    };

    const invalidCreateEmployeeMockData = {
      firstName: "John",
      lastName: "Doe",
      position: "Worker",
      personalEmail: "invalid format",
      personalPhone: "invalid format",
    };

    it("should succeed if an object conforms to the create employee schema", () => {
      const { error, value } = CreateEmployeeSchema.validate(
        validCreateEmployeeDataMinParamsMockData,
        validatorOptions,
      );
      expect(error).toBeFalsy();
      expect(value).toBeTruthy();
    });

    it("should fail if an object does not conform to the create employee schema", () => {
      const { error, value } = CreateEmployeeSchema.validate(
        invalidCreateEmployeeMockData,
        validatorOptions,
      );

      expect(error).toBeTruthy();
      expect(value).toEqual(invalidCreateEmployeeMockData);
    });

    it("should fail if an empty object is provided as a parameter", () => {
      const { error, value } = CreateEmployeeSchema.validate(
        {},
        validatorOptions,
      );
      expect(error).toBeTruthy();
      expect(value).toEqual({});
    });
  });
});
