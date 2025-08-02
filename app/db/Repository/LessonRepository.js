import prisma from "../client.js";

export default class LessonRepository {
  async create(data) {
    return await prisma.lesson.create({
      data,
    });
  }
}