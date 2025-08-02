import prisma from "../client.js";

export default class LessonRepository {
  async create(data) {
    return await prisma.lesson.create({
      data,
    });
  }

  async getMaxDisplayOrder(courseid) {
    const result = await prisma.lesson.aggregate({
      where: { courseid },
      _max: { display_order: true },
    });

    return result._max.display_order ?? 0;
  }

  async get(args) {
    return await prisma.lesson.findFirst({
      where: args,
    });
  }

  async count(args) {
    return await prisma.lesson.count({
      where: args,
    });
  }
}