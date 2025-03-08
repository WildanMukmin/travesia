"use server";

import { prisma } from "@/lib/prisma";
import { daftarDestinasiSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export const daftarDestinasi = async (
  data: z.infer<typeof daftarDestinasiSchema>
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

export const getDestinasi = async () => {
  try {
    const destinasi = await prisma.destinasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      include: {
        owner: true,
      },
    });
    return destinasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};

export const getAllDestinasi = async () => {
  try {
    const destinasi = await prisma.destinasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        owner: true,
      },
    });
    return destinasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};

export const getPaginatedDestinasi = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const skip = (page - 1) * limit; // Menghitung jumlah data yang dilewati

    const destinasi = await prisma.destinasi.findMany({
      skip, // Lewati sejumlah data berdasarkan halaman
      take: limit, // Ambil sejumlah data sesuai limit
      include: {
        owner: {
          include: {
            user: true,
          },
        },
      },
    });

    const totalDestinasi = await prisma.destinasi.count(); // Hitung total destinasi

    return {
      data: destinasi,
      total: totalDestinasi,
      page,
      totalPages: Math.ceil(totalDestinasi / limit),
    };
  } catch (error) {
    console.error("Error fetching paginated destinasi:", error);
    return null;
  }
};
