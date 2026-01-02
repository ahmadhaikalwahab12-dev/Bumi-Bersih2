export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching MY fanworks...");

    // Find or Create Demo User
    let user = await prisma.user.findUnique({
      where: {
        email: "demo@fanwork.com",
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Verdinanda56",
          email: "demo@fanwork.com",
          password: "demo123",
        },
      });
      console.log("Demo user created");
    }

    // Fetch User's Fanworks
    const fanworks = await prisma.fanwork.findMany({
      where: {
        userId: user.id,
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

    console.log(`Found ${fanworks.length} fanworks for user ${user.name}`);

    // Transform Data
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
    console.error("MY FANWORKS ERROR:", error);

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