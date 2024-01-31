import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+\d{1,3}\d{3,14}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+\d{1,3}\d{3,14}$/),
});
