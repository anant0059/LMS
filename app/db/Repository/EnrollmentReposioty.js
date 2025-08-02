import prisma from "../client.js";

export default class EnrollmentRepository {
  async create(data) {
    return await prisma.enrollment.create({
      data,
    });
  }

  async get(args) {
    return await prisma.enrollment.findFirst({
      where: args,
    });
  }

  async update(args1, args2) {
    return await prisma.enrollment.update({
      where: args1,
      data: args2,
    });
  }
}