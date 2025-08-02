import prisma from "../client.js";

export default class CourseRepository {
  async create(data) {
    return await prisma.course.create({
      data,
    });
  }

  async get(args) {
    return await prisma.course.findFirst({
      where: args,
    });
  }

  async getCourseById(courseid) {
    return await prisma.course.findUnique({
      where: { courseid: courseid },
    });
  }

  async getAllCourses() {
    return await prisma.course.findMany();
  }
}