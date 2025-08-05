import Joi from "joi";

export const CreateEmployeeSchema: Joi.ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  position: Joi.string().required(),
  salary: Joi.number().required(),
  workEmail: Joi.string()
    .email()
    .max(255)
    .required(),
  personalEmail: Joi.string()
    .email()
    .max(255)
    .optional(),
  personalPhone: Joi.string()
    .pattern(/[0-9]/)
    .min(10)
    .max(14)
    .optional(),
  country: Joi.string().optional(),
});
