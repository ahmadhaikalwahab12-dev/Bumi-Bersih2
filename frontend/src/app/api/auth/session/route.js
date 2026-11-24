export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { admin } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) {
      return Response.json({ error: "Token required" }, { status: 400 });
    }

    // ✅ Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decoded;

    if (!email) {
      return Response.json({ error: "Invalid token: email not found" }, { status: 401 });
    }

    // ✅ Upsert user ke Prisma dengan auto-retry jika Neon sedang cold-start (wake up)
    let user = null;
    try {
      user = await prisma.user.upsert({
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
    } catch (firstErr) {
      console.warn("Prisma upsert retry (Neon cold start?):", firstErr.message);
      // Tunggu 1 detik jika DB sedang bangun
      await new Promise((r) => setTimeout(r, 1000));
      try {
        user = await prisma.user.upsert({
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
      } catch (retryErr) {
        console.error("Prisma upsert retry also failed:", retryErr.message);
        // Fallback user object jika DB benar-benar tidak terjangkau
        user = {
          id: uid,
          name: name || email.split("@")[0],
          email,
          avatar: picture || null,
        };
      }
    }

    const cookieStore = await cookies();
    const sessionVal = user?.id ? user.id.toString() : uid;

    // ✅ Simpan userId ke cookie session
    cookieStore.set("session", sessionVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("userId", sessionVal, {
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
    return Response.json(
      { error: error.message || "Gagal membuat sesi login" },
      { status: 500 }
    );
  }
}
