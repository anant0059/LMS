import Joi from "@hapi/joi";

export default {
  signUp: Joi.object().keys({
    useremailid: Joi.string().email().required(),
    username: Joi.string().max(30).required(),
    password: Joi.string().min(8),
    role: Joi.string(),
  }),

  signin: Joi.object().keys({
    useremailid: Joi.string().email().required(),
    password: Joi.string().min(8),
  }),

  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),

  logout: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
