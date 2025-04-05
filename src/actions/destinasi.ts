"use server";

import { prisma } from "@/lib/prisma";
import { daftarDestinasiSchema, editDestinasiSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { uploadImage } from "./image";

export type DestinasiWithOwner = Prisma.PromiseReturnType<typeof getDestinasi>;
export type GetOneDestinasiWithOwner = Prisma.PromiseReturnType<
  typeof getDestinasiById
>;

export type AllDestinasi = Prisma.PromiseReturnType<typeof getAllDestinasi>;

export const daftarDestinasi = async (
  data: z.infer<typeof daftarDestinasiSchema>
) => {
  const validatedFields = daftarDestinasiSchema.safeParse(data);
  const kategoriLokasiData = [
    "Aceh",
    "Bali",
    "Banten",
    "Bengkulu",
    "DI Yogyakarta",
    "DKI Jakarta",
    "Gorontalo",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Kepulauan Bangka Belitung",
    "Kepulauan Riau",
    "Lampung",
    "Maluku",
    "Maluku Utara",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Papua",
    "Papua Barat",
    "Papua Barat Daya",
    "Papua Pegunungan",
    "Papua Selatan",
    "Papua Tengah",
    "Riau",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
  ];

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
    image,
    fasilitas,
  } = validatedFields.data;

  const validHarga = parseInt(harga.replace(/[^0-9]/g, ""), 10);

  if (isNaN(validHarga) || validHarga <= 0) {
    return { error: "Harga Tidak Valid" };
  }

  if (fasilitas.length < 1) {
    return { error: "Setidaknya berikan 1 fasilitas utama anda" };
  }

  if (!image) {
    return { error: "Logo harus sebuah file" };
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

  if (!kategoriLokasiData.includes(kategoriLokasi)) {
    return { error: "Kategori lokasi tidak valid" };
  }

  try {
    const destinasi = await prisma.destinasi.create({
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

    if (!destinasi) {
      return { error: "Terjadi kesalahan, silahkan coba lagi" };
    }

    const formData = new FormData();
    formData.append("gambar", image);
    formData.append("destinasiId", destinasi.id);
    formData.append("namaFoto", image.name);
    const res = await uploadImage(formData);
    if (res?.error) {
      return { error: res.error };
    }

    return { success: "Destinasi berhasil didaftarkan" };
  } catch (e) {
    return { error: "Terjadi kesalahan, silahkan coba lagi" };
  } finally {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
};

export const editDestinasi = async (
  destinasiId: string,
  data: z.infer<typeof editDestinasiSchema>
) => {
  const validatedFields = editDestinasiSchema.safeParse(data);
  const kategoriLokasiData = [
    "Aceh",
    "Bali",
    "Banten",
    "Bengkulu",
    "DI Yogyakarta",
    "DKI Jakarta",
    "Gorontalo",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Kepulauan Bangka Belitung",
    "Kepulauan Riau",
    "Lampung",
    "Maluku",
    "Maluku Utara",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Papua",
    "Papua Barat",
    "Papua Barat Daya",
    "Papua Pegunungan",
    "Papua Selatan",
    "Papua Tengah",
    "Riau",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
  ];

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const {
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

  if (!kategoriLokasiData.includes(kategoriLokasi)) {
    return { error: "Kategori lokasi tidak valid" };
  }

  try {
    await prisma.destinasi.update({
      where: {
        id: destinasiId,
      },
      data: {
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
        owner: {
          include: {
            user: true,
          },
        },
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

export const getDestinasiById = async (id: string) => {
  try {
    const destinasi = await prisma.destinasi.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            user: true,
          },
        },
      },
    });
    return destinasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};

export const getDestinasiByKategori = async (kategori: string) => {
  try {
    const destinasi = await prisma.destinasi.findMany({
      where: { kategoriLokasi: kategori },
      include: {
        owner: {
          include: {
            user: true,
          },
        },
      },
    });
    return destinasi;
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return null;
  }
};

export const deleteDestinasiById = async (id: string) => {
  try {
    await prisma.destinasi.delete({
      where: {
        id,
      },
    });
    return { success: "Destinasi berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting destinasi:", error);
    return { error: "Terjadi kesalahan, silahkan coba lagi" };
  }
};
