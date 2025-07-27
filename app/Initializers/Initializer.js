import prisma from "../../prisma/db.js";

export default class Initializer {
  static intializeServices() {
    return [
      // connect to Postgres
      prisma.$connect(),
    ];
  }
}
