import { Role } from "@prisma/client";
import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email Wajib di isi" })
    .min(1, "Email Wajib di isi")
    .email("Email Tidak Valid"),
  password: z
    .string({ required_error: "Password Wajib di isi" })
    .min(1, "Password Wajib di isi"),
});

export const sighUpSchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
        message: "Logo harus sebuah file",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Tidak Cocok",
    path: ["confirmPassword"],
  });

export const daftarDestinasiSchema = z.object({
  userId: z.string().optional(),
  namaDestinasi: z.string().min(1, "Nama Destinasi Wajib di isi"),
  harga: z.string().min(1, "Nama Destinasi Wajib di isi"),
  deskripsi: z.string().min(1, "Deskripsi Wajib di isi"),
  alamat: z.string().min(1, "Alamat Destinasi Wajib di isi"),
  nomorOwner: z.string().min(1, "Nomor Owner Destinasi Wajib di isi"),
  kategoriLokasi: z.string().min(1, "Lokasi Destinasi Wajib di isi"),
  jamOprasional: z.string().min(1, "Jam Oprasional Wajib di isi"),
  fasilitas: z
    .array(z.string())
    .min(1, "Setidaknya berikan 1 fasilitas utama anda"),
});
export const editDestinasiSchema = z.object({
  namaDestinasi: z.string().min(1, "Nama Destinasi Wajib di isi"),
  harga: z.string().min(1, "Nama Destinasi Wajib di isi"),
  deskripsi: z.string().min(1, "Deskripsi Wajib di isi"),
  alamat: z.string().min(1, "Alamat Destinasi Wajib di isi"),
  nomorOwner: z.string().min(1, "Nomor Owner Destinasi Wajib di isi"),
  kategoriLokasi: z.string().min(1, "Lokasi Destinasi Wajib di isi"),
  jamOprasional: z.string().min(1, "Jam Oprasional Wajib di isi"),
  fasilitas: z
    .array(z.string())
    .min(1, "Setidaknya berikan 1 fasilitas utama anda"),
});

export const buatReservasiSchema = z.object({
  userOwnerId: z.string().optional(),
  userId: z.string().optional(),
  destinasiId: z.string().optional(),
  namaUser: z.string().min(1, "Silahkan isi nama anda"),
  telponUser: z.string().min(1, "Silahkan isi nomor telepon anda"),
  namaDestinasi: z.string().min(1, "Nama Destinasi Wajib di isi"),
  deskripsi: z.string().min(1, "Deskripsi Wajib di isi"),
  harga: z.string().min(1, "Harga Wajib di isi"),
  kategoriLokasi: z.string().min(1, "Lokasi Destinasi Wajib di isi"),
  nomorOwner: z.string().min(1, "Nomor Owner Destinasi Wajib di isi"),
  alamatDestinasi: z.string().min(1, "Alamat Destinasi Wajib di isi"),
  jumlahPengunjung: z.string().min(1, "Jumlah Pengunjung Wajib di isi"),
  tanggalReservasi: z.date(),
  catatanTambahan: z.string().optional(),
});

export const simulasiPembayaranSchema = z.object({
  reservasiId: z.string(),
  userMemberId: z.string().optional(),
  userOwnerId: z.string().optional(),
  harga: z.string(),
  namaPengirim: z.string().min(1, "Silahkan isi nama anda"),
  pesan: z.string().optional(),
});

export const editProfileMemberSchema = z.object({
  name: z.string().min(3),
  gender: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
      message: "Logo harus sebuah file",
    })
    .optional(),
});

export const editOwnerMemberSchema = z.object({
  name: z.string().min(3),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
      message: "Logo harus sebuah file",
    })
    .optional(),
});

export const postingBlogSchema = z.object({
  userId: z.string(),
  title: z.string(),
  content: z
    .array(z.string())
    .min(1, "Setidaknya berikan 1 content utama anda"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
      message: "Logo harus sebuah file",
    })
    .optional(),
});

export const postingForumSchema = z.object({
  userId: z.string(),
  content: z.string().min(1, "Masukan Caption minimal 1 huruf lah..."),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
      message: "Logo harus sebuah file",
    })
    .optional(),
});

export const postingCommentSchema = z.object({
  forumId: z.string(),
  userId: z.string(),
  pesan: z.string(),
});

export const adminSchema = z.object({
  name: z.string().min(3, "Nama harus memiliki minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password harus memiliki minimal 8 karakter"),
});

export const uploadImageSchema = z.object({
  userId: z.string().min(1),
  namaFoto: z.string().min(1),
  forumId: z.string().optional(),
  blogId: z.string().optional(),
  destinasiId: z.string().optional(),
});
