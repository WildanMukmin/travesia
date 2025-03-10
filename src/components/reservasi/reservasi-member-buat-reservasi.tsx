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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buatReservasiSchema } from "@/lib/zod";
import { FormError } from "@/components/auth/form-error";
import { cn } from "@/lib/utils";
import { buatReservasi } from "@/actions/reservasi";

interface ReservasiMemberBuatReservasiProps {
  destinasiId: string;
  userId: string;
  namaDestinasi: string;
  deskripsi: string;
  harga: string;
  kategoriLokasi: string;
  nomorOwner: string;
  alamatDestinasi: string;
}

const ReservasiMemberBuatReservasi = ({
  destinasiId,
  userId,
  namaDestinasi,
  deskripsi,
  harga,
  kategoriLokasi,
  nomorOwner,
  alamatDestinasi,
}: ReservasiMemberBuatReservasiProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof buatReservasiSchema>>({
    resolver: zodResolver(buatReservasiSchema),
    defaultValues: {
      userId: userId,
      destinasiId: destinasiId,
      namaUser: "",
      jumlahPengunjung: "",
      telponUser: "",
      catatanTambahan: "",
      tanggalReservasi: new Date(),
      namaDestinasi: namaDestinasi,
      deskripsi: deskripsi,
      harga: harga,
      kategoriLokasi: kategoriLokasi,
      nomorOwner: nomorOwner,
      alamatDestinasi: alamatDestinasi,
    },
  });

  const handleSubmitData = (data: z.infer<typeof buatReservasiSchema>) => {
    setErrorMessage("");
    setIsPending(true);
    startTransition(() => {
      buatReservasi(data).then((res) => {
        if (res?.error) {
          setErrorMessage(res.error);
        }
      });
      setIsPending(false);
    });
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
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-800">
                  Informasi Destinasi
                </h3>
                <p className="text-sm text-gray-500">
                  Detail tentang lokasi yang ingin Anda kunjungi
                </p>
              </div>

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
                          disabled={true}
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alamatDestinasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Alamat Destinasi
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={true}
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
                      <FormLabel className="font-medium">Kategori</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={true}
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
                          disabled={true}
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-800">
                  Informasi Pengunjung
                </h3>
                <p className="text-sm text-gray-500">
                  Masukkan data diri Anda untuk keperluan reservasi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="namaUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Nama Lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Masukkan nama lengkap Anda"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telponUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Nomor Telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Contoh: 08123456789"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jumlahPengunjung"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Jumlah Pengunjung
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          disabled={isPending}
                          placeholder="Masukkan jumlah pengunjung"
                          className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggalReservasi"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-medium">
                        Tanggal Kunjungan
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="catatanTambahan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Catatan Tambahan
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Masukkan catatan atau permintaan khusus (opsional)"
                        className="border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  {isPending ? "Memuat..." : "Buat Reservasi"}
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
