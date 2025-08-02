import prisma from "../client.js";

export default class QuizAttemptRepository {
  async create(data) {
    return await prisma.quizAttempt.create({
      data,
    });
  }
}