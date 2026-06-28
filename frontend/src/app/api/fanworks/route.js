export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

/* =========================
   CLOUDINARY CONFIG
========================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* =========================
   GET FANWORKS
========================= */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const userId = searchParams.get("userId");

    if (filter === "liked") {
      if (!userId) {
        return NextResponse.json(
          { success: false, message: "User ID diperlukan" },
          { status: 400 }
        );
      }

      const likedFanworks = await prisma.fanwork.findMany({
        where: {
          isPublished: true,
          likes: {
            some: { userId: Number(userId) },
          },
        },
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { likes: true, comments: true } },
          comments: {
            include: { user: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ success: true, data: likedFanworks });
    }

    const fanworks = await prisma.fanwork.findMany({
      where: { isPublished: true },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: fanworks });
  } catch (error) {
    console.error("GET FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil fanwork" },
      { status: 500 }
    );
  }
}

/* =========================
   POST FANWORK (UPLOAD)
========================= */
export async function POST(req) {
  try {
    const cookieStore = await cookies(); // ✅ WAJIB await
    const session = cookieStore.get("session")?.value;
    const userId = Number(session);

    if (!session || isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!title || !description || !(image instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "fanworks", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const fanwork = await prisma.fanwork.create({
      data: {
        title,
        description,
        imageUrl: uploadResult.secure_url,
        imageSize: image.size,
        imageType: image.type,
        isPublished: true,
        status: "PUBLISHED",
        userId,
      },
    });

    return NextResponse.json({ success: true, data: fanwork });
  } catch (error) {
    console.error("POST FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


/* =========================
   PUT FANWORK (UPDATE)
========================= */
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fanworkId = Number(searchParams.get("id"));

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    const existing = await prisma.fanwork.findUnique({
      where: { id: fanworkId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Fanwork tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = existing.imageUrl;
    let imageSize = existing.imageSize;
    let imageType = existing.imageType;

    if (image && image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "fanworks",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
      imageSize = image.size;
      imageType = image.type;
    }

    const updated = await prisma.fanwork.update({
      where: { id: fanworkId },
      data: {
        title,
        description,
        imageUrl,
        imageSize,
        imageType,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal update fanwork" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE FANWORK
========================= */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fanworkId = Number(searchParams.get("id"));

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    await prisma.fanwork.delete({
      where: { id: fanworkId },
    });

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus fanwork" },
      { status: 500 }
    );
  }
}
