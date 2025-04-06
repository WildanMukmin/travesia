"use client";

import { postingForum } from "@/actions/forum";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-succsess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postingForumSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ForumPostingPageProps {
  userId: string;
  admin?: boolean;
}

const ForumPostingPage = ({ userId, admin }: ForumPostingPageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [contentItem, setContentItem] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [srcImage, setSrcImage] = useState<string>("");
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [successMessageImage, setSuccessMessageImage] = useState("");

  const form = useForm<z.infer<typeof postingForumSchema>>({
    resolver: zodResolver(postingForumSchema),
    defaultValues: {
      userId: userId,
      content: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (successMessage && admin) {
      redirect("/admin/kelola-forum");
    } else if (successMessage) {
      redirect("/forum");
    }
  }, [successMessage]);

  const handleSubmitData = async (data: z.infer<typeof postingForumSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    data.image = imageFile;
    setIsPending(true);

    try {
      startTransition(() => {
        postingForum(data).then((res) => {
          if (!res) {
            setErrorMessage("Terjadi kesalahan saat mempublikasikan blog.");
          }
          if (res?.error) {
            setErrorMessage(res.error);
          } else if (res?.success) {
            setSuccessMessage("Blog berhasil dipublikasikan!");
          }
        });
      });
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat mempublikasikan blog.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
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
      const validTypes = ["image/png", "image/webp", "image/jpeg"];

      if (!validTypes.includes(file.type)) {
        setErrorMessageImage(
          "Hanya file PNG, JPEG, dan WebP yang diperbolehkan."
        );
        return;
      }

      if (file.size > maxSize) {
        setErrorMessageImage("Ukuran file harus kurang dari 1 MB.");
        return;
      }

      setImageFile(file);
      setSrcImage(URL.createObjectURL(file));
      setSuccessMessageImage("File berhasil diunggah!");
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      setErrorMessageImage("Belum ada file yang dipilih.");
      return;
    }

    setIsPending(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would implement your actual image upload logic
      // Example:
      // const formData = new FormData();
      // formData.append('image', imageFile);
      // formData.append('destinationId', userId);
      // const response = await fetch('/api/upload-image', {
      //   method: 'POST',
      //   body: formData
      // });

      setSuccessMessageImage("Gambar berhasil disimpan!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessageImage("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsPending(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(undefined);
    setSrcImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSuccessMessageImage("");
    setErrorMessageImage("");
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <Card className="w-full mx-auto shadow-md mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">
                Ada apa hari ini?
              </CardTitle>
              <p className="text-blue-600 mt-1 text-sm">
                Bagikan pengalaman Anda dengan komunitas kami
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitData)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Caption</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Tulis disini..."
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4">
                  <FormLabel className="font-medium">Image Blog</FormLabel>
                  {/* Image Upload Card */}
                  {errorMessageImage && (
                    <FormError message={errorMessageImage} />
                  )}
                  {successMessageImage && (
                    <FormSuccess message={successMessageImage} />
                  )}
                  <div className="w-full">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600 mb-2">
                        Unggah foto jika ada (format PNG/WebP, max 1MB)
                      </p>

                      <div
                        onClick={handleButtonClick}
                        className={`cursor-pointer rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center h-64 transition-all
                  ${srcImage ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                      >
                        <input
                          type="file"
                          accept=".png,.webp"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />

                        {srcImage ? (
                          <div className="relative flex flex-col items-center">
                            <Image
                              src={srcImage}
                              width={200}
                              height={150}
                              alt="Foto Destinasi"
                              className="rounded-md shadow-md max-h-44 object-contain"
                            />
                            <p className="text-sm text-blue-600 mt-2">
                              {imageFile?.name}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                            >
                              Hapus Gambar
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <ImagePlus className="h-16 w-16 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 text-center mb-1">
                              Klik untuk memilih gambar
                            </p>
                            <p className="text-xs text-gray-500 text-center">
                              Format yang didukung: PNG, WebP (max. 1MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && <FormError message={errorMessage} />}
              {successMessage && <FormSuccess message={successMessage} />}

              <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
                <Link href="/forum" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    disabled={isPending}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-gray-300"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
                >
                  {isPending ? "Memuat..." : "Publikasikan ke forum"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ForumPostingPage;
