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

  createCourse: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    instructor: Joi.string().required(),
    price: Joi.number().required(),
  }),

  enrollInCourse: Joi.object().keys({
    courseid: Joi.string().required(),
    userid: Joi.string().required(),
  }),

  createLesson: Joi.object().keys({
    title: Joi.string().required(),
    courseid: Joi.string().required(),
    courseid: Joi.string().required(),
    videourl: Joi.string().uri().required(),
    resources: Joi.array().items(Joi.string().uri()),
  }),

  completeLesson: Joi.object().keys({
    lessonid: Joi.string().required(),
  }),

  createQuestion: Joi.object().keys({
    text: Joi.string().required(),
    options: Joi.array()
      .items(
        Joi.object().keys({
          text: Joi.string().required(),
          is_correct: Joi.boolean().required(),
        })
      )
      .min(2)
      .required(),
  }),

  createQuiz: Joi.object().keys({
    courseid: Joi.string().required(),
    questions: Joi.array()
      .items(Joi.array().items(Joi.string().required()))
      .min(1)
      .required(),
  }),

  attemptQuiz: Joi.object().keys({
    quizid: Joi.string().required(),
    answers: Joi.array()
      .items(
        Joi.object().keys({
          questionid: Joi.string().required(),
          optionid: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  }),
};
