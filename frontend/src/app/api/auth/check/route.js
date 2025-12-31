import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session");

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response("OK", { status: 200 });
}
