import Logger from "../Utils/Logger.js";
import * as Exceptions from "../Exceptions/Exceptions.js";
import QuestionRepository from "../db/Repository/QuestionRepository.js";
import QuestionOptionRepository from "../db/Repository/QuestionOptionRepository.js";
import { text } from "express";

export default class QuestionService {
  constructor() {
    this.questionRepository = new QuestionRepository();
    this.questionOptionRepository = new QuestionOptionRepository();
  }

  async createQuestion(userDetail, params) {
    try {
      Logger.debug(`Creating Question with params: ${JSON.stringify(params)}`);
      Logger.debug(`User details: ${JSON.stringify(userDetail)}`);
      question = await this.questionRepository.create({
        text: params.questionText,
      });

      questionOptions = await Promise.all(
        params.options.map((option, index) =>
          this.questionOptionRepository.create({
            questionid: question.questionid,
            text: option.text,
            isCorrect: option.isCorrect,
            display_order: index + 1,
          })
        )
      );
      return question;
    } catch (error) {
      Logger.error(`Error creating question: ${error.message}`);
      throw error;
    }
  }

  async getQuestion(questionId) {
    try {
      Logger.debug(`Fetching Question with ID: ${questionId}`);
      const question = await this.questionRepository.getQuestionOptions({
        questionid: questionId,
      });
      return question;
    } catch (error) {
      Logger.error(`Error fetching question: ${error.message}`);
      throw error;
    }
  }

  async getAllQuestions() {
    try {
      Logger.debug(`Fetching All Questions...`);
      const questions = await this.questionRepository.findAllQuestionOptions();
      return questions;
    } catch (error) {
      Logger.error(`Error fetching all questions: ${error.message}`);
      throw error;
    }
  }
}
