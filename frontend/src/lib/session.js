import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const userId = Number(session);
  if (isNaN(userId)) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
}