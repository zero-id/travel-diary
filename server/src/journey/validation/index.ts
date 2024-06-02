import * as joi from 'joi';

export const createJourneySchema = joi.object({
  userId: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string(),
});

export const updateJourneySchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string(),
});
