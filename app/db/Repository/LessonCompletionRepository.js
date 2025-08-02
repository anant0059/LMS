import prisma from "../client.js";

export default class LessonCompletionRepository {
  async create(data) {
    return await prisma.lessonCompletion.create({
      data,
    });
  }
}