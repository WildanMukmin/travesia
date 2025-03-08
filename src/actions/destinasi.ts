"use server";

import { prisma } from "@/lib/prisma";
import { daftarDestinasiSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export const daftarDestinasi = async (
  data: z.infer<typeof daftarDestinasiSchema>,
) => {
  const validatedFields = daftarDestinasiSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const {
    userId,
    namaDestinasi,
    harga,
    deskripsi,
    alamat,
    nomorOwner,
    kategoriLokasi,
    jamOprasional,
    fasilitas,
  } = validatedFields.data;

  const validHarga = parseInt(harga.replace(/[^0-9]/g, ""), 10);

  if (isNaN(validHarga) || validHarga <= 0) {
    return { error: "Harga Tidak Valid" };
  }

  if (fasilitas.length < 1) {
    return { error: "Setidaknya berikan 1 fasilitas utama anda" };
  }

  if (!userId) {
    return { error: "Terjadi kesalahan, silahkan login kembali" };
  }

  const owner = await prisma.owner.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!owner) {
    return { error: "Terjadi kesalahan, silahkan login kembali" };
  }

  const existingDestinasi = await prisma.destinasi.findFirst({
    where: {
      ownerId: owner.id,
    },
  });

  if (existingDestinasi) {
    return { error: "Anda sudah memiliki destinasi" };
  }

  try {
    await prisma.destinasi.create({
      data: {
        ownerId: owner.id,
        namaDestinasi,
        harga: validHarga,
        deskripsi,
        alamat,
        nomorOwner,
        kategoriLokasi,
        jamOprasional,
        fasilitas,
      },
    });

    return { success: "Destinasi berhasil didaftarkan" };
  } catch (e) {
    return { error: "Terjadi kesalahan, silahkan coba lagi" };
  } finally {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
};
