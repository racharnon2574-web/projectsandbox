import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient();

async function main() {
    // 👤 USERS
    const user1 = await prisma.user.create({
        data: {
            firstName: "Garfiw",
            lastName: "Sriyut",
            email: "garfiw@example.com",
            phone: "0801234567",
            password: "hashed_password_123", // สมมติว่าเข้ารหัสแล้ว
            contactInfo: "line: garfiw.dev",
            bio: "ผู้สอนพื้นฐานคณิตศาสตร์และวิทยาศาสตร์",
            profile: "https://i.pravatar.cc/300?img=1",
            createdAt: new Date(),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: "Beam",
            lastName: "Tawan",
            email: "beam@example.com",
            phone: "0817654321",
            password: "hashed_password_456",
            bio: "นักเรียนที่สนใจเรียนออนไลน์",
            profile: "https://i.pravatar.cc/300?img=2",
            createdAt: new Date(),
        },
    });

    // 📘 LESSONS
    const lesson1 = await prisma.lesson.create({
        data: {
            comment: "บทเรียนพื้นฐานเรื่องแรงและการเคลื่อนที่",
            rating: 5,
            video: "https://youtu.be/example1",
            sheet: "https://cdn.learnsandbox.com/sheet1.pdf",
            categoryId: "SCI",
            createdAt: new Date(),
            userId: user1.id, // สร้างโดย Garfiw (teacher)
        },
    });

    const lesson2 = await prisma.lesson.create({
        data: {
            comment: "สอนการแก้สมการเบื้องต้น",
            rating: 4,
            video: "https://youtu.be/example2",
            sheet: "https://cdn.learnsandbox.com/sheet2.pdf",
            categoryId: "MATH",
            createdAt: new Date(),
            userId: user1.id,
        },
    });

    // 💬 REVIEW
    const review1 = await prisma.review.create({
        data: {
            message: "อธิบายเข้าใจง่ายมากครับ ขอบคุณครับ",
            userId: user2.id, // รีวิวโดย Beam (student)
        },
    });

    // เชื่อม Review ↔ Lesson
    await prisma.lesson.update({
        where: { id: lesson1.id },
        data: { reviewId: review1.id },
    });

    // 📚 STUDY (บันทึกว่าผู้เรียนเรียนบทไหนแล้ว)
    await prisma.study.create({
        data: {
            userId: user2.id, // Beam
            lessonId: lesson1.id, // เรียนบทเรียนแรก
        },
    });

    console.log("✅ Seed data created successfully!");
}

// 🚀 Run main()
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });