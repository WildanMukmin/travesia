"use client";

import { updateImageById, uploadImage } from "@/actions/image";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-succsess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetProfileType, updateProfile } from "@/lib/profile";
import { editProfileMemberSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus, Upload, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditProfileOwnerPageProps {
  userData: GetProfileType;
  admin?: boolean;
}

const EditProfileOwnerPage = ({
  userData,
  admin,
}: EditProfileOwnerPageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [successMessageImage, setSuccessMessageImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [srcImage, setSrcImage] = useState<string>(
    userData?.image?.gambar || "",
  );
  const genderOptions = ["Laki-laki", "Perempuan"];

  const form = useForm<z.infer<typeof editProfileMemberSchema>>({
    resolver: zodResolver(editProfileMemberSchema),
    defaultValues: {
      name: userData?.name || "",
      gender: userData?.member?.gender || "",
    },
  });

  const handleSubmitData = (data: z.infer<typeof editProfileMemberSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);
    startTransition(() => {
      updateProfile(userData?.id || "", data).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          setSuccessMessage(res?.success);
        }
      });
      setIsPending(false);
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessageImage("");
    setSuccessMessageImage("");

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1000 * 1024; // 1 MB
      const validTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        setErrorMessageImage(
          "Hanya file PNG, JPEG, JPG, dan WebP yang diperbolehkan.",
        );
        return;
      }

      if (file.size > maxSize) {
        setErrorMessageImage("Ukuran file harus kurang dari 1 MB.");
        return;
      }

      setImageFile(file);
      setSrcImage(URL.createObjectURL(file));
      setSuccessMessageImage("Foto profil berhasil diunggah!");
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      setErrorMessageImage("Belum ada foto profil yang dipilih.");
      return;
    }

    setIsPending(true);
    setSuccessMessageImage("");
    setErrorMessageImage("");

    try {
      const formData = new FormData();
      formData.append("gambar", imageFile); // nama harus cocok dengan server
      formData.append("userId", userData?.id || "");
      formData.append("namaFoto", imageFile.name); // atau sesuai input kamu
      // Bisa tambahkan blogId, forumId, destinasiId jika diperlukan
      let res;
      if (userData?.image?.gambar) {
        res = await updateImageById(formData, userData?.image?.id || "");
      } else {
        res = await uploadImage(formData);
      }

      if (res.success) {
        setSuccessMessageImage(res.success);
        setErrorMessageImage("");
      } else if (res.error) {
        setSuccessMessageImage("");
        setErrorMessageImage(res.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessageImage("Terjadi kesalahan saat mengunggah foto profil.");
    } finally {
      setIsPending(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setSrcImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSuccessMessageImage("");
    setErrorMessageImage("");
  };

  return (
    <main className="py-8 px-4 w-full mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header dengan info utama */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Edit Profil</h1>
          </div>
          <p className="text-blue-100 mt-1">
            Perbarui informasi profil dan foto Anda
          </p>
        </div>

        <div className="md:flex">
          {/* Bagian foto profil */}
          <section className="md:w-2/5 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-blue-600" />
              Foto Profil
            </h2>

            {errorMessageImage && <FormError message={errorMessageImage} />}
            {successMessageImage && (
              <FormSuccess message={successMessageImage} />
            )}

            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-3">
                  Unggah foto profil Anda (format PNG/WebP, maksimal 1MB)
                </p>

                <div
                  onClick={handleButtonClick}
                  className={`cursor-pointer rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center h-64 transition-all
                  ${srcImage ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                >
                  <input
                    type="file"
                    accept=".png,.webp,.jpeg,.jpg"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  {srcImage ? (
                    <div className="relative flex flex-col items-center">
                      <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                        <Image
                          src={srcImage}
                          width={160}
                          height={160}
                          alt="Foto Profil"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-blue-600">{imageFile?.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                      >
                        Hapus Foto
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-1">
                        Klik untuk memilih foto profil
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        Format yang didukung: PNG, WebP (maks. 1MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-blue-700 mb-2">
                  Panduan Foto Profil:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Gunakan foto wajah yang jelas dan profesional
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Pastikan pencahayaan baik dan tidak buram
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Hindari foto dengan kualitas rendah atau tidak pantas
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleSaveImage}
                disabled={isPending || !imageFile}
                className={`bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 w-full
                ${!imageFile ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Upload className="h-4 w-4" />
                {isPending ? "Menyimpan..." : "Simpan Foto Profil"}
              </Button>
            </div>
          </section>

          {/* Bagian data profil */}
          <section className="md:w-3/5 p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Informasi Pribadi
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitData)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-700">
                          Nama Lengkap
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Masukkan nama lengkap Anda"
                            className="border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tampilkan informasi email yang tidak bisa diubah */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-600">
                      {userData?.email || "email@example.com"}
                      <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Tidak dapat diubah
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Email tidak dapat diubah untuk alasan keamanan
                    </p>
                  </div>
                </div>

                {errorMessage && <FormError message={errorMessage} />}
                {successMessage && <FormSuccess message={successMessage} />}

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  {admin ? (
                    <Link
                      href="/admin/kelola-user"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        type="button"
                        disabled={isPending}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border-gray-300"
                      >
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Kelola User
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/profile" className="w-full sm:w-auto">
                      <Button
                        type="button"
                        disabled={isPending}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border-gray-300"
                      >
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Profil
                      </Button>
                    </Link>
                  )}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default EditProfileOwnerPage;
