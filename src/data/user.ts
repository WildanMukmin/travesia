"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { del } from "@vercel/blob";

export type AllUsers = Prisma.PromiseReturnType<typeof getAllUser>;

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
export const getAllUser = async () => {
  try {
    const user = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return user;
  } catch {
    return null;
  }
};

export const deleteUserByEmail = async (email: string) => {
  if (!email) {
    return { error: "Email tidak boleh kosong" };
  }

  try {
    const user = await prisma.user.delete({
      where: { email },
      include: {
        image: true,
      },
    });

    if (!user) {
      return { error: "User dengan email tersebut tidak ditemukan" };
    }

    if (user?.image?.gambar) {
      await del(user.image.gambar);
    }

    return { success: "User Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error saat menghapus user:", error);

    return { error: "Gagal Menghapus User server" };
  }
};

export const deleteUserByid = async (id: string) => {
  if (!id) {
    return { error: "ID tidak boleh kosong" };
  }

  try {
    const user = await prisma.user.delete({
      where: { id },
      include: {
        image: true,
      },
    });

    if (!user) {
      return { error: "User dengan ID tersebut tidak ditemukan" };
    }

    if (user?.image?.gambar) {
      await del(user.image.gambar);
    }
    return { success: "User Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error saat menghapus user:", error);

    return { error: "Gagal Menghapus User server" };
  }
};
