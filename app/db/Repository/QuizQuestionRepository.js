import prisma from "../client.js";

export default class QuizQuestionRepository {
  async create(data) {
    return await prisma.quizQuestion.create({
      data,
    });
  }
}