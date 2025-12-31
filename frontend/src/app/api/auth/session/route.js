import { Buffer } from "buffer";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { token } = await req.json();

    // Decode JWT payload (tanpa firebase-admin)
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );

    //  SET COOKIE SESSION
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return Response.json({ user: decoded });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}