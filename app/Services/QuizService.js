import Logger from "../Utils/Logger.js";
import * as Exceptions from "../Exceptions/Exceptions.js";
import QuizRepository from "../db/Repository/QuizRepository.js";
import QuizAnswerRepository from "../db/Repository/QuizAnswerRepository.js";
import QuestionOptionRepository from "../db/Repository/QuestionOptionRepository.js";
import QuizQuestionRepository from "../db/Repository/QuizQuestionRepository.js";
import CourseRepository from "../db/Repository/CourseRepository.js";
import UserRepository from "../db/Repository/UserRepository.js";
import QuizAttemptRepository from "../db/Repository/QuizAttemptRepository.js";

export default class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.quizAnswerRepository = new QuizAnswerRepository();
    this.questionOptionRepository = new QuestionOptionRepository();
    this.quizQuestionRepository = new QuizQuestionRepository();
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
    this.quizAttemptRepository = new QuizAttemptRepository();
  }

  async createQuiz(userDetail, params) {
    try {
      Logger.debug(`Creating Quiz with params: ${JSON.stringify(params)}`);
      Logger.debug(`User details: ${JSON.stringify(userDetail)}`);
      const user = await this.userRepository.get({
        useremailid: userDetail.useremailid,
      });
      if (!user || user.role !== "admin") {
        throw new Exceptions.UnauthorizedException(
          "User does not have permission to create a quiz"
        );
      }

      const course = await this.courseRepository.get({
        courseid: params.courseid,
      });
      if (!course) {
        throw new Exceptions.NotFoundException("Course not found");
      }

      const quiz = await this.quizRepository.create({
        courseid: params.courseid,
      });
      if (!quiz) {
        throw new Exceptions.InternalServerErrorException(
          "Failed to create quiz"
        );
      }

      const quizQuestions = await Promise.all(
        params.questions.map((question, index) =>
          this.quizQuestionRepository.create({
            quizid: quiz.quizid,
            question: question,
            display_order: index + 1,
          })
        )
      );
      return { quiz, quizQuestions };
    } catch (error) {
      Logger.error(`Error creating question: ${error.message}`);
      throw error;
    }
  }

  async getQuiz(quizid) {
    try {
      Logger.debug(`Fetching Quiz with ID: ${quizid}`);
      const quiz = await this.quizRepository.getQuizWithQuestions(quizid);
      if (!quiz) {
        throw new Exceptions.NotFoundException("Quiz not found");
      }
      return quiz;
    } catch (error) {
      Logger.error(`Error fetching quiz: ${error.message}`);
      throw error;
    }
  }

  async attemptQuiz(userDetail, params) {
    try {
      Logger.debug(`Attempting Quiz with params: ${JSON.stringify(params)}`);
      const user = await this.userRepository.get({
        useremailid: userDetail.useremailid,
      });
      if (!user) {
        throw new Exceptions.NotFoundException("User not found");
      }

      const quiz = await this.quizRepository.getQuizWithQuestions(
        params.quizid
      );
      if (!quiz) {
        throw new Exceptions.NotFoundException("Quiz not found");
      }

      const answers = await Promise.all(
        params.answers.map(async (answerObj) => ({
          attemptid: attempt.attemptid,
          questionid: answerObj.questionid,
          optionid: answerObj.optionid,
          is_correct: await this.checkIfCorrect(answerObj.optionid),
        }))
      );

      //Save answers
      const quizAnswers = await Promise.all(
        answers.map((answer) => this.quizAnswerRepository.create(answer))
      );

      // Calculate score & update attempt
      const score = quizAnswers.filter((a) => a.is_correct).length;
      const quizAttempt = await this.quizAttemptRepository.create({
        userid: user.userid,
        quizid: quiz.quizid,
        score: score,
        finished_at: new Date(),
      });

      return quizAttempt
    } catch (error) {
      Logger.error(`Error attempting quiz: ${error.message}`);
      throw error;
    }
  }

  async checkIfCorrect(optionid) {
    const option = await this.questionOptionRepository.get({ optionid });
    return option?.is_correct || false;
  }

  async getQuizResults(quizId) {
    try {
      Logger.debug(`Fetching Quiz Results for ID: ${quizId}`);
      const results = await this.quizAttemptRepository.getResultsByQuizId(
        quizId
      );
      if (!results) {
        throw new Exceptions.NotFoundException("Quiz results not found");
      }
      return results;
    } catch (error) {
      Logger.error(`Error fetching quiz results: ${error.message}`);
      throw error;
    }
  }
}
