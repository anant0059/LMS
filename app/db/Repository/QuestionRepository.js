import prisma from "../client.js";

export default class QuestionRepository {
  async create(data) {
    return await prisma.question.create({
      data,
    });
  }

  async getQuestionOptions(args) {
    return await prisma.question.findMany({
      where: args,
      include: {
        options: true,
      },
    });
  }

  async findAllQuestionOptions() {
    return await prisma.question.findMany({
      include: {
        options: true,
      },
    });
  }
  
}