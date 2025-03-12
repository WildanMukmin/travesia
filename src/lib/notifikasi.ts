"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type NotifikasiType = Prisma.PromiseReturnType<
  typeof getNotificationByUserId
>;

export const getNotificationByUserId = async (id: string) => {
  try {
    const notifikasi = prisma.notifikasi.findMany({
      where: {
        userId: id,
      },
    });
    return notifikasi;
  } catch (e) {
    return null;
  }
};

export const deleteNotifikasi = async (id: string) => {
  try {
    const notifikasi = prisma.notifikasi.delete({
      where: {
        id,
      },
    });
    return notifikasi;
  } catch (e) {
    return null;
  }
};

export const updateReadNotifikasi = async (id: string) => {
  try {
    const notifikasi = prisma.notifikasi.update({
      where: {
        id,
      },
      data: {
        status: "sudah-dibaca",
      },
    });
    return notifikasi;
  } catch (e) {
    return null;
  }
};
