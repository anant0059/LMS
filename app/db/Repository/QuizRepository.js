import prisma from "../client.js";

export default class QuizRepository {
  async create(data) {
    return await prisma.quiz.create({
      data,
    });
  }
}