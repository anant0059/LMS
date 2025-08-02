import prisma from "../client.js";

export default class QuizAnswerRepository {
  async create(data) {
    return await prisma.quizAnswer.create({
      data,
    });
  }
}