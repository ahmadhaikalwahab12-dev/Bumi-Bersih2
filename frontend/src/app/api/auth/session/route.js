export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { admin } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return new Response("Token required", { status: 400 });

    // ✅ Verify Firebase ID Token (bukan JWT biasa)
    const decoded = await admin.auth().verifyIdToken(token);

    const { email, name, picture, uid } = decoded;

    if (!email) return new Response("Invalid token", { status: 401 });

    // ✅ Upsert user ke Prisma (buat kalau belum ada)
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: name || undefined,
        avatar: picture || undefined,
      },
      create: {
        email,
        name: name || email.split("@")[0],
        username: email.split("@")[0],
        avatar: picture || null,
        password: "",
      },
    });

    const cookieStore = await cookies();

    // ✅ Simpan userId ke cookie session
    cookieStore.set("session", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("userId", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({
      message: "Login success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return new Response("Unauthorized", { status: 401 });
  }
}