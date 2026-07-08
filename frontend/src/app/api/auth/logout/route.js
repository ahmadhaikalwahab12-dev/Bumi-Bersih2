export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // ✅ wajib await di Next.js 15

  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  cookieStore.set("userId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return new Response("Logged out", { status: 200 });
}