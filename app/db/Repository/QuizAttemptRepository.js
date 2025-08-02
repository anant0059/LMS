import prisma from "../client.js";

export default class QuizAttemptRepository {
  async create(data) {
    return await prisma.quizAttempt.create({
      data,
    });
  }

  async getResultsByQuizId(quizId) {
    return await prisma.quizAttempt.findMany({
      where: { quizid: quizId },
    });
  }
}