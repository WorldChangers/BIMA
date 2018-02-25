import Joi from 'joi';

export default {
  signup: {
    body: {
      name: Joi.string().required(),
      phone: Joi.number().required(),
      email: Joi.string().email(),
      passsword: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
      organisation: Joi.string().required(),
    },
  },
};
