"use server";

import { prisma } from "@/lib/prisma";
import { buatReservasiSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export type ReservasiWithMemberAll = Prisma.PromiseReturnType<
  typeof getAllReservasiByUserId
>;

export type ReservasiWithMember = Prisma.PromiseReturnType<
  typeof getReservasiById
>;

export const buatReservasi = async (
  data: z.infer<typeof buatReservasiSchema>,
) => {
  const validatedFields = buatReservasiSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }
  const {
    userId,
    namaUser,
    telponUser,
    harga,
    jumlahPengunjung,
    tanggalReservasi,
    catatanTambahan,
    destinasiId,
  } = validatedFields.data;

  const validHarga = parseInt(harga.replace(/[^0-9]/g, ""), 10);
  if (isNaN(validHarga) || validHarga <= 0) {
    return { error: "Harga Tidak Valid" };
  }
  const validJumlahTiket = parseInt(
    jumlahPengunjung.replace(/[^0-9]/g, ""),
    10,
  );
  if (isNaN(validJumlahTiket) || validJumlahTiket <= 0) {
    return { error: "Jumlah Pengunjung Tidak Valid, Minimal isi 1" };
  }

  if (!userId) {
    return { error: "Terjadi kesalahan, silahkan login kembali 1" };
  }
  const member = await prisma.member.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!member) {
    return { error: "Terjadi kesalahan, silahkan login kembali 2" };
  }

  if (!destinasiId) {
    return { error: "Terjadi kesalahan, silahkan login kembali 3" };
  }
  let idReservasi = "";
  try {
    const reservasi = await prisma.reservasi.create({
      data: {
        memberId: member.id,
        destinasiId: destinasiId,
        namaUser: namaUser,
        nomorTelfon: telponUser,
        catatanTambahan: catatanTambahan,
        jumlahOrang: validJumlahTiket,
        status: "diproses",
        tanggalReservasi: new Date(tanggalReservasi),
        waktuPemesanan: new Date(),
        totalHarga: validHarga * validJumlahTiket,
      },
    });

    idReservasi = reservasi.id;
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan, silahkan login kembali 4" };
  } finally {
    revalidatePath(`/reservasi/detail-reservasi/${idReservasi}`);
    redirect(`/reservasi/detail-reservasi/${idReservasi}`);
  }
};

export const getAllReservasiByUserId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        member: true,
      },
    });

    if (!user || !user.member) {
      return null;
    }

    const reservasi = await prisma.reservasi.findMany({
      where: {
        memberId: user.member.id,
      },
      include: {
        destinasi: true,
        member: true,
      },
      orderBy: {
        waktuPemesanan: "desc",
      },
    });

    return reservasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};

export const getReservasiById = async (id: string) => {
  try {
    const reservasi = await prisma.reservasi.findUnique({
      where: {
        id,
      },
      include: {
        destinasi: {
          include: {
            owner: {
              include: {
                user: true,
              },
            },
          },
        },
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    return reservasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};
