import * as joi from 'joi';

export const updateUserSchema = joi.object({
  id: joi.string().required(),
  fullname: joi.string().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  avatar: joi.string(),
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});
