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

    const comments = await prisma.comment.findMany({
      where: { fanworkId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil komentar" },
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

    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, message: "Komentar kosong" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: { content: content.trim(), userId: user.id, fanworkId },
      include: { user: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    console.error("POST COMMENT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengirim komentar" },
      { status: 500 }
    );
  }
}