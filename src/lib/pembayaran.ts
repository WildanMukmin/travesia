"use server";

import { prisma } from "@/lib/prisma";
import { simulasiPembayaranSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import * as z from "zod";

export type NotifikasiType = Prisma.PromiseReturnType<typeof pembayaran>;
export const pembayaran = async (
  value: z.infer<typeof simulasiPembayaranSchema>
) => {
  const validatedFields = simulasiPembayaranSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { data } = validatedFields;

  const { reservasiId, userMemberId, userOwnerId, harga, namaPengirim, pesan } =
    data;
  const validHarga = parseInt(harga.replace(/[^0-9]/g, ""), 10);
  if (isNaN(validHarga) || validHarga <= 0) {
    return { error: "Harga Tidak Valid" };
  }
  if (!userMemberId || !userOwnerId || !reservasiId)
    return { error: "Terjadi kesalahan" };
  const reservasi = await prisma.reservasi.findUnique({
    where: { id: reservasiId },
  });
  if (!reservasi) return { error: "Reservasi Tidak Ditemukan" };
  if (reservasi.status === "selesai") {
    return { error: "Pembayaran Sudah Tidak Berlaku" };
  }
  const userMember = await prisma.user.findUnique({
    where: { id: userMemberId },
  });
  if (!userMember) return { error: "User Member Tidak Ditemukan" };
  const userOwner = await prisma.user.findUnique({
    where: { id: userOwnerId },
  });
  if (!userOwner) return { error: "User Ownwer Tidak Ditemukan" };
  try {
    await prisma.$transaction([
      prisma.reservasi.update({
        where: { id: reservasiId },
        data: { status: "selesai" },
      }),
      prisma.notifikasi.create({
        data: {
          userId: userOwnerId,
          type: "Pembayaran Masuk dari " + namaPengirim,
          pesan: pesan || "Pembayaran Berhasil",
          link: `/reservasi/detail-reservasi/${reservasiId}`,
          status: "belum-dibaca",
        },
      }),
      prisma.notifikasi.create({
        data: {
          userId: userMemberId,
          type: "Pembayaran Berhasil",
          pesan: "Pembayaran Berhasil Dikirim Oleh: " + namaPengirim,
          link: `/reservasi/detail-reservasi/${reservasiId}`,
          status: "belum-dibaca",
        },
      }),
    ]);
    return {
      success: "Pembayaran Berhasil",
    };
  } catch (e) {
    return {
      error: "Pembayaran Gagal",
    };
  }
};
