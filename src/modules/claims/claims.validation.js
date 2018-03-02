import Joi from 'joi';

export default {
  create: {
    body: {
      type: Joi.string().required(),
      date: Joi.string().required(),
      description: Joi.string().required(),
      vehicle: Joi.string().required(),
    },
  },
};
