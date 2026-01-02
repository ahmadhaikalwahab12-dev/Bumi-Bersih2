import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(session, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error("GET /api/user/me error:", error);
    return new Response("Unauthorized", { status: 401 });
  }
}
