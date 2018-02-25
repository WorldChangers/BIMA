import Joi from 'joi';

export default {
  create: {
    body: {
      regNumber: Joi.string().required(),
      chassisNumber: Joi.string().required(),
      purpose: Joi.string().required(),
      insuranceType: Joi.string().required(),
      owner: Joi.string().required(),
    },
  },
};
