import prisma from "../client.js";

export default class LessonResourceRepository {
  async create(data) {
    return await prisma.lessonResource.create({
      data,
    });
  }
}