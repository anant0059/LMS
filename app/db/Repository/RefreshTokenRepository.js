import prisma from "../client.js";

export default class RefreshTokenRepository {
  async create(data) {
    return await prisma.refreshToken.create({
      data,
    });
  }

  async getByHash(tokenHash) {
    return await prisma.refreshToken.findUnique({
      where: { tokenHash: tokenHash },
    });
  }

  async revokeByHash(tokenHash) {
    return await prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revoked: true },
    });
  }

  async revokeAllForUser(userid) {
    return await prisma.refreshToken.updateMany({
      where: { userid, revoked: false },
      data: { revoked: true },
    });
  }
}
