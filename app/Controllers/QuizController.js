import Contoller from "./Controller.js";
import QuizService from "../Services/QuizService.js";
import Logger from "../Utils/Logger.js";
import Validator from "../Validators/Validator.js";

export default class QuizController extends Contoller {
  constructor(response) {
    super(response);
    this.quizService = new QuizService();
  }

  async createQuiz(request) {
    try {
      Logger.debug(`Creating Quiz...`);
      const params = await this.validateParams(request, Validator.createQuiz);
      console.log("Params for createQuiz:", params);
      console.log("Request body for createQuiz:", request.userDetail);
      const createQuizPromise = await this.quizService.createQuiz(request.userDetail, params);
      this.sendResponse(createQuizPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getQuiz(request) {
    try {
      console.log("Request for getQuiz:", request);
      Logger.debug(`Fetching Quiz... ${request}`);
      const getQuizPromise = await this.quizService.getQuiz(request.params.quizid);
      this.sendResponse(getQuizPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async attemptQuiz(request) {
    try {
      Logger.debug(`Attempting Quiz...`);
      const params = await this.validateParams(request, Validator.attemptQuiz);
      console.log("Params for attemptQuiz:", params);
      console.log("Request body for attemptQuiz:", request.userDetail);
      const attemptQuizPromise = await this.quizService.attemptQuiz(request.userDetail, params);
      this.sendResponse(attemptQuizPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getQuizResults(request) {
    try {
      Logger.debug(`Fetching Quiz Results...`);
      const params = await this.validateParams(request, Validator.getQuizResults);
      const getQuizResultsPromise = await this.quizService.getQuizResults(params);
      this.sendResponse(getQuizResultsPromise);
    } catch (error) {
      this.handleException(error);
    }
  }
}