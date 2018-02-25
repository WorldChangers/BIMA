import Joi from 'joi';

export default {
  signup: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      company: Joi.string().required(),
    },
  },
};
