export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const fanworks = await prisma.fanwork.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const transformedData = fanworks.map((work) => ({
      id: work.id,
      title: work.title,
      description: work.description,
      imageUrl: work.imageUrl,
      user: { name: work.user?.name || "User" },
      createdAt: work.createdAt,
      updatedAt: work.updatedAt,
    }));

    return NextResponse.json({ success: true, data: transformedData });
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