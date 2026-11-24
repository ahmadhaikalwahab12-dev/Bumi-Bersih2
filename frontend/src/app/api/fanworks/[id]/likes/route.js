export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // ✅ wajib await di Next.js 15
    const fanworkId = Number(id);

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const user = await getSessionUser();

    const totalLikes = await prisma.like.count({ where: { fanworkId } });
    let isLiked = false;

    if (user) {
      const existing = await prisma.like.findUnique({
        where: { userId_fanworkId: { userId: user.id, fanworkId } },
      });
      isLiked = !!existing;
    }

    return NextResponse.json({ success: true, data: { totalLikes, isLiked } });
  } catch (error) {
    console.error("GET LIKES ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data like" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params; // ✅ wajib await di Next.js 15
    const fanworkId = Number(id);

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.like.upsert({
      where: { userId_fanworkId: { userId: user.id, fanworkId } },
      update: {},
      create: { userId: user.id, fanworkId },
    });

    const totalLikes = await prisma.like.count({ where: { fanworkId } });
    return NextResponse.json({ success: true, data: { totalLikes, isLiked: true } });
  } catch (error) {
    console.error("POST LIKE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyukai fanwork" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ✅ wajib await di Next.js 15
    const fanworkId = Number(id);

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.like.deleteMany({ where: { userId: user.id, fanworkId } });

    const totalLikes = await prisma.like.count({ where: { fanworkId } });
    return NextResponse.json({ success: true, data: { totalLikes, isLiked: false } });
  } catch (error) {
    console.error("DELETE LIKE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal batal menyukai" },
      { status: 500 }
    );
  }
}