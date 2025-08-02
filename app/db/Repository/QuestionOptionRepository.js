import prisma from "../client.js";

export default class QuizOptionRepository {
  async create(data) {
    return await prisma.quizOption.create({
      data,
    });
  }
}