import Joi from 'joi';

export default {
  create: {
    body: {
      fullname: Joi.string().required(),
      phone: Joi.number().required(),
      idType: Joi.string().required(),
      id: Joi.string().required(),
      location: Joi.string().required(),
    },
  },
};
