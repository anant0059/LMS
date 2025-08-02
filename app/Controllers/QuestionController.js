import Contoller from "./Controller.js";
import QuestionService from "../Services/QuestionService.js";
import Logger from "../Utils/Logger.js";
import Validator from "../Validators/Validator.js";

export default class QuestionController extends Contoller {
  constructor(response) {
    super(response);
    this.questionService = new QuestionService();
  }

  async createQuestion(request) {
    try {
      Logger.debug(`Creating Question...`);
      const params = await this.validateParams(request, Validator.createQuestion);
      console.log("Params for createQuestion:", params);
      console.log("Request body for createQuestion:", request.userDetail);
      const createQuestionPromise = await this.questionService.createQuestion(request.userDetail, params);
      this.sendResponse(createQuestionPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getQuestion(request) {
    try {
      console.log("Request for getQuestion:", request);
      Logger.debug(`Fetching Question... ${request}`);
      const getQuestionPromise = await this.questionService.getQuestion(request.params.questionid);
      this.sendResponse(getQuestionPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getAllQuestions(request) {
    try {
      Logger.debug(`Fetching All Questions...`);
      const getAllQuestionsPromise = await this.questionService.getAllQuestions();
      this.sendResponse(getAllQuestionsPromise);
    } catch (error) {
      this.handleException(error);
    }
  }
}