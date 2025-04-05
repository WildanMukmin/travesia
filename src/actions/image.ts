"use server";

import { uploadImageSchema } from "@/lib/zod";
import { del, put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("gambar") as File;
  const userId = formData.get("userId") as string;
  const namaFoto = formData.get("namaFoto") as string;
  const forumId = formData.get("forumId") as string | null;
  const blogId = formData.get("blogId") as string | null;
  const destinasiId = formData.get("destinasiId") as string | null;

  if (!file) {
    return { error: "Data tidak lengkap." };
  }

  if (!userId && !forumId && !blogId && !destinasiId) {
    return { error: "Kamu mau upload ke mana?" };
  }

  try {
    const blob = await put(namaFoto, file, {
      access: "public",
      multipart: true,
    });

    const result = await prisma.image.create({
      data: {
        forumId: forumId || undefined,
        blogId: blogId || undefined,
        destinasiId: destinasiId || undefined,
        userId: userId || undefined,
        gambar: blob.url,
        namaFoto,
      },
    });
    if (userId) {
      revalidatePath("/profile/edit-profile");
    }
    return { success: "Berhasil menyimpan gambar." };
  } catch (error) {
    console.error("Upload gagal:", error);
    return { error: "Gagal mengupload gambar." };
  }
};
export const updateImageById = async (formData: FormData, id: string) => {
  const file = formData.get("gambar") as File;
  const userId = formData.get("userId") as string;
  const namaFoto = formData.get("namaFoto") as string;
  const forumId = formData.get("forumId") as string | null;
  const blogId = formData.get("blogId") as string | null;
  const destinasiId = formData.get("destinasiId") as string | null;

  if (!file) {
    return { error: "Data tidak lengkap." };
  }

  if (!userId && !forumId && !blogId && !destinasiId) {
    return { error: "Kamu mau update apaan?" };
  }

  try {
    const data = await prisma.image.findUnique({ where: { id } });
    if (!data) {
      return { error: "Gambar tidak ditemukan." };
    }

    await del(data.gambar);

    const blob = await put(namaFoto, file, {
      access: "public",
      multipart: true,
    });

    const result = await prisma.image.update({
      where: { id },
      data: {
        forumId: forumId || undefined,
        blogId: blogId || undefined,
        destinasiId: destinasiId || undefined,
        userId: userId || undefined,
        gambar: blob.url,
        namaFoto,
      },
    });
    revalidatePath("/profile/edit-profile");
    return { success: "Berhasil menyimpan gambar." };
  } catch (error) {
    console.error("Upload gagal:", error);
    return { error: "Gagal mengupload gambar." };
  }
};
export const getImageById = async (id: string) => {
  try {
    return await prisma.image.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};

export const deleteImageById = async (id: string) => {
  try {
    await prisma.image.delete({ where: { id } });
    return { success: "Gambar berhasil dihapus." };
  } catch (error) {
    return { error: "Gagal menghapus gambar." };
  }
};
