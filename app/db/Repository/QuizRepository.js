import prisma from "../client.js";

export default class QuizRepository {
  async create(data) {
    return await prisma.quiz.create({
      data,
    });
  }

  async getQuizWithQuestions(quizId) {
    return await prisma.quiz.findUnique({
      where: { quizid: quizId },
      include: {
        questions: {
          orderBy: {
            display_order: "asc",
          },
          include: {
            question: {
              include: {
                options: {
                  orderBy: {
                    display_order: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
