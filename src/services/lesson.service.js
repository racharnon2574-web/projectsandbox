import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getLesson = async (column, value) => {
    return await prisma.lesson.findMany()
}