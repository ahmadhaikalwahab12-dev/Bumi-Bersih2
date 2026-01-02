import { Buffer } from "buffer";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { token } = await req.json();

    // Decode JWT payload
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );

    // Ambil email dari token
    const email = decoded.email;

    if (!email) {
      return new Response("Invalid token", { status: 401 });
    }

    // Cari user di Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // SET COOKIE SESSION
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // SET COOKIE userId (INI KUNCI)
    cookies().set("userId", user.id.toString(), {
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
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Unauthorized", { status: 401 });
  }
}
