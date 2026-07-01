export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET(req, { params }) {
  const fanworkId = Number(params.id);
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

  await prisma.like.upsert({
    where: { userId_fanworkId: { userId: user.id, fanworkId } },
    update: {},
    create: { userId: user.id, fanworkId },
  });

  const totalLikes = await prisma.like.count({ where: { fanworkId } });
  return NextResponse.json({ success: true, data: { totalLikes, isLiked: true } });
}

export async function DELETE(req, { params }) {
  const fanworkId = Number(params.id);
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
}