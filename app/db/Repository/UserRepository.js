import prisma from "../client.js";

export default class UserRepository {
    async create(data) {
        return await prisma.user.create({
            data
        });
    }

    async getUserById(userid) {
        return await prisma.user.findUnique({
            where: { userid: userid }
        });
    }

    async getUserByEmail(useremailid) {
        return await prisma.user.findUnique({
            where: { useremailid }
        });
    }
}
