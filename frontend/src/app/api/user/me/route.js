export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("GET /api/user/me error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { username, avatar } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(username && { username }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT /api/user/me error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}