export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";


/* GET - LIST FANWORKS / LIKED FANWORKS */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter"); // 
    const userId = searchParams.get("userId"); // 

    // JIKA FILTER = "liked", AMBIL FANWORKS YANG DI-LIKE USER
    if (filter === "liked") {
      if (!userId) {
        return NextResponse.json(
          { success: false, message: "User ID diperlukan untuk filter liked" },
          { status: 400 }
        );
      }

      const likedFanworks = await prisma.fanwork.findMany({
        where: {
          isPublished: true,
          likes: {
            some: {
              userId: parseInt(userId)
            }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true
            }
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                }
              }
            },
            orderBy: {
              createdAt: "desc"
            }
          }
        },
        orderBy: { createdAt: "desc" },
      });

      const transformedData = likedFanworks.map(work => ({
        id: work.id,
        title: work.title,
        description: work.description,
        imageUrl: work.imageUrl,
        user: {
          name: work.user?.name || "User"
        },
        _count: {
          likes: work._count.likes,
          comments: work._count.comments
        },
        comments: work.comments,
        createdAt: work.createdAt,
        updatedAt: work.updatedAt
      }));

      return NextResponse.json({
        success: true,
        data: transformedData,
      });
    }

    // DEFAULT: AMBIL SEMUA FANWORKS (TANPA FILTER)
    const fanworks = await prisma.fanwork.findMany({
      where: {
        isPublished: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    const transformedData = fanworks.map(work => ({
      id: work.id,
      title: work.title,
      description: work.description,
      imageUrl: work.imageUrl,
      user: {
        name: work.user?.name || "User"
      },
      createdAt: work.createdAt,
      updatedAt: work.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("GET FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil fanwork" },
      { status: 500 }
    );
  }
}

/* POST - UPLOAD FANWORK */
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = Number(session);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!title || !description || !image) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    /* SIMPAN FILE */
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${image.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/fanworks");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    const imageUrl = `/uploads/fanworks/${fileName}`;

    /* 🔥 PAKAI USER LOGIN, BUKAN DEMO */
    const fanwork = await prisma.fanwork.create({
      data: {
        title,
        description,
        imageUrl,
        imageSize: image.size,
        imageType: image.type,
        isPublished: true,
        status: "PUBLISHED",
        userId: userId, // ✅ INI KUNCINYA
      },
    });

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil diunggah!",
      data: fanwork,
    });
  } catch (error) {
    console.error("POST FANWORK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


/* PUT - UPDATE FANWORK */
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const fanworkId = parseInt(id);

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

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Judul dan deskripsi harus diisi" },
        { status: 400 }
      );
    }

    // CEK FANWORK ADA ATAU TIDAK 
    const existingFanwork = await prisma.fanwork.findUnique({
      where: { id: fanworkId },
    });

    if (!existingFanwork) {
      return NextResponse.json(
        { success: false, message: "Fanwork tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = existingFanwork.imageUrl;
    let imageSize = existingFanwork.imageSize;
    let imageType = existingFanwork.imageType;

    // JIKA ADA GAMBAR BARU, UPLOAD DAN HAPUS YANG LAMA 
    if (image && image.size > 0) {
      // Hapus gambar lama
      if (existingFanwork.imageUrl) {
        try {
          const oldImagePath = path.join(process.cwd(), "public", existingFanwork.imageUrl);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Old image deleted: ${oldImagePath}`);
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }

      // Upload gambar baru
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/fanworks");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      
      imageUrl = `/uploads/fanworks/${fileName}`;
      imageSize = image.size;
      imageType = image.type;
    }

    // UPDATE DATABASE 
    const updatedFanwork = await prisma.fanwork.update({
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

    console.log(`Fanwork updated: ID ${fanworkId}`);

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil diupdate!",
      data: updatedFanwork,
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

/* DELETE - HAPUS FANWORK */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const fanworkId = parseInt(id);

    if (!fanworkId || isNaN(fanworkId)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    // CEK APAKAH FANWORK ADA 
    const fanwork = await prisma.fanwork.findUnique({
      where: { id: fanworkId },
    });

    if (!fanwork) {
      return NextResponse.json(
        { success: false, message: "Fanwork tidak ditemukan" },
        { status: 404 }
      );
    }

    // HAPUS FILE GAMBAR DARI SERVER 
    if (fanwork.imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), "public", fanwork.imageUrl);
        
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Image deleted: ${imagePath}`);
        }
      } catch (fileError) {
        console.error("Error deleting image file:", fileError);
      }
    }

    // HAPUS DARI DATABASE 
    await prisma.fanwork.delete({
      where: { id: fanworkId },
    });

    console.log(`Fanwork deleted: ID ${fanworkId}`);

    return NextResponse.json({
      success: true,
      message: "Fanwork berhasil dihapus",
      deletedId: fanworkId,
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