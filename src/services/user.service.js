import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createUser = async (userData) => {
    return await prisma.user.create({ data: userData })
}