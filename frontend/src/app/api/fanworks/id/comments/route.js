export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET(req, { params }) {
  const fanworkId = Number(params.id);
  const comments = await prisma.comment.findMany({
    where: { fanworkId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: comments });
}

export async function POST(req, { params }) {
  const fanworkId = Number(params.id);
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
}