  import { NextResponse } from "next/server";
  import bcrypt from "bcryptjs";
  import { prisma } from "@/lib/prisma";

  // 🔥 WAJIB (INI KUNCI UTAMA)
  export const runtime = "nodejs";
  export const dynamic = "force-dynamic";

  export async function POST(request) {
    try {
      const { username, email, password } = await request.json();

      if (!username || !email || !password) {
        return NextResponse.json(
          { error: "Semua field harus diisi" },
          { status: 400 }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Format email tidak valid" },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password minimal 6 karakter" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email sudah terdaftar" },
          { status: 400 }
        );
      }

      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return NextResponse.json(
          { error: "Username sudah digunakan" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name: username,
          username,
          email,
          password: hashedPassword,
        },
      });

      const response = NextResponse.json(
        {
          message: "Registrasi berhasil",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        },
        { status: 201 }
      );

      response.cookies.set("session", user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Register error:", error);
      return NextResponse.json(
        { error: "Terjadi kesalahan saat registrasi" },
        { status: 500 }
      );
    }
  }
