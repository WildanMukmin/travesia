"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { daftarDestinasiSchema } from "@/lib/zod";
import { FormError } from "@/components/auth/form-error";
import { daftarDestinasi } from "@/actions/destinasi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReservasiMemberBuatReservasiProps {
  id: string;
  namaDestinasi: string;
  deskripsi: string;
  harga: number;
  kategoriLokasi: string;
  nomorOwner: string;
  alamatDestinasi: string;
}

const ReservasiMemberBuatReservasi = ({
  id,
  namaDestinasi,
  deskripsi,
  harga,
  kategoriLokasi,
  nomorOwner,
  alamatDestinasi,
}: ReservasiMemberBuatReservasiProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [facilitiesInput, setFacilitiesInput] = useState("");
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
  const form = useForm<z.infer<typeof daftarDestinasiSchema>>({
    resolver: zodResolver(daftarDestinasiSchema),
    defaultValues: {
      namaDestinasi: "",
      harga: "",
      deskripsi: "",
      alamat: "",
      nomorOwner: "",
      kategoriLokasi: "",
      jamOprasional: "",
      fasilitas: [],
    },
  });

  const handleSubmitData = (data: z.infer<typeof daftarDestinasiSchema>) => {
    setErrorMessage("");
    setIsPending(true);
    startTransition(() => {
      daftarDestinasi(data).then((data) => {
        if (data?.error) {
          setErrorMessage(data?.error);
        }
      });
      setIsPending(false);
    });
  };

  const handleAddFacility = () => {
    if (facilitiesInput.trim() !== "") {
      const newFacility = facilitiesInput.trim();
      const currentFacilities = form.getValues("fasilitas") || [];

      if (!currentFacilities.includes(newFacility)) {
        form.setValue("fasilitas", [...currentFacilities, newFacility]);
      }

      setFacilitiesInput("");
    }
  };

  return (
    <main className="container mx-auto py-10 px-4">
      {/* Data Destinasi Upload Card */}
      <Card className="w-full mx-auto shadow-md mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">
                Buat Reservasi di {namaDestinasi}
              </CardTitle>
              <p className="text-blue-600 mt-1 text-sm">
                {deskripsi.slice(0, 150)}...
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="namaDestinasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Nama Destinasi
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Masukkan nama destinasi wisata"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Harga Tiket</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Contoh: 25000"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kategoriLokasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori Lokasi</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Lokasi Destinasi Anda" />
                        </SelectTrigger>
                        <SelectContent>
                          {kategoriLokasiData.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jamOprasional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Jam Operasional
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Contoh: 08:00 - 17:00"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Alamat Lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Masukkan alamat lengkap destinasi"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nomorOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Nomor Kontak
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Masukkan nomor telepon aktif"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Deskripsi Destinasi
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Deskripsikan destinasi wisata Anda secara detail"
                          className="w-full min-h-24 px-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fasilitas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Fasilitas Tersedia
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            value={facilitiesInput}
                            onChange={(e) => setFacilitiesInput(e.target.value)}
                            placeholder="Contoh: Toilet, Parkir, Wifi"
                            disabled={isPending}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddFacility();
                              }
                            }}
                            className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={handleAddFacility}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={isPending}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {field.value?.map((facility) => (
                          <Badge
                            key={facility}
                            variant="secondary"
                            className="px-3 py-1 bg-blue-50 text-blue-700 flex items-center gap-1"
                          >
                            {facility}
                            <Button
                              variant="ghost"
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  field.value?.filter((s) => s !== facility)
                                )
                              }
                              className="h-5 w-5 p-0 ml-1 text-blue-700 hover:text-red-600 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Tambahkan fasilitas dan tekan tombol + atau Enter
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {errorMessage && <FormError message={errorMessage} />}

              <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
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
                  {isPending ? "Memuat..." : "Simpan Destinasi"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReservasiMemberBuatReservasi;
