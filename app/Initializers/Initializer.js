import prisma from "../db/client.js";

export default class Initializer {
  static intializeServices() {
    return [
      // connect to Postgres
      prisma.$connect(),
    ];
  }
}
