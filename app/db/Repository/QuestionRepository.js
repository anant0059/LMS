import prisma from "../client.js";

export default class QuestionRepository {
  async create(data) {
    return await prisma.question.create({
      data,
    });
  }
}