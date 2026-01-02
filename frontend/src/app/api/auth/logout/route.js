import { cookies } from "next/headers";

export async function POST() {
  cookies().set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/", 
  });

  return new Response("Logged out", { status: 200 });
}
