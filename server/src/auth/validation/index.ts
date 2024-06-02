import * as joi from 'joi';

export const signUpSchema = joi.object({
  fullname: joi.string().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  avatar: joi.string(),
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});
