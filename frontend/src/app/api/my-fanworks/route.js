export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("📖 Fetching MY fanworks...");

    /**
     * ⚠️ DEMO USER
     * Cari atau buat user demo
     */
    let user = await prisma.user.findUnique({
      where: {
        email: "demo@fanwork.com",
      },
    });

    // Jika user belum ada, buat dulu
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Verdinanda56",
          email: "demo@fanwork.com",
          password: "demo123", // password dummy
        },
      });
      console.log("✅ Demo user created");
    }

    /**
     * ✅ AMBIL FANWORK BERDASARKAN userId
     */
    const fanworks = await prisma.fanwork.findMany({
      where: {
        userId: user.id, // ✅ FIX: pakai userId (bukan authorId)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`✅ Found ${fanworks.length} fanworks for user ${user.name}`);

    // ✅ Transform data
    const transformedData = fanworks.map(work => ({
      id: work.id,
      title: work.title,
      description: work.description,
      imageUrl: work.imageUrl,
      user: {
        name: work.user?.name || "User"
      },
      createdAt: work.createdAt,
      updatedAt: work.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("❌ MY FANWORKS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil fanwork user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}