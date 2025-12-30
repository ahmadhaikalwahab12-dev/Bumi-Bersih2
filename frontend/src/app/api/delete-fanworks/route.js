// app/api/fanworks/[id]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// GET single fanwork
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const fanwork = await prisma.fanwork.findUnique({
      where: { id },
      include: {
        images: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!fanwork) {
      return NextResponse.json(
        { success: false, message: "Fanwork tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fanwork,
    });
  } catch (error) {
    console.error("GET FANWORK ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data fanwork",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE fanwork
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log("🗑️ Deleting fanwork:", id);

    // Get fanwork with images
    const fanwork = await prisma.fanwork.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!fanwork) {
      return NextResponse.json(
        { success: false, message: "Fanwork tidak ditemukan" },
        { status: 404 }
      );
    }

    // Delete image files from disk
    for (const image of fanwork.images) {
      const filepath = path.join(process.cwd(), "public", image.url);
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log("🗑️ Deleted file:", image.filename);
      }
    }

    // Delete from database (akan cascade delete images juga)
    await prisma.fanwork.delete({
      where: { id },
    });

    console.log("✅ Fanwork deleted:", id);

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE FANWORK ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus fanwork",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// UPDATE fanwork
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log("✏️ Updating fanwork:", id, body);

    const fanwork = await prisma.fanwork.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        published: body.published,
        rating: body.rating,
      },
      include: {
        images: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    console.log("✅ Fanwork updated:", id);

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil diupdate",
      data: fanwork,
    });
  } catch (error) {
    console.error("UPDATE FANWORK ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengupdate fanwork",
        error: error.message,
      },
      { status: 500 }
    );
  }
}